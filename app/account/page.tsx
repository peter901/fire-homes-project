import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/server";
import type { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountUpdateForm from "./AccountUpdateForm";

export default async function Account() {
  const cookieStore = await cookies();

  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    redirect("/");
  }

  let decodedToken: DecodedIdToken;

  try {
    decodedToken = await auth.verifyIdToken(token);
  } catch {
    redirect("/");
  }

  const user = await auth.getUser(decodedToken.uid);
  const isPasswordProvider = !!user.providerData.find(
    (provider) => provider.providerId === "password"
  );

  return (
    <div className="max-w-screen-sm mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Email</Label>
          <div>{decodedToken.email}</div>

          {isPasswordProvider && <AccountUpdateForm />}
        </CardContent>
      </Card>
    </div>
  );
}
