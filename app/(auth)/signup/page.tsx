import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "./SignUpForm";

export default function Signup() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
