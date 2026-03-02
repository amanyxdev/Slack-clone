import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "./use-create-workspace";

export const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();

    const { mutate } = useCreateWorkspace()

    const handdleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        mutate({
            name: "Workspace 1",
        }, {
            onSuccess() {
                // Redirect to that workspace
            },
            onError: () => {
                //show toast error
            },
            onSettled: () => {
                // Reset form
            }
        },
        )
    }

    return (
        <Dialog open={open} onOpenChange={handdleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <Input
                        value=""
                        disabled
                        required
                        autoFocus
                        minLength={3}
                        placeholder="workspace name e.g. 'Work', 'personal', 'Home' "
                    />
                    <div className="flex justify-end">
                        <Button>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
