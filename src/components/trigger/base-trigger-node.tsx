"use client";

import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import { BaseHandle } from "../base-handle";
import { BaseNode, BaseNodeContent } from "../base-node";
import { WorkflowNode } from "../workflow-node";

interface BaseTriggerNodeProps extends NodeProps {
  Icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: React.ReactNode;
  //  status? : NodeStatus;
  onSetting?: () => void;
  onDoubleTap?: () => void;
}

export const BaseTriggerNode = memo(
  ({
    id,
    Icon,
    name,
    description,
    children,
    onSetting,
    onDoubleTap,
  }: BaseTriggerNodeProps) => {
    const {setNodes , setEdges} = useReactFlow()

    const handleDelete = () => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setEdges((edges) => edges.filter((edge) => edge.source !== id));
    };
    return (
      <WorkflowNode
        name={name}
        description={description}
        onDelete={handleDelete}
        onSettings={onSetting}
      >
        <BaseNode
          onDoubleClick={onDoubleTap}
          className="rounded-l-2xl relative group"
        >
          <BaseNodeContent>
            {typeof Icon === "string" ? (
              <Image src={Icon} alt={name} width={16} height={16} />
            ) : (
              <Icon className="size-4 text-muted-foreground" />
            )}
            {children}
            {/* <BaseHandle id="target-1" type="target" position={Position.Left} /> */}
            <BaseHandle id="source-1" type="source" position={Position.Right} />
          </BaseNodeContent>
        </BaseNode>
      </WorkflowNode>
    );
  }
);

BaseTriggerNode.displayName = "BaseTriggerNode";
