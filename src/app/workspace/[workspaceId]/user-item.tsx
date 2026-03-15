import { Button } from "@/components/ui/button"
import { Id } from "../../../../convex/_generated/dataModel"
import { cva, type VariantProps } from "class-variance-authority"
import { useWorkspaceId } from "@/hook/use-workspace-id"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface UserItemProps {
    id: Id<"members">
    label?: string
    image?: string
    variant?: VariantProps<typeof userItemVariants>["variant"]

}

const userItemVariants = cva("flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden", {
    variants: {
        variant: {
            default: "text-[#f9edff] hover:bg-white/20",
            active: "text-white bg-[#1164A3] hover:bg-[#1164A3]/90",
        }
    },
    defaultVariants: {
        variant: "default"
    }
}
)


export const UserItem = ({ id, label = "Member", image, variant }: UserItemProps) => {
    const workspaceId = useWorkspaceId();
    const avatarFallback = (label || "?").charAt(0).toUpperCase();
    return (
        <Button
            variant="transparent"
            className={cn(userItemVariants({ variant }))}
            size="sm"
            asChild
        >
            <Link href={`/workspace/${workspaceId}/user/${id}`}>
                <Avatar className="size-5 rounded-md mr-1">
                    <AvatarImage className="rounded-md" src={image || undefined} alt={label} />
                    <AvatarFallback className="rounded-md bg-sky-500 text-white">{avatarFallback}</AvatarFallback>
                </Avatar>
                <span className="truncate text-sm">{label}</span>

            </Link>
        </Button>
    )
}
