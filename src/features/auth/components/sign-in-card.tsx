import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LucideRectangleGoggles } from "lucide-react";
import { Fascinate } from "next/font/google";

export const SignInCard = () => {
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
                    <Input disabled={false} value="" onChange={() => { }} placeholder="Email..." type="email" required />
                </form>
                <form className="space-y-2.5">
                    <Input disabled={false} value="" onChange={() => { }} placeholder="Password" type="password" required />
                </form>

                <Button className="w-full" type="submit" size="lg" disabled={false}>
                    Continue
                </Button>

                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button className="w-full relative" disabled={false} onClick={() => { }} variant="outline" size="lg">
                        Continue with Google
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

