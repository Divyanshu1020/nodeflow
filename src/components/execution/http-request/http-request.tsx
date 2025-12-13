import { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo } from "react";
import { BaseExecutionNode } from "../base-execution-node";

type HttpRequestNodedata = {
  endPoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeProps = Node<HttpRequestNodedata>;

function HttpRequestNodeComponent(props: NodeProps<HttpRequestNodeProps>) {
  const nodeData = props.data as HttpRequestNodedata;
  const description = nodeData?.endPoint
    ? `${nodeData.method || "GET"} : ${nodeData.endPoint}`
    : "Not Configured";
  return (
    <>
      <BaseExecutionNode
        name="HTTP Request"
        Icon={GlobeIcon}
        description={description}
        {...props}
        onDoubleTap={()=>{}}
        onSetting={()=>{}} 
      ></BaseExecutionNode>
    </>
  );
}

export const HttpRequestNode = memo(HttpRequestNodeComponent);
HttpRequestNode.displayName = "HttpRequestNode";