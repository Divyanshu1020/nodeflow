import { NodeExecutor } from "@/feature/node/type";
import { httpRequestChannel } from "@/inngest/channels/http-request";
import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import ky, { Options as KyOptions } from "ky";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);
  return safeString;
});

type HttpRequestData = {
  variableName: string;
  endPoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
  body?: string;
};
export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  // console.log("httpRequestExecutor data", data);
    await publish(httpRequestChannel().status({
      nodeId,
      status: "loading",
    }))

  if (!data.endPoint) {
    await publish(httpRequestChannel().status({
        nodeId,
        status: "error",
      }))
    throw new NonRetriableError("HTTP Request node requires an endpoint");
  }

  if (!data.variableName) {
    await publish(httpRequestChannel().status({
      nodeId,
      status: "error",
    }))
    throw new NonRetriableError("HTTP Request node requires a variable name");
  }

  const result = await step.run("http-request", async () => {
    const endPoint = Handlebars.compile(data.endPoint)(context);
    const method = data.method || "GET";
    const options: KyOptions = {
      method,
    };
    if (["POST", "PUT", "PATCH"].includes(method)) {
      if (data.body) {
        const resloved = Handlebars.compile(data.body || "{}")(context);
        JSON.parse(resloved);
        options.body = resloved;
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

  await publish(httpRequestChannel().status({
    nodeId,
    status: "success",
  }))
  return result;
};
