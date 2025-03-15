import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "./SignUpForm";
import Link from "next/link";

export default function Signup() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        Already have an account? <Link href="/login" className="pl-2 underline">Login here</Link>
      </CardFooter>
    </Card>
  );
}
