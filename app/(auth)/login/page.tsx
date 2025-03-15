import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./LoginForm";


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
        </Card>
    )
}