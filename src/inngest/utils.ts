import { Edge, Node } from "@/generated/prisma/client";
import toposort from "toposort";

export const topologicalSort = (nodes: Node[], edges: Edge[]): Node[] => {
  if (edges.length === 0) return nodes;

  const edgesArray: [string, string][] = edges.map((edge) => [
    edge.sourceId,
    edge.targetId,
  ]);

//   const edgesNodeIds = new Set<string>(
//     edgesArray.flatMap((edge) => [edge[0], edge[1]])
//   );

//   for (const node of nodes) {
//     if (!edgesNodeIds.has(node.id)) {
//       edgesArray.push([node.id, node.id]);
//     }
//   }

  let sortedNodesIds: string[] = [];

  try {
    sortedNodesIds = toposort(edgesArray);
    // remove duplicates
    sortedNodesIds = [...new Set(sortedNodesIds)];
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("Cycle detected") ||
        error.message.includes("Cyclic"))
    ) {
      throw new Error("Cycle detected in the workflow");
    }
    throw error;
  }

  const nodeMap = new Map<string, Node>(nodes.map((node) => [node.id, node]));

  return sortedNodesIds.map((id) => nodeMap.get(id)!).filter(Boolean);
};
