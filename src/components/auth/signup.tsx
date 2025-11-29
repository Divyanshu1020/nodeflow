"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { ROUTES } from "@/constant";


const SignUpSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof SignUpSchema>

export function SignUpForm(){
    const route = useRouter()
    const form = useForm<SignUpFormValues>(
        {
            resolver: zodResolver(SignUpSchema),
            defaultValues: {
                email: "",
                password: "",
                confirmPassword: "",
            }
        }
    )

    const onSubmit = async (Value: SignUpFormValues) => {
        try {
            await authClient.signUp.email({
                name: Value.email,
                email: Value.email,
                password: Value.password,
                callbackURL: "/",
            },
            {
                onSuccess: () => {
                    route.push("/")
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
        )
        } catch (error) {
            toast.error("Something went wrong with signup Form")            
        }
    }

    const isPending = form.formState.isSubmitting

    return (
        <div className="flex flex-col gap-6 max-w-[400px] mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to N8N</CardTitle>
                    <CardDescription>Create an account to get started</CardDescription>
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
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem
                                                    className="flex flex-col gap-2"
                                                >
                                                    <FormLabel>Confirm Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Confirm your password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={isPending}
                                            className="w-full"
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                                    <div className="flex flex-col items-center justify-between">
                                        Already have an account?{" "}
                                        <Button
                                            variant="link"
                                            type="button"
                                            disabled={isPending}
                                            className={`w-full cursor-pointer ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                            onClick={() => route.push(ROUTES.SIGN_IN)}
                                        >
                                            {isPending ? "Signing In..." : "Sign In"}
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