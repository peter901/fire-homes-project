"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordValidation } from "@/validation/passwordValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import type { infer as zodInfer } from "zod";

const formSchema = z
  .object({
    currentPassword: PasswordValidation,
    newPassword: PasswordValidation,
    newPasswordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["passwordConfirm"],
        code: "custom",
      });
    }
  });

export default function AccountUpdateForm() {
  const form = useForm<zodInfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  return (
    <Form {...form}>
      <fieldset>
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Current Password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </fieldset>
    </Form>
  );
}
