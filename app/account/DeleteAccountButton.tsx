"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { removeToken } from "@/context/actions";
import { useAuth } from "@/context/auth";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "sonner";
import { deleteUserFavourites } from "./actions";

export default function DeleteAccountButton() {
  const auth = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState("");

  const handleDeleteAccount = async () => {
    if (auth?.currentUser?.email) {
      setIsDeleting(true);
      try {
        await reauthenticateWithCredential(
          auth.currentUser,
          EmailAuthProvider.credential(auth.currentUser.email, password)
        );
        await deleteUserFavourites();
        await deleteUser(auth.currentUser);
        await removeToken();
        toast("Account deleted successfully...!");
      } catch (error) {
        if (error instanceof Error && "code" in error) {
          const title =
            error.code === "auth/invalid-credential"
              ? "Your password is incorrect"
              : "An error occured";
          toast(title);
        } else {
          toast("An unexpected error occurred");
        }
      }
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete you account
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              This will permanetly delete your account and remove all your data
              from our servers
              <div>
                <Label>Enter current password to continue</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={handleDeleteAccount}
          >
            {isDeleting ? "Delete..." : "Delete Account"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
