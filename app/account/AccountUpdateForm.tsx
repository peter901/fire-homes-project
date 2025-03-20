"use client";

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
import { useAuth } from "@/context/auth";
import { PasswordValidation } from "@/validation/passwordValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  const auth = useAuth();
  const form = useForm<zodInfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const handleSubmit = async (data: zodInfer<typeof formSchema>) => {
    const user = auth?.currentUser;
    if (!user?.email) {
      return;
    }

    try {
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, data.currentPassword)
      );

      await updatePassword(user, data.newPassword);
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        const title = error.code === "auth/invalid-credential" ? "Your password is incorrect": "An error occured";
        toast(title);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="pt-5 mt-5 border-t">
      <h2 className="text-2xl font-bold pb-2">Update Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset
            className="flex flex-col gap-4"
            disabled={form.formState.isSubmitting}
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
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
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="New Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="newPasswordConfirm"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>New Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="New Confirm Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button
              type="submit"
              className="w-full flex gap-2"
              disabled={form.formState.isSubmitting}
            >
              Update Password
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}
