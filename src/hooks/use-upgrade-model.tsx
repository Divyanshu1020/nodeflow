import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

import { UpgradeModal } from "@/components/upgrade-model";

export const useUpgradeModel = () => {
  const [open, setOpen] = useState(false);

  const handleError = (error: unknown) => {
    if (error instanceof TRPCClientError) {
      if (error.data.code === "PAYMENT_REQUIRED") {
        setOpen(true);
        return true;
      }
    }
    return false;
  };

  const model = <UpgradeModal open={open} onOpenChange={setOpen} />;
  return {
    handleError,
    model,
  };
};
