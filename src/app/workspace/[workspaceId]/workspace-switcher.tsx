"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useWorkspaceId } from "@/hook/use-workspace-id";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const WorkspaceAvatarIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
    >
        <circle
            cx="12"
            cy="8"
            r="3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeMiterlimit="3"
        />
        <path
            d="M6 20V16.5L9 14.5H15L18 16.5V20Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeMiterlimit="3"
            fill="none"
        />
    </svg>
);


export const WorkspaceSwitcher = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [_open, setOpen] = useCreateWorkspaceModal();

    const [isSwitching, setIsSwitching] = useState(false);

    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });

    const filteredWorkspaces = workspaces?.filter(workspace => workspace._id !== workspaceId);

    const activeName = workspace?.name ?? (workspaceLoading ? "Loading..." : "Workspace");

    const loading = workspacesLoading || workspaceLoading;

    const handleSwitch = (id: string) => {
        setIsSwitching(true);
        router.push(`/workspace/${id}`);
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="transparent"
                    size="icon"
                    className={cn(
                        "size-10 rounded-xl border border-white/10 bg-white/10 text-white shadow-sm",
                        "hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/30",
                        "flex items-center justify-center font-semibold"
                    )}
                    aria-label="Switch workspace"
                >
                    {isSwitching ? (
                        <Loader2 className="size-5 animate-spin" />
                    ) : (
                        <WorkspaceAvatarIcon className="size-5" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="w-72">
                {isSwitching ? (
                    <div className="text-muted-foreground px-2 pt-2 text-xs flex items-center gap-2">
                        <Loader2 className="size-3.5 animate-spin" />
                        Switching...
                    </div>
                ) : null}

                <DropdownMenuItem
                    onClick={() => handleSwitch(workspaceId)}
                    className="cursor-pointer justify-between"
                    disabled={loading}
                >
                    <div className="min-w-0">
                        <div className="truncate font-medium capitalize">{activeName}</div>
                        <div className="text-muted-foreground text-xs">Active workspace</div>
                    </div>
                    <Check className="text-muted-foreground size-4" />
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {filteredWorkspaces?.map(workspace => (
                    <DropdownMenuItem
                        key={workspace._id}
                        className="cursor-pointer justify-between capitalize"
                        onClick={() => handleSwitch(workspace._id)}
                        disabled={isSwitching}
                    >
                        <div className="flex min-w-0 items-center gap-2">
                            <div className="bg-muted text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-md">
                                <WorkspaceAvatarIcon className="size-4" />
                            </div>
                            <div className="truncate">{workspace.name}</div>
                        </div>
                        <ChevronsUpDown className="text-muted-foreground size-4" />
                    </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer" onClick={() => setOpen(true)}>
                    <div className="bg-muted text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-md">
                        <Plus className="size-4" />
                    </div>
                    <span className="font-medium">Create a new workspace</span>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
