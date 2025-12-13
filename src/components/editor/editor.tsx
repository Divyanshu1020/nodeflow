"use client";

import { ROUTES } from "@/constant";
import {
  useUpdateWorkflowName,
  useUpdateWorkflowNode,
  useWorkflowSuspense,
} from "@/feature/workflow/hooks/use-workflows-suspense";
import {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  Panel,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ErrorViewer, LoadingViewer } from "../entity-componets";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SidebarTrigger } from "../ui/sidebar";
import "@xyflow/react/dist/style.css";
import { nodeComponents } from "@/feature/react-flow/node-components";
import { AddNodeButton } from "../add-node-button";
import { useAtomValue, useSetAtom } from "jotai";
import { editorAtom } from "@/feature/node-store/atoms";

export function EditorLoading() {
  return <LoadingViewer message="Loading editor..." />;
}

export function EditorError() {
  return <ErrorViewer message="Error loading editor..." />;
}

export function EditorHeader({ workflowId }: { workflowId: string }) {
  const { data: workflow } = useWorkflowSuspense(workflowId);
  return (
    <header className="flex h-14 shrink-0 items-center px-4 gap-2 border-b bg-background">
      <SidebarTrigger />
      <div className="flex flex-row items-center justify-between gap-x-4 w-full">
        <EditorHeaderBreadcrumb workflowId={workflowId} />
        <EditorHeaderSaveButton workflowId={workflowId} />
      </div>
    </header>
  );
}

export function EditorHeaderSaveButton({ workflowId }: { workflowId: string }) {
  const editor = useAtomValue(editorAtom);
  const updateWorkflowNode = useUpdateWorkflowNode();

  const handleSave = () => {
    if (!editor) return;
    updateWorkflowNode.mutate({
      id: workflowId,
      nodes: editor.getNodes(),
      edges: editor.getEdges(),
    });
  };
  return (
    <div className="ml-auto">
      <Button size="sm" onClick={handleSave} disabled={false}>
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  );
}

export function EditorHeaderBreadcrumb({ workflowId }: { workflowId: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={ROUTES.WORKFLOWS} prefetch>
              Workflows
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <EditorHeaderWorkflowName workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function EditorHeaderWorkflowName({
  workflowId,
}: {
  workflowId: string;
}) {
  const { data: workflow } = useWorkflowSuspense(workflowId);
  const updateWorkflowName = useUpdateWorkflowName();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(workflow?.name);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (workflow?.name) {
      setName(workflow?.name);
    }
  }, [workflow?.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (name === workflow.name) {
      setIsEditing(false);
      return;
    }

    try {
      await updateWorkflowName.mutateAsync({ id: workflowId, name });
      setIsEditing(false);
    } catch (error) {
      setName(workflow.name);
      console.log(error);
    } finally {
      setIsEditing(false);
    }
  };

  const handaleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setName(workflow.name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        className="h-7 w-auto min-w-[120px] px-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handaleKeydown}
      />
    );
  }
  return (
    <BreadcrumbItem
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover-text-foreground transition-colors"
    >
      {name}
    </BreadcrumbItem>
  );
}



export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useWorkflowSuspense(workflowId);

  const setEditor = useSetAtom(editorAtom);

  const [nodes, setNodes] = useState<Node[]>(workflow?.nodes || []);
  const [edges, setEdges] = useState<Edge[]>(workflow?.edges || []);
 
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  return (
   <div style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
      {" "}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeComponents}
        onInit={setEditor}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background  gap={12} size={1} />
        <Panel position="top-right">
          <AddNodeButton/>
        </Panel>
      </ReactFlow>
    </div>
  );
};
