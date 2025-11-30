import type { inferInput } from "@trpc/tanstack-react-query";
import {prefetch, trpc} from "@/trpc/server";

type input = inferInput<typeof trpc.workflow.getAll>


export const prefetchWorkflows = (params : input) => {
    return prefetch(trpc.workflow.getAll.queryOptions(params))
}
