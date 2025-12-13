"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { Button } from "./ui/button";
import { SettingsIcon, TrashIcon } from "lucide-react";

interface WorkflowNodeProps {
    children : React.ReactNode
    showToolbar? : boolean
    onDelete? : () => void
    onSettings? : () => void
    name? : string
    description? : string   
}


export function WorkflowNode({children , showToolbar=true , onDelete , onSettings , name , description} : WorkflowNodeProps) {
    return (
        <>
            {showToolbar && (
                <NodeToolbar>
                    <Button variant="ghost" onClick={onSettings} size="sm">
                        <SettingsIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={onDelete} size="sm">
                        <TrashIcon className="h-4 w-4" />
                    </Button>
                </NodeToolbar>   
            )}
            {children}
            {name && (
                <NodeToolbar
                    position={Position.Bottom}
                    isVisible
                    className="max-w-[200px] text-center"
                >
                    <p className="text-sm font-medium">{name}</p>
                    {description && (
                        <p className="text-xs text-muted-foreground">{description}</p>
                    )}
                </NodeToolbar>
            )}
        </>
    )
}