import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";
import React from "react";

interface WorkspaceSectionProps {
    children: React.ReactNode;
    label: string;
    hint: string;
    onNew?: () => void;
}


export const WorkspaceSection = ({ children, label, hint, onNew }: WorkspaceSectionProps) => {
    const [on, toggle] = useToggle(true);

    return (
        <div className="flex flex-col mt-3 px-2">
            <div className="flex items-center px-3.5 group">
                <Button
                    className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
                    variant="transparent"
                    onClick={toggle}
                >
                    <FaCaretDown className={on ? "size-4" : "size-4 -rotate-90 transition-transform"} />
                </Button>
                <Button
                    variant="transparent"
                    size="sm"
                    className="group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-center overflow-hidden items-center"
                >
                    <span className="truncate">
                        {label}
                    </span>
                </Button>
                {onNew && (
                    <Hint label={hint} side="top" align="start">
                        <Button
                            onClick={onNew}
                            variant="transparent"
                            size="iconSm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
                        >
                            <PlusIcon className="size-4" />
                        </Button>
                    </Hint>
                )}
            </div>
            {on && <div className="flex flex-col">{children}</div>}
        </div>
    )
}
