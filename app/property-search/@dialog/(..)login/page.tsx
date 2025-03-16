"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import LoginForm from "@/components/ui/login-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSuccess } from "./actions";

export default function LoginDialog() {
  const router = useRouter();
  return (
    <Dialog
      open
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            You must be logged in to favourite a property
          </DialogDescription>
        </DialogHeader>
        <LoginForm
          onSuccess={async () => {
            await loginSuccess();
            router.back();
          }}
        />
        <DialogFooter className="block">
          Do not have an account?
          <Link className="underline pl-2" href="/signup">
            Create one here
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
