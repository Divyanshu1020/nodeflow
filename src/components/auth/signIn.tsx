"use client"

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form";
import { Input } from "../ui/input";
import { ROUTES } from "@/constant";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";


const SignInSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
});

type SignInFormValues = z.infer<typeof SignInSchema>

export function SignInForm(){
    const route = useRouter()
    const form = useForm<SignInFormValues>(
        {
            resolver: zodResolver(SignInSchema),
            defaultValues: {
                email: "",
                password: "",
            }
        }
    )

    const onSubmit = async (Value: SignInFormValues) => {
        await authClient.signIn.email(
            {
                email: Value.email,
                password: Value.password,
                callbackURL: ROUTES.WORKFLOWS,
            },
            {
                onSuccess: () => {
                    route.push(ROUTES.WORKFLOWS)
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
        )
    }

    const isPending = form.formState.isSubmitting

    return (
        <div className="flex flex-col gap-6 max-w-[400px] mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Please sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant='outline'
                                        className={`w-full cursor-pointer ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                        type="button"
                                        disabled={isPending}
                                    >
                                        Continue with GitHub
                                    </Button>
                                    <Button
                                        variant='outline'
                                        className={`w-full cursor-pointer ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                        type="button"
                                        disabled={isPending}
                                    >
                                        Continue with Google
                                    </Button>
                                    <div className="grid gap-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem
                                                    className="flex flex-col gap-2"
                                                >
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="Enter your email"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        We'll never share your email with anyone else.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem
                                                    className="flex flex-col gap-2"
                                                >
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Enter your password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        We'll never share your password with anyone else.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={isPending}
                                            className="w-full"
                                        >
                                            Sign In
                                        </Button>
                                    </div>
                                    <div className="flex flex-col items-center justify-between">
                                        Don't have an account?{" "}
                                        <Button
                                            variant="link"
                                            type="button"
                                            disabled={isPending}
                                            className={`w-full cursor-pointer ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                            onClick={() => route.push(ROUTES.SIGN_UP)}
                                        >
                                            {isPending ? "Signing in..." : "Sign Up"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}