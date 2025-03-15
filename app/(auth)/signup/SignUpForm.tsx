"use client";

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
  
  return <div>SignUpForm</div>;
}
