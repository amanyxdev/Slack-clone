import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
    const router = useRouter()
    const [open, setOpen] = useCreateWorkspaceModal();
    const [name, setName] = useState("")

    const { mutate, isPending } = useCreateWorkspace()

    const handleClose = () => {
        setOpen(false)
        setName("")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate({ name }, {
            onSuccess(id) {
                toast.success("workspace created")
                router.push(`/workspace/${id}`)
                handleClose()
            },
            onError() {
                toast.error("Failed to create workspace")
            }
        })
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                        required
                        autoFocus
                        minLength={3}
                        placeholder="workspace name e.g. 'Work', 'personal', 'Home' "
                    />
                    <div className="flex justify-end">
                        <Button disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
