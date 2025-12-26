import { NodeExecutor } from "@/feature/node/type";
import { NonRetriableError } from "inngest";
import ky, { Options as KyOptions } from "ky";

type HttpRequestData = {
  variableName: string;
  endPoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
  body?: string;
};
export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  console.log("httpRequestExecutor data", data);
  if (!data.endPoint) {
    throw new NonRetriableError("HTTP Request node requires an endpoint");
  }

  if (!data.variableName) {
    throw new NonRetriableError("HTTP Request node requires a variable name");
  }

  const result = await step.run("http-request", async () => {
    const endPoint = data.endPoint!;
    const method = data.method || "GET";
    const options: KyOptions = {
      method,
    };
    if (["POST", "PUT", "PATCH"].includes(method)) {
      if (data.body) {
        options.body = data.body;
        options.headers = {
          "Content-Type": "application/json",
        };
      }
    }
    const response = await ky(endPoint, options);
    const contentType = response.headers.get("content-type");
    let responseData;
    if (contentType?.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    return {
      ...context,
      [data.variableName]: {
        httpResponse: {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          data: responseData,
        },
      },
    };
  });
  return result;
};
