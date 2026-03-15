import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "./ui/sheet";
import { Button } from "./ui/button";
import { Siderbar } from "@/app/workspace/[workspaceId]/sidebar";
import { WorkspaceSidebar } from "@/app/workspace/[workspaceId]/workspace-sidebar";

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="transparent" size="iconSm" className="md:hidden">
                    <Menu className="size-5 text-white" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none flex gap-0 w-[300px] bg-[#481349]">
                <SheetHeader className="sr-only">
                    <SheetTitle>Mobile Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex-1 flex max-w-full">
                    <Siderbar />
                    <div className="flex-1 bg-[#481349]">
                        <WorkspaceSidebar />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
