import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/components/node/execution/http-request/http-request";
import { ManualTriggerNode } from "@/components/node/trigger/trigger/trigger";
import { NodeType } from "@/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} satisfies NodeTypes;

export type RegisteredNodeTypes = keyof typeof nodeComponents;
