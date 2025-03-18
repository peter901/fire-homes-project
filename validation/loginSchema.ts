import z from "zod";
import { PasswordValidation } from "./passwordValidation";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: PasswordValidation,
});
