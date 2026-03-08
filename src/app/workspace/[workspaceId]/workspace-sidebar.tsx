import { useCurrentMember } from "@/features/members/api/use-current-member"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace"
import { useWorkspaceId } from "@/hook/use-workspace-id"
import { AlertTriangle, Loader } from "lucide-react"
import { WorkspaceHeader } from "./workspace-header"

export const WorkspaceSidebar = () => {

    const WorkspaceId = useWorkspaceId();
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: WorkspaceId });
    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId: WorkspaceId });

    if (workspaceLoading || memberLoading) {
        return (
            <div className="flex min-h-sc bg-[#5E2C5F] h-full items-center justify-center">
                <Loader className="size-5 animate-spin text-white" />
            </div>
        )
    }

    if (!member || !workspace) {
        return (
            <div className="flex min-h-screen flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center text-center">
                <AlertTriangle className="size-5  text-white" />
                <p className="text-white text-sm">Something went wrong</p>
            </div>
        )
    }



    return (
        <div className="flex flex-col bg-[#5E2C5F] h-full">
            <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
        </div>
    )
}
