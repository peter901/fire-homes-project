"use client";

import { useAuth } from "@/context/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function ContinueWithGoogleButton() {
  const router = useRouter();
  const auth = useAuth();
  return (
    <Button
      onClick={async () => {
        try {
          await auth?.loginWithGoogle();
          router.refresh();
        } catch {}
      }}
      variant="outline"
      className="w-full"
    >
      Continue With Google
    </Button>
  );
}
