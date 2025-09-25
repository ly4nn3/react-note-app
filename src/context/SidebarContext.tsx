import { createContext, useContext, useState } from "react";

type Note = {
    id: string;
    title: string;
    content: string;
};

type SidebarContextType = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    activeNoteId: string | null;
    setActiveNoteId: (id: string) => void;
    notes: Note[];
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

type SidebarProviderProps = {
    children: React.ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

    // mock notes for now
    const [notes] = useState<Note[]>([
        { id: "1", title: "First Note", content: "This is note 1" },
        { id: "2", title: "Second Note", content: "This is note 2 content" },
        { id: "3", title: "Third Note", content: "Content for note 3" },
    ]);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <SidebarContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebar,
                activeNoteId,
                setActiveNoteId,
                notes,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSidebarContext must be used within SidebarProvider");
    return context;
};