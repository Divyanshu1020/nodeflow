import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { HttpRequestDialog } from "./dialog";

type HttpRequestNodedata = {
  endPoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeProps = Node<HttpRequestNodedata>;

function HttpRequestNodeComponent(props: NodeProps<HttpRequestNodeProps>) {
  const { setNodes } = useReactFlow();
  const [open, setOpen] = useState(false);
  const nodeData = props.data as HttpRequestNodedata;
  const handleSave = (data: {
    endPoint?: string;
    method?: string;
    body?: string;
  }) => {
    setNodes((nodes) => {
      return nodes.map((node) => {

        if (node.id === props.id) {
          // console.log("nodeId", node.id, "nodeDataID", props.id);
          return {
            ...node,
            data: {
              ...node.data,
              endPoint: data.endPoint,
              method: data.method,
              body: data.body,
            },
          };
        }
        // console.log("node", node);
        return node;
      });
    });
    setOpen(false);
  };
  const description = nodeData?.endPoint
    ? `${nodeData.method || "GET"} : ${nodeData.endPoint}`
    : "Not Configured";
  return (
    <>
      <HttpRequestDialog
        onSubmit={(data) => handleSave(data)}
        defaultEndPoint={nodeData.endPoint}
        defaultMethod={nodeData.method}
        defaultBody={nodeData.body}
        open={open}
        onOpenChange={setOpen}
      />
      <BaseExecutionNode
        name="HTTP Request"
        Icon={GlobeIcon}
        description={description}
        {...props}
        onDoubleTap={() => setOpen(true)}
        onSetting={() => setOpen(true)}
        status={nodeData?.endPoint ? "success" : "success"}
      ></BaseExecutionNode>
    </>
  );
}

export const HttpRequestNode = memo(HttpRequestNodeComponent);
HttpRequestNode.displayName = "HttpRequestNode";
