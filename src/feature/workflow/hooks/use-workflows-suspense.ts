import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useWorkflowsParams } from "./use-workflows-params"

export const useWorkflowsSuspense = () => {
    const trpc = useTRPC()
    const [params] = useWorkflowsParams()
    return useSuspenseQuery(trpc.workflow.getAll.queryOptions(params))
}

export const useCreateWorkflow = () => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    return useMutation(trpc.workflow.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`${data.name} Workflow created successfully`)
            // router.push(`${ROUTES.WORKFLOWS}/${data.id}`)
            queryClient.invalidateQueries(trpc.workflow.getAll.queryOptions({}))
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))
}