import { NodeProps } from "@xyflow/react";
import { MousePointer } from "lucide-react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { ManualTriggerDialog } from "./dialog";
import { NodeStatus } from "@/components/node-status-indicator";
import { useNodeStatus } from "@/feature/node/hooks/use-node-status";
import { fetchManualTriggerRealtimeToken } from "./actions";

function ManualTriggerComponent(props: NodeProps) {
  const [open, setOpen] = useState(false);

    const nodeStatus =
    (useNodeStatus({
      nodeId: props.id,
      channerl: "manual-trigger-channel",
      topic: "status",
      refreshToken: fetchManualTriggerRealtimeToken,
    }) as NodeStatus | null) ?? undefined;

  return (
    <>
      <ManualTriggerDialog open={open} onOpenChange={setOpen} />
      <BaseTriggerNode
        {...props}
        name="Manual Trigger"
        Icon={MousePointer}
        status={nodeStatus}
        // description={description}
        onDoubleTap={() => setOpen(true)}
        onSetting={() => setOpen(true)}
      ></BaseTriggerNode>
    </>
  );
}

export const ManualTriggerNode = memo(ManualTriggerComponent);
