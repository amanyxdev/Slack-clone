import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { useConfirm } from "@/hook/use-confirm";
import { useWorkspaceId } from "@/hook/use-workspace-id";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";


interface InviteModalProps {
    open: boolean
    setOpen: (open: boolean) => void;
    name: string
    joinCode: string
}


export const InviteModal = ({ open, setOpen, name, joinCode }: InviteModalProps) => {
    const workspaceId = useWorkspaceId()
    const { mutate, isPending } = useNewJoinCode()

    const [ConfirmDialog, confirm] = useConfirm({
        title: "Are you sure?",
        description: "This will deactivate the current invite code and generate a new one.",
        confirmText: "Generate",
        cancelText: "Cancel",
        destructive: false,
    })

    const handleCopy = () => {
        const inviteLink = `${window.location.origin}/join/${workspaceId}`
        navigator.clipboard
            .writeText(inviteLink)
            .then(() => toast.success("Copied to clipboard"))
            .catch(() => toast.error("Failed to copy link"))
    }

    const handlesNewCode = async () => {
        const ok = await confirm()
        if (!ok) return
        mutate({ workspaceId },
            {
                onSuccess: () => {
                    toast.success("New invite code generated")
                },
                onError: () => {
                    toast.error("Failed to generate new invite code")
                }
            }
        )
    }
    return (
        <>
            <ConfirmDialog />
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent>
                    <ConfirmDialog />
                    <DialogHeader>
                        <DialogTitle>Invite people to {name}</DialogTitle>
                        <DialogDescription>
                            Use the code below to invite others to {name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-4 items-center justify-center py-10">
                        <p className="text-4xl font-bold tracking-widest uppercase">
                            {joinCode}
                        </p>
                        <Button
                            onClick={handleCopy}
                            variant="ghost"
                            size="sm"
                        >
                            Copy link
                            <CopyIcon className="size-4 ml-2" />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <Button onClick={handlesNewCode} variant="outline" disabled={isPending}>
                            New Code
                            <RefreshCcw className="size-4 ml-2" />
                        </Button>
                        <DialogClose asChild>
                            <Button>
                                Close
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )
}
