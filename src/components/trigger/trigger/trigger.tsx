import { NodeProps } from "@xyflow/react";
import { MousePointer } from "lucide-react";
import { memo } from "react";
import { BaseTriggerNode } from "../base-trigger-node";

function ManualTriggerComponent(props: NodeProps) {
  return (
    <>
      <BaseTriggerNode
        {...props}
        name="Manual Trigger"
        Icon={MousePointer}
        // description={description}
        // onDoubleTap={() => {}}
        // onSetting={() => {}}
      ></BaseTriggerNode>
    </>
  );
}

export const ManualTriggerNode = memo(ManualTriggerComponent);
