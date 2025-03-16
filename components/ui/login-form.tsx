"use client";

import ContinueWithGoogleButton from "@/components/ContinueWithGoogleButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { infer as zodInfer } from "zod";
import { loginUserSchema } from "@/validation/loginSchema";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

export default function LoginForm({onSuccess}:{onSuccess?: () => void}) {
  const auth = useAuth();
  const form = useForm<zodInfer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: zodInfer<typeof loginUserSchema>) => {
    try {
      await auth?.loginWithEmailandPassword(data.email, data.password);
      onSuccess?.();
    } catch (e) {
      toast("Error!!!", {
        description:
          e &&
          typeof e === "object" &&
          "code" in e &&
          typeof e.code === "string" &&
          e.code === "auth/invalid-credential"
            ? "Incorrect username or password"
            : "An error occured",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          className="flex flex-col gap-4"
          disabled={form.formState.isSubmitting}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Password" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Login</Button>
          <div>
            Forgot your password?
            <Link href="/forgot-password" className="pl-2 underline">
              Reset password
            </Link>
          </div>
          <div className="text-center">or</div>
        </fieldset>
      </form>
      <div className="mt-4">
        <ContinueWithGoogleButton />
      </div>
    </Form>
  );
}
