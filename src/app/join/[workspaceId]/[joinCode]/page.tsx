"use client";

import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useJoin } from "@/features/workspaces/api/use-join";
import { useRouter } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useMemo, useEffect } from "react";

interface JoinPageProps {
    params: {
        workspaceId: Id<"workspaces">;
        joinCode: string;
    };
}

const JoinPage = ({ params }: JoinPageProps) => {
    const router = useRouter();
    const { mutate, isPending } = useJoin();
    const { data, isLoading } = useGetWorkspaceInfo({ id: params.workspaceId });

    const isMember = useMemo(() => data?.isMember, [data?.isMember]);

    useEffect(() => {
        if (isMember) {
            router.push(`/workspace/${params.workspaceId}`);
        }
    }, [isMember, router, params.workspaceId]);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center py-20">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="h-full flex items-center justify-center flex-col gap-y-2 py-20">
                <h1 className="text-2xl font-bold">Workspace not found</h1>
                <p className="text-muted-foreground">The workspace you are looking for does not exist.</p>
                <Button onClick={() => router.push("/")}>Back to Home</Button>
            </div>
        );
    }

    const handleJoin = () => {
        mutate(
            { workspaceId: params.workspaceId, joinCode: params.joinCode },
            {
                onSuccess: (id) => {
                    toast.success("Workspace joined");
                    router.replace(`/workspace/${id}`);
                },
                onError: (error) => {
                    toast.error("Failed to join workspace");
                },
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="h-full flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md border max-w-md w-full">
                <h1 className="text-2xl font-bold mb-2">Join {data?.name}</h1>
                <p className="text-muted-foreground mb-6 text-center">
                    You have been invited to join the workspace <strong>{data?.name}</strong>.
                </p>
                <div className="flex flex-col gap-y-4 w-full">
                    <Button 
                        size="lg"
                        className="w-full"
                        onClick={handleJoin}
                        disabled={isPending}
                    >
                        {isPending ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
                        Join Workspace
                    </Button>
                    <Button 
                        size="lg"
                        className="w-full"
                        variant="outline"
                        onClick={() => router.push("/")}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JoinPage;
