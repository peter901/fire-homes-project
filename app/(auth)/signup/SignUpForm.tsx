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
import z from "zod";
import type { infer as zodInfer } from "zod";

const formSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2, "Name must be longer than 2 charaters"),
    password: z.string(),
    confirmPassowrd: z.string().refine(
      (value) => {
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(value);
      },
      {
        message:
          "Password must contain atleast 6 characters, an uppercase letter, lower case letter, a number and a special character",
      }
    ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassowrd) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["passwordConfirm"],
        code: "custom",
      });
    }
  });

export default function SignUpForm() {
  const form = useForm<zodInfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassowrd: "",
    },
  });

  const handleSubmit = async (data: zodInfer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4" >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
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
        <FormField
          control={form.control}
          name="confirmPassowrd"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Confirm Password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">
            Sign up
        </Button>
        <div className="text-center" >or</div>
      </form>
      <div className="mt-4">
        <ContinueWithGoogleButton />
      </div>
    </Form>
  );
}
