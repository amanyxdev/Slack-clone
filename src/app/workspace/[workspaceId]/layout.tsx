"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Siderbar } from "./sidebar"
import { Toolbar } from "./toolbar"
import { WorkspaceSidebar } from "./workspace-sidebar"


interface WorkspaceIdLayoutProps {
    children: React.ReactNode
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
    return (
        <div className="h-full">
            <Toolbar />

            {/* ── Mobile layout: full-width content only ── */}
            <div className="flex md:hidden h-[calc(100vh-40px)] overflow-hidden">
                <div className="flex-1 min-w-0">
                    {children}
                </div>
            </div>

            {/* ── Desktop layout: icon rail + workspace sidebar + content ── */}
            <div className="hidden md:flex h-[calc(100vh-40px)] overflow-hidden">
                <Siderbar />
                <ResizablePanelGroup>
                    <ResizablePanel defaultSize={300} minSize={250} className="bg-[#481349]">
                        <WorkspaceSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={0}>
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}

export default WorkspaceIdLayout
