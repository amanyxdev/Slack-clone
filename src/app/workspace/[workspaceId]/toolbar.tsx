import { Button } from "@/components/ui/button"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hook/use-workspace-id"
import { Info, Search } from "lucide-react"
import { MobileSidebar } from "@/components/mobile-sidebar"

export const Toolbar = () => {
    const workspaceId = useWorkspaceId();
    const { data, isLoading } = useGetWorkspace({ id: workspaceId });
    return (
        <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
            <div className="flex-1 flex items-center justify-start gap-x-2">
                <MobileSidebar />
            </div>
            <div className="min-w-[280px] max-[642px] grow-[2] shrink">
                <Button className="bg-accent/25 hover:bg-white/20 w-full justify-start">
                    <Search className="size-4 text-white mr-2" />
                    <span className="text-white text-xs">
                        Search in {isLoading ? "..." : (data?.name ?? "workspace")}
                    </span>
                </Button>
            </div>
            <div className="ml-auto flex-1 flex items-center justify-end">
                <Button
                    variant="transparent"
                    size="iconSm"
                    aria-label="Workspace information"
                    className="hover:bg-white/20"
                >
                    <Info className="size-5 text-white" />
                </Button>
            </div>
        </nav>
    )
}
