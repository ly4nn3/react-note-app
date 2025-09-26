import { createContext } from "react";

export type SidebarContextType = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    activeNoteId: number | undefined;
    setActiveNoteId: (id: number) => void;
    activeFolderId: number | undefined;
    setActiveFolderId: (id: number) => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
    undefined
);
