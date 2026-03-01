"use client";
import { ReactNode } from "react";
import { Authenticated, Unauthenticated } from "convex/react";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { AuthScreen } from "@/features/auth/components/auth-screen";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ConvexClientProvider>
            <Authenticated>{children}</Authenticated>
            <Unauthenticated>
                <AuthScreen />
            </Unauthenticated>
        </ConvexClientProvider>
    );
}
