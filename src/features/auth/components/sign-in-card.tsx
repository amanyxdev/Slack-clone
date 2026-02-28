import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
};

export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handelProvider = (value: "github" | "google") => {
        signIn(value)
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Login to continue
                </CardTitle>
            </CardHeader>
            <CardDescription>
                Use your email or another service to continue
            </CardDescription>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <Input disabled={false} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..." type="email" required />
                </form>
                <form className="space-y-2.5">
                    <Input disabled={false} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
                </form>

                <Button className="w-full" type="submit" size="lg" disabled={false}>
                    Continue
                </Button>

                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button className="w-full relative" disabled={false} onClick={() => { }} variant="outline" size="lg">
                        <FcGoogle className="size-5" />
                        Continue with Google
                    </Button>
                    <Button className="w-full relative" disabled={false} onClick={() => { handelProvider("github") }} variant="outline" size="lg">
                        <FaGithub className="size-5" />
                        Continue with Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Don't have an account? <span onClick={() => setState("signUp")} className="text-sky-700 hover:underline cursor-pointer">Sign Up</span>
                </p>
            </CardContent>
        </Card>
    );
}

