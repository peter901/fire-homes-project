"use client";

import CommonLoginForm from "@/components/ui/login-form";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  return <CommonLoginForm onSuccess={() => router.refresh()} />;
}
