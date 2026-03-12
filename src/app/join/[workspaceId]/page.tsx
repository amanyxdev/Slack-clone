"use client"

import VerificationInput from "react-verification-input"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useWorkspaceId } from "@/hook/use-workspace-id";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { Loader } from "lucide-react";
import { useJoin } from "@/features/workspaces/api/use-join";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";

const JoinPage = () => {
    const router = useRouter()
    const workspaceId = useWorkspaceId();

    const { mutate, isPending } = useJoin()
    const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });

    const isMember = useMemo(() => data?.isMember, [data?.isMember])

    useEffect(() => {
        if (isMember) {
            router.push(`/workspace/${workspaceId}`)
        }
    }, [isMember, router, workspaceId])

    const handeleComplete = (value: string) => {
        mutate({
            workspaceId, joinCode: value
        },
            {
                onSuccess: (id) => {
                    router.replace(`/workspace/${id}`);
                    toast.success("workspaces joined.");
                },
                onError: () => {
                    toast.error("Failed to join workspaces")
                }
            }

        )
    }

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        )
    }



    return (
        <div className="h-full flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md text-center">
            <div className="relative h-40 w-40">
                <Image src="/logo.png" fill alt="logo" className="object-contain" priority />
            </div>
            <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    <h1 className="text-2xl font-bold">
                        Join {data?.name}
                    </h1>
                    <p className="text-md text-muted-foreground">
                        Enter the workspace code to join
                    </p>
                </div>
                <VerificationInput
                    onComplete={handeleComplete}
                    length={6}
                    classNames={{
                        container: cn("flex gap-x-2", isPending && "opacity-50 cursor-not-allowed"),
                        character:
                            "uppercase h-12 w-12 sm:h-14 sm:w-14 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-lg font-semibold text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-black/20",
                        characterInactive: "bg-gray-50 text-gray-400 border-gray-200",
                        characterSelected: "border-black ring-2 ring-black/20",
                        characterFilled: "bg-white text-gray-900 border-gray-300"
                    }}
                    autoFocus
                />
            </div>
            <div className="flex gap-x-4 pt-6">
                <Button
                    size="lg"
                    variant="outline"
                    asChild
                >
                    <Link href="/">
                        Back to home
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default JoinPage;
