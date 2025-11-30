import {
  WorkflowContainer,
  WorkflowList,
} from "@/components/workflows/workflows";
import { workflowParamsLoader } from "@/feature/workflow/server/params-sever";
import { prefetchWorkflows } from "@/feature/workflow/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

async function page({searchParams}: {searchParams: Promise<SearchParams>}) {
  await requireAuth();
  const params = await workflowParamsLoader(searchParams)
  prefetchWorkflows(params);
  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <WorkflowList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
}

export default page;
