"use client";

import { ButtonHandle } from "@/components/button-handle";
import { NodeSelector } from "@/components/node-selector";
import {
  type NodeStatus,
  NodeStatusIndicator,
} from "@/components/node-status-indicator";
import { Button } from "@/components/ui/button";
import {
  ConnectionState,
  NodeProps,
  Position,
  useConnection,
  useReactFlow,
} from "@xyflow/react";
import { LucideIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { memo, useState } from "react";
import { BaseHandle } from "../../base-handle";
import { BaseNode, BaseNodeContent } from "../../base-node";
import { WorkflowNode } from "../../workflow-node";

interface BaseTriggerNodeProps extends NodeProps {
  Icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: React.ReactNode;
  status?: NodeStatus;
  onSetting?: () => void;
  onDoubleTap?: () => void;
}

const selector = (connection: ConnectionState) => {
  return connection.inProgress;
};

export const BaseTriggerNode = memo(
  ({
    id,
    Icon,
    name,
    description,
    children,
    status,
    onSetting,
    onDoubleTap,
  }: BaseTriggerNodeProps) => {
    const connectionInProgress = useConnection(selector);
    const [selectorOpen, setSelectorOpen] = useState(false);
    const { setNodes, setEdges } = useReactFlow();

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
        <NodeStatusIndicator
          status={status}
          variant="border"
          className="rounded-l-2xl"
        >
          <BaseNode
            status={status}
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
              <BaseHandle
                id="source-1"
                type="source"
                position={Position.Right}
              />
                
        

              {/* <ButtonHandle
                type="target"
                position={Position.Right}
                showButton={!connectionInProgress}
              >
                <NodeSelector
                  open={selectorOpen}
                  onOpenChange={setSelectorOpen}
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full"
                  >
                    <PlusIcon className="size-3 text-muted-foreground" />
                  </Button>
                </NodeSelector>
              </ButtonHandle> */}
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    );
  }
);

BaseTriggerNode.displayName = "BaseTriggerNode";
