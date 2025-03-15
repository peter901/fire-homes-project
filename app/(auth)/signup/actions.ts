"use server";

import { auth } from "@/firebase/server";
import { signUpUserSchema } from "@/validation/signupSchema";

export const signUpUser = async (data: {
  email: string;
  name: string;
  password: string;
  confirmPassowrd: string;
}) => {
  const validation = signUpUserSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message || "An error occured",
    };
  }

  try {
    await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });
  } catch(e) {
    return {
      error: true,
      message: (e instanceof Error ? e.message : "Could not create user"),
    };
  }
};
