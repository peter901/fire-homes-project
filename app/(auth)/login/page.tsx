import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./LoginForm";
import Link from "next/link";


export default function Login(){
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold">
                    Login
                </CardTitle>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter>
                Do not have an account? <Link href="/signup" className="pl-2 underline">Signup here</Link>
            </CardFooter>
        </Card>
    )
}