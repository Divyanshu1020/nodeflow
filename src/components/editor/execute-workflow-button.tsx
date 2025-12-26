import { FlaskConicalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useExecuteWorkflow } from "@/feature/workflow/hooks/use-workflows-suspense";

export function ExecuteWorkflowButton({ workflowId }: { workflowId: string }) {
    const executeWorkflow = useExecuteWorkflow();

    const handleExecuteWorkflow = () => {
        executeWorkflow.mutate({ id: workflowId });
    };
  return (
    <Button size="lg" onClick={handleExecuteWorkflow} disabled={false}>
      <FlaskConicalIcon className="size-4" />
      Execute
    </Button>
  );
}
