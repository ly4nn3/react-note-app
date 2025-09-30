import { createContext } from "react";

/**
 * SidebarContextType
 * ------------------
 * Defines shape of SidebarContext.
 * - isSidebarOpen: whether the sidebar is visible
 * - toggleSidebar: function to open/close the sidebar
 * - activeNoteId: ID of the currently selected note
 * - setActiveNoteId: function to update activeNoteId
 * - activeFolderId: ID of the currently selected folder
 * - setActiveFolderId: function to update activeFolderId
 */
export type SidebarContextType = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    activeNoteId: number | undefined;
    setActiveNoteId: (id: number) => void;
    activeFolderId: number | undefined;
    setActiveFolderId: (id: number) => void;
};

/**
 * SidebarContext
 * --------------
 * React context for managing sidebar state and currently active note/folder.
 * Default value is `undefined` to enforce proper usage with a provider.
 */
export const SidebarContext = createContext<SidebarContextType | undefined>(
    undefined
);
