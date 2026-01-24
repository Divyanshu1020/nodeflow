import { channel, topic } from "@inngest/realtime";
export const manualTriggerChannel = channel("manual-trigger-channel").addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
