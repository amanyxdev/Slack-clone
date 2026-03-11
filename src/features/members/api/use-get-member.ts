import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";


interface UseGetMemberProps {
    workspaceId: Id<"workspaces">
}


export function useGetMember({ workspaceId }: UseGetMemberProps) {
    const data = useQuery(api.members.get, workspaceId ? { workspaceId } : "skip")

    const isLoading = data === undefined;
    return { data, isLoading }
}
