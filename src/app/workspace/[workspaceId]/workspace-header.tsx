import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ListFilter, SquarePen, Check } from "lucide-react"
import { Doc } from "../../../../convex/_generated/dataModel"
import { Hint } from "@/components/hint"
import { PreferencesModal } from "./preferences-modal"
import { useState } from "react"
import { InviteModal } from "./invite-modal"


interface WorkspaceHeaderProps {
    workspace: Doc<"workspaces">
    isAdmin: boolean;

}

export const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
    const [preferencesOpen, setPreferencesOpen] = useState(false)
    const [inviteOpen, setInviteOpen] = useState(false)

    return (
        <>
            <InviteModal
                open={inviteOpen}
                setOpen={setInviteOpen}
                name={workspace.name}
                joinCode={workspace.joinCode}
            />
            <PreferencesModal open={preferencesOpen} setOpen={setPreferencesOpen} initialValue={workspace.name} />

            <div className="flex items-center justify-between px-4 h-[49px] gap-0.5 ">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="transparent"
                            className="font-semibold text-lg w-auto p-1.5 overflow-hidden hover:bg-white/20"
                            size="sm"
                        >
                            <span className="truncate">
                                {workspace.name}
                            </span>
                            <ChevronDown className="size-4 ml-1 shrink-0" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-63" side="bottom" align="start">
                        <DropdownMenuItem className="cursor-pointer capitalize justify-between">
                            <div className="flex flex-col items-start gap-1">
                                <p className="font-bold">{workspace.name}</p>
                                <p className="text-xs text-muted-foreground">Active workspace</p>
                            </div>
                            <Check className="size-4 text-muted-foreground" />
                        </DropdownMenuItem>
                        {isAdmin && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer py-2"
                                    onClick={() => setInviteOpen(true)}
                                >
                                    Invite people to {workspace.name}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer py-2"
                                    onClick={() => { setPreferencesOpen(true) }}
                                >
                                    Preferences
                                </DropdownMenuItem>

                            </>
                        )}

                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-0.5">
                    <Hint label="fliter" side="bottom">
                        <Button variant="transparent" size="iconSm" className="hover:bg-white/20">
                            <ListFilter className="size-4 text-white" />
                        </Button>

                    </Hint>
                    <Hint label="New message" side="bottom">

                        <Button variant="transparent" size="iconSm" className="hover:bg-white/20">
                            <SquarePen className="size-4 text-white" />
                        </Button>

                    </Hint>

                </div>
            </div>
        </>
    )
}
