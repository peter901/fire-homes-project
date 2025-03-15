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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth";

export default function LoginForm() {
  const auth = useAuth()
  const router = useRouter();
  const form = useForm<zodInfer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: zodInfer<typeof loginUserSchema>) => {
    auth?.loginWithEmailandPassword(data.email, data.password);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
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
      </form>
      <div className="mt-4">
        <ContinueWithGoogleButton />
      </div>
    </Form>
  );
}
