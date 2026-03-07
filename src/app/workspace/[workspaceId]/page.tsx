"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hook/use-workspace-id";
import { useParams } from "next/navigation";

// interface WorkspaceIdPageProps {
//     params: Promise<{ workspaceId: string }>;
// }
//
// export default async function WorkspaceIdPage({ params }: WorkspaceIdPageProps) {
//     const { workspaceId } = await params;
//     return (
//         <main className="p-6">
//             <div className="mt-2 text-2xl font-semibold">ID: {workspaceId}</div>
//         </main>
//     )
// }
//


const WorkspaceIdPage = () => {

    return (
        <div>
            Workspace page
        </div>
    )
}

export default WorkspaceIdPage
