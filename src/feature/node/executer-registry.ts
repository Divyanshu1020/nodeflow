import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "./type";
import { manualTriggerExecutor } from "@/components/node/trigger/trigger/executer";
import { httpRequestExecutor } from "@/components/node/execution/http-request/executer";

export const executerRegistry: Record<NodeType, NodeExecutor> = {
    [NodeType.INITIAL]: manualTriggerExecutor,
    [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
    [NodeType.HTTP_REQUEST]: httpRequestExecutor,
}

export const getExecuter = (nodeType: NodeType):NodeExecutor => {
    if (!executerRegistry[nodeType]) {
        throw new Error("Executer not found");
    }
    return executerRegistry[nodeType];
}