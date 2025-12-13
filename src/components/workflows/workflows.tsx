"use client";
import { ROUTES } from "@/constant";
import { useWorkflowsParams } from "@/feature/workflow/hooks/use-workflows-params";
import {
  useCreateWorkflows,
  useRemoveWorkflow,
  useWorkflowsSuspense,
} from "@/feature/workflow/hooks/use-workflows-suspense";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { Search, WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  EmptyViewer,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorViewer,
  LoadingViewer,
} from "../entity-componets";

import { WorkflowModel as PrismaWorkflow } from "@/generated/prisma/models/Workflow";
import { formatDistanceToNow } from "date-fns";

// type Workflow = Omit<PrismaWorkflow, "createdAt" | "updatedAt"> & {
//   createdAt: string;
//   updatedAt: string;
// };

export function WorkflowList() {
  const workflows = useWorkflowsSuspense();
  return (
    <EntityList
      items={workflows.data?.iteam}
      getKey={(workflows) => workflows.id}
      renderItem={(workflows) => (
        <WorkflowItem key={workflows.id} workflow={workflows} />
      )}
      emptyView={<WorkflowEmpty />}
    />
  );
}

export function WorkflowItem({ workflow }: { workflow: PrismaWorkflow }) {
  const removeWorkflow = useRemoveWorkflow()
  const handleRemoveWorkflow = () => {
    removeWorkflow.mutate({id: workflow.id})
  }
  return (
    <EntityItem
      title={workflow.name}
      subtitle={
        <>
          <div>Created at {formatDistanceToNow(workflow.createdAt)}</div>
          <div>Updated at {formatDistanceToNow(workflow.updatedAt)}</div>
        </> 
      }
      href={`${ROUTES.WORKFLOWS}/${workflow.id}`}
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-4 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemoveWorkflow}
      isRemovePending={removeWorkflow.isPending}
      removeDisabled={removeWorkflow.isPending}
    />
  );
}


export function WorkflowHeader({ disabled }: { disabled?: boolean }) {
  const router = useRouter();
  const createWorkflow = useCreateWorkflows();
  const { handleError, model } = useUpgradeModel();
  const handleCreateWorkflow = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`${ROUTES.WORKFLOWS}/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
  return (
    <>
      {model}
      <EntityHeader
        title="Workflows"
        description="Manage your workflows"
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
        onNew={handleCreateWorkflow}
      />
    </>
  );
}

export function WorkflowContainer({ children }: { children: React.ReactNode }) {
  return (
    <EntityContainer
      header={<WorkflowHeader />}
      pagination={<WorkflowPagination />}
      search={<WorkflowSearch />}
    >
      {children}
    </EntityContainer>
  );
}

export function WorkflowSearch() {
  const [params, setParams] = useWorkflowsParams();
  const { search, setSearch } = useEntitySearch({
    params,
    setParams,
    debouncedMS: 500,
  });
  return (
    <EntitySearch
      value={search}
      onSearch={(value) => setSearch(value)}
      placeholder="Search workflows"
    />
  );
}

export function WorkflowPagination() {
  const workflows = useWorkflowsSuspense();
  const [params, setParams] = useWorkflowsParams();
  return (
    <EntityPagination
      disabled={workflows.isPending || workflows.isFetching}
      page={workflows.data?.pagination.page}
      totalPages={workflows.data?.pagination.totalPages}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
}

export function WorkflowLoading() {
  return <LoadingViewer message="Loading workflows..." />;
}

export function WorkflowError() {
  return <ErrorViewer message="Error loading workflows..." />;
}

export function WorkflowEmpty() {
  const router = useRouter();
  const createWorkflow = useCreateWorkflows();
  const { handleError, model } = useUpgradeModel();
  const handleCreateWorkflow = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`${ROUTES.WORKFLOWS}/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
  return (
    <>
      {model}
      <EmptyViewer
        message="No workflows found. You can create a new workflow"
        onNew={handleCreateWorkflow}
      />
    </>
  );
}

