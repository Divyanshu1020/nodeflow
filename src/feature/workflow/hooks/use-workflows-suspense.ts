import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

export const useWorkflowsSuspense = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();
  return useSuspenseQuery(trpc.workflow.getAll.queryOptions(params));
};

export const useWorkflowSuspense = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflow.getOne.queryOptions({ id }));
};

export const useCreateWorkflows = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.workflow.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`${data.name} Workflow created successfully`);
        queryClient.invalidateQueries(trpc.workflow.getAll.queryOptions({}));
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
};

export const useRemoveWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.workflow.remove.mutationOptions({
      onSuccess: (data) => {
        toast.success(`${data.name} Workflow removed successfully`);
        queryClient.invalidateQueries(trpc.workflow.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflow.getOne.queryOptions({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
};

export const useUpdateWorkflowName = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.workflow.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.success(`${data.name} Workflow updated successfully `);
        queryClient.invalidateQueries(trpc.workflow.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflow.getOne.queryOptions({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(`Error updating workflow name: ${error.message}`);
      },
    })
  );
};

export const useUpdateWorkflowNode = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.workflow.updateNode.mutationOptions({
      onSuccess: (data) => {
        toast.success(`${data.name} Workflow saved successfully `);
        queryClient.invalidateQueries(trpc.workflow.getAll.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflow.getOne.queryOptions({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(`Error saving workflow: ${error.message}`);
      },
    })
  );
};

