import { Editor, EditorError, EditorHeader, EditorLoading } from "@/components/editor/editor";
import { prefetchWorkflow } from "@/feature/workflow/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

async function page({ params }: { params: { workflowsId: string } }) {
  const { workflowsId } = await params;

  prefetchWorkflow(workflowsId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
        <main className="flex-1">
          <EditorHeader workflowId={workflowsId} />
          <Editor workflowId={workflowsId} />
        </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}

export default page;
