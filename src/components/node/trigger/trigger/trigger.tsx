import { NodeProps } from "@xyflow/react";
import { MousePointer } from "lucide-react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { ManualTriggerDialog } from "./dialog";

function ManualTriggerComponent(props: NodeProps) {
  const [open, setOpen] = useState(false);

  
  return (
    <>
      <ManualTriggerDialog open={open} onOpenChange={setOpen} />
      <BaseTriggerNode
        {...props}
        name="Manual Trigger"
        Icon={MousePointer}
        status="error"
        // description={description}
        onDoubleTap={() => setOpen(true)}
        onSetting={() => setOpen(true)}
      ></BaseTriggerNode>
    </>
  );
}

export const ManualTriggerNode = memo(ManualTriggerComponent);
