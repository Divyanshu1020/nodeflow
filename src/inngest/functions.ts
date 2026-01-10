import { getExecuter } from "@/feature/node/executer-registry";
import prisma from "@/lib/prisma";
import { NonRetriableError } from "inngest";
import { httpRequestChannel } from "./channels/http-request";
import { inngest } from "./client";
import { topologicalSort } from "./utils";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflow/execute", channels: [httpRequestChannel()] },
  async ({ event, step, publish }) => {
    const workflowId = event.data.workflowId;

    if (!workflowId) {
      throw new NonRetriableError("Workflow ID is required");
    }

    const sortedNodes = await step.run("prepare-workflow", async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: workflowId,
        },
        include: {
          nodes: true,
          edges: true,
        },
      });

      return topologicalSort(workflow.nodes, workflow.edges);
    });

    let context = event.data.initialContext || {};

    for (const node of sortedNodes) {
      const executer = getExecuter(node.type);

      context = await executer({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        context,
        step,
        publish,  
      });
    }

    return {
      workflowId,
      result: context,
    };
  }
);
