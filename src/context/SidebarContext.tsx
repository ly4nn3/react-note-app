import { createContext, useState } from "react";

type SidebarContextType = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    activeNoteId: number | undefined;
    setActiveNoteId: (id: number) => void;
    activeFolderId: number | undefined;
    setActiveFolderId: (id: number) => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

type SidebarProviderProps = {
    children: React.ReactNode;
};

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeNoteId, setActiveNoteId] = useState<number | undefined>(
        undefined
    );
    const [activeFolderId, setActiveFolderId] = useState<number | undefined>(
        undefined
    );

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
