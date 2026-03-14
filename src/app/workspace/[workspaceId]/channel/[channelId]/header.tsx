"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRemoveChannel } from "@/features/channels/api/use-remove-channel";
import { useUpdateChannel } from "@/features/channels/api/use-update-channel";
import { useConfirm } from "@/hook/use-confirm";
import { useChannelId } from "@/hook/use-channel-id";
import { useWorkspaceId } from "@/hook/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { FaChevronDown } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
    name: string;
}

export const Header = ({ name }: HeaderProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const channelId = useChannelId();

    const { data: member } = useCurrentMember({ workspaceId });
    const isAdmin = member?.role === "admin";

    const [ConfirmDialog, confirm] = useConfirm({
        title: "Delete channel?",
        description: "This will delete the channel. This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
        destructive: true,
    });

    const [editOpen, setEditOpen] = useState(false);
    const [value, setValue] = useState(name);

    const { mutate: updateChannel, isPending: isUpdating } = useUpdateChannel();
    const { mutate: removeChannel, isPending: isRemoving } = useRemoveChannel();

    const formatChannelName = (raw: string) => raw.replace(/ /g, "-");

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateChannel(
            { id: channelId, name: formatChannelName(value) },
            {
                onSuccess: () => {
                    toast.success("Channel updated");
                    setEditOpen(false);
                },
                onError: () => {
                    toast.error("Failed to update channel");
                },
            }
        );
    };

    const handleRemove = async () => {
        const ok = await confirm();
        if (!ok) return;

        removeChannel(
            { id: channelId },
            {
                onSuccess: () => {
                    toast.success("Channel deleted");
                    router.push(`/workspace/${workspaceId}`);
                },
                onError: () => {
                    toast.error("Failed to delete channel");
                },
            }
        );
    };

    return (
        <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        className="text-lg font-semibold px-2 overflow-hidden w-auto"
                        size="sm"
                    >
                        <span className="truncate">
                            # {name}
                        </span>
                        <FaChevronDown className="size-2.5 ml-2" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-gray-50 overflow-hidden">
                    <ConfirmDialog />
                    <DialogHeader className="p-4 border-b bg-white">
                        <DialogTitle>
                            # {name}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="px-4 pb-4 flex flex-col gap-y-2">
                        {isAdmin ? (
                            <>
                                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                    <DialogTrigger asChild>
                                        <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-semibold">Channel name</p>
                                                <p className="text-sm text-[#1264a3] hover:underline font-semibold">Edit</p>
                                            </div>
                                            <p className="text-sm"># {name}</p>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Rename channel</DialogTitle>
                                        </DialogHeader>
                                        <form className="space-y-4" onSubmit={handleEdit}>
                                            <Input
                                                value={value}
                                                disabled={isUpdating}
                                                onChange={(e) => setValue(formatChannelName(e.target.value))}
                                                required
                                                autoFocus
                                                minLength={3}
                                                maxLength={80}
                                                placeholder="channel name e.g. 'general', 'random'"
                                            />
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline" disabled={isUpdating}>
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button disabled={isUpdating}>Save</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full justify-center gap-x-2 px-5 py-4 h-auto bg-white rounded-lg border text-red-600 hover:text-rose-600 hover:bg-rose-50"
                                    disabled={isRemoving}
                                    onClick={handleRemove}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="text-sm font-semibold">Delete channel</span>
                                </Button>
                            </>
                        ) : (
                            <div className="px-5 py-4 bg-white rounded-lg border">
                                <p className="text-sm font-semibold">Channel settings</p>
                                <p className="text-sm text-muted-foreground">Only admins can rename or delete channels.</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
