"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PROPS {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultEndPoint?: string;
  defaultMethod?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  defaultBody?: string;
}

const formSchema = z.object({
  endPoint: z.string().url({ message: "Please enter a valid URL" }),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  body: z.string().optional(),
});

export const HttpRequestDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultEndPoint,
  defaultMethod,
  defaultBody,
}: PROPS) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endPoint: defaultEndPoint,
      method: defaultMethod,
      body: defaultBody,
    },
  });

  const watchMethod = form.watch("method");
  const showBody =
    watchMethod === "POST" || watchMethod === "PUT" || watchMethod === "PATCH";

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
    // onOpenChange(false);
  };

  useEffect(() => {
    if (open) {
      form.reset({
        endPoint: defaultEndPoint,
        method: defaultMethod,
        body: defaultBody,
      });
    }
  }, [open, defaultEndPoint, defaultMethod, defaultBody]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The HTTP method to use for the request
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endPoint"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>End Point</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://api.example.com/user/{{httpRequest.data.id}}"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Static URL or use {"{{variables}}"} for simple value or{" "}
                    {"{{json variables}}"} to stringify json object
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showBody && (
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px] font-mono text-sm"
                        placeholder={`
                          {
                            "id": "{{httpRequest.data.id}}"
                          }
                        `}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      JSON with template variables. Use {`{{variables}}`} for
                      simple value or {`{{json variables}}`} to stringify json
                      object
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                // onClick={() => form.handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
