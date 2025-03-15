"use server";

import { auth } from "@/firebase/server";
import { loginUserSchema } from "@/validation/loginSchema";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const validation = loginUserSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message || "An error occured",
    };
  }

  try {
    await auth.createUser({
      displayName: data.email,
      email: data.email,
      password: data.password,
    });
  } catch {
    return {
      error: true,
      message: "Could not create user",
    };
  }
};
