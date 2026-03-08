import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";


interface UseCurrentMemberProps {
    workspaceId: Id<"workspaces">
}


export function useCurrentMember({ workspaceId }: UseCurrentMemberProps) {
    const data = useQuery(api.members.current, workspaceId ? { workspaceId } : "skip")

    const isLoading = data === undefined;
    return { data, isLoading }
}
