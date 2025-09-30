import { useContext } from "react";
import { SidebarContext } from "./SidebarContext";
import type { SidebarContextType } from "./SidebarContext";

/**
 * useSidebarContext Hook
 * ----------------------
 * Custom hook to access SidebarContext.
 * Provides sidebar visibility, active note/folder IDs, and update functions.
 * Must be used within SidebarProvider.
 *
 * @throws Error if used outside of SidebarProvider
 */
export const useSidebarContext = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context)
        throw new Error(
            "useSidebarContext must be used within SidebarProvider"
        );
    return context;
};
