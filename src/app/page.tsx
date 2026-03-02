"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";

export default function Home() {

    const [open, setOpen] = useCreateWorkspaceModal()

    const { data, isLoading } = useGetWorkspaces();

    const workspacessId = useMemo(() => data?.[0]?._id, [data])

    useEffect(() => {
        if (isLoading) return;

        if (workspacessId) {
            console.log("Rediret to workspaces")
        } else if (!open) {
            setOpen(true)
        }
    }, [workspacessId, isLoading, open, setOpen])

    return (
        <div>
            <UserButton />
        </div>
    );
}
