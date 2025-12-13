"use client";

import { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { NodeSelector } from "./node-selector";
import { PlaceholderNode } from "./placeholder-node";
import { WorkflowNode } from "./workflow-node";

function InitialNodeComponent(props: NodeProps) {
  const [open, setOpen] = useState(false);
  return (
    <NodeSelector open={open} onOpenChange={() => setOpen(false)}>
      <WorkflowNode showToolbar={false}>
        <PlaceholderNode {...props} onClick={() => setOpen(true)}>
          <div className="flex items-center justify-center cursor-pointer">
            <PlusIcon className="size-4" />
          </div>
        </PlaceholderNode>
      </WorkflowNode>
    </NodeSelector>
  );
}

export const InitialNode = memo(InitialNodeComponent);
