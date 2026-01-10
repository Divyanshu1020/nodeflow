import { NodeStatus } from "@/components/node-status-indicator";
import { Realtime } from "@inngest/realtime";
import { useInngestSubscription } from "@inngest/realtime/hooks";
import { useEffect, useState } from "react";

interface UseNodeStatusProps {
  nodeId: string;
  channerl: string;
  topic: string;
  refreshToken: () => Promise<Realtime.Subscribe.Token>;
}

export function useNodeStatus({
  nodeId,
  channerl,
  topic,
  refreshToken,
}: UseNodeStatusProps) {
  const [status, setStatus] = useState<string | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // const [subscription, setSubscription] = useState<Realtime.Subscribe | null>(null);

  const { data } = useInngestSubscription({
    refreshToken,
    enabled: true,
  });

  useEffect(() => {
    if (!data?.length) {
      return;
    }

    const latestMesage = data
      .filter(
        (message) =>
          message.kind === "data" &&
          message.channel === channerl &&
          message.topic === topic &&
          message.data.nodeId === nodeId
      )
      .sort((a, b) => {
        if (a.kind === "data" && b.kind === "data") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return 0;
      })[0];

    if (latestMesage?.kind === "data") {
      setStatus(latestMesage.data.status as NodeStatus);
    }
  }, [data, nodeId, channerl, topic]);

  return status;
}
