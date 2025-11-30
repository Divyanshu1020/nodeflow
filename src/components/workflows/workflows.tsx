"use client";
import { ROUTES } from "@/constant";
import { useWorkflowsParams } from "@/feature/workflow/hooks/use-workflows-params";
import {
  useCreateWorkflow,
  useWorkflowsSuspense,
} from "@/feature/workflow/hooks/use-workflows-suspense";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
} from "../entity-componets";

export function WorkflowList() {
  const workflows = useWorkflowsSuspense();
  return (
    <div className="flex-1 flex justify-center items-center h-full">
      <p>{JSON.stringify(workflows.data, null, 2)}</p>
    </div>
  );
}

export function WorkflowHeader({ disabled }: { disabled?: boolean }) {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
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
