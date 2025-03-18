import z from "zod";
import { PasswordValidation } from "./passwordValidation";

export const signUpUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2, "Name must be longer than 2 charaters"),
    password: PasswordValidation,
    confirmPassowrd: z.string(),
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
