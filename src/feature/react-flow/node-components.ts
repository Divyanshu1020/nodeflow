import { HttpRequestNode } from "@/components/execution/http-request/http-request";
import { InitialNode } from "@/components/initial-node";
import { ManualTriggerNode } from "@/components/trigger/trigger/trigger";
import { NodeType } from "@/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} satisfies NodeTypes;

export type RegisteredNodeTypes = keyof typeof nodeComponents;
