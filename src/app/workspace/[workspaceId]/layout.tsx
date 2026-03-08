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
            <div className="flex h-[calc(100vh-40px)]">
                <Siderbar />
                <ResizablePanelGroup
                    orientation="horizontal"
                >
                    <ResizablePanel
                        defaultSize={200}
                        minSize={150}
                        className="bg-[#5E2C5F]"
                    >
                        <div>
                            <WorkspaceSidebar />
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={700}>
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}

export default WorkspaceIdLayout  
