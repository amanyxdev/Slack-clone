"use client"

import { CreateChannelModal } from "@/features/channels/components/create-channel-modal"
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal"
import { useEffect, useState } from "react"

export const Modals = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true))
        return () => cancelAnimationFrame(id)
    }, [])

    if (!mounted) return null;

    return (
        <>
            <CreateChannelModal />
            <CreateWorkspaceModal />
        </>
    )
}
