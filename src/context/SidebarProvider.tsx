import { useState } from "react";
import { SidebarContext } from "./SidebarContext";

/**
 * Props for SidebarProvider
 * -------------------------
 * - children: React noes that will consume SidebarContext
 */
type SidebarProviderProps = {
    children: React.ReactNode;
};

/**
 * SidebarProvider Component
 * -------------------------
 * Provides sidebar state and active note/folder tracking to child components.
 * - Manages the sidebar (open/closed)
 * - Tracks which note/folder is currently active
 * - Exposes functions to update its state
 */
export const SidebarProvider = ({ children }: SidebarProviderProps) => {
    // Sidebar visibility state
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // Active note and folder IDs
    const [activeNoteId, setActiveNoteId] = useState<number | undefined>(
        undefined
    );
    const [activeFolderId, setActiveFolderId] = useState<number | undefined>(
        undefined
    );

    // Toggle sidebar open or close
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <SidebarContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebar,
                activeNoteId,
                setActiveNoteId,
                activeFolderId,
                setActiveFolderId,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};
