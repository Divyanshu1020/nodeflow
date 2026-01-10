import { httpRequestExecutor } from "@/components/node/execution/http-request/executer";
import { manualTriggerExecutor } from "@/components/node/trigger/trigger/executer";
import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "./type";

export const executerRegistry: Record<NodeType, NodeExecutor<any>> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
};

export const getExecuter = (nodeType: NodeType): NodeExecutor<any> => {
  if (!executerRegistry[nodeType]) {
    throw new Error("Executer not found");
  }
  return executerRegistry[nodeType];
};
