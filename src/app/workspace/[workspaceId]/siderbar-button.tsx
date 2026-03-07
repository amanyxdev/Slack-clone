import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

interface SidebarButtonProps {
    icon: LucideIcon | IconType
    label: string;
    isActive?: boolean;
    onClick?: () => void
}


export const SidebarButton = ({ icon: Icon, label, isActive, onClick }: SidebarButtonProps) => {
    return (
        <Button
            type="button"
            onClick={onClick}
            aria-label={label}
            variant="transparent"
            className={cn(
                "h-auto flex flex-col items-center justify-center gap-y-0.5 px-2 py-1 group",
                isActive && "bg-accent/20"
            )}
        >
            <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
            <span className="text-[11px] text-white group-hover:text-accent">
                {label}
            </span>
        </Button>)
} 
