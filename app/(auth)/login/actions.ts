"use server";

import { auth } from "@/firebase/client";
import { loginUserSchema } from "@/validation/loginSchema";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const validation = loginUserSchema.safeParse({ email, password });

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message || "An error occured",
    };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      error: false,
      user: userCredential.user,
      message: "Login successful",
    };
  } catch {
    return {
      error: true,
      message: "Wrong email or password",
    };
  }
};
