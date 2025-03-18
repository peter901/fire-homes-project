import z from "zod";
import { PasswordValidation } from "./passwordValidation";

export const loginUserSchema = z.object({
  email: PasswordValidation,
});
