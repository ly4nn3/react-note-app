import { useContext } from "react";
import { SidebarContext } from "./SidebarContext";
import type { SidebarContextType } from "./SidebarContext";

export const useSidebarContext = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context)
        throw new Error(
            "useSidebarContext must be used within SidebarProvider"
        );
    return context;
};
