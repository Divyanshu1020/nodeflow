"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface PROPS {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualTriggerDialog = ({ open, onOpenChange }: PROPS) => {
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manual Trigger</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                  Configure the manual trigger node
              </DialogDescription>
              <div className="py-4">
                  <p className="text-sm text-muted-foreground">Trigger the workflow manually</p>
              </div>
            </DialogContent>
        </Dialog>
        
    )
};
