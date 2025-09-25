import { createContext, useContext, useEffect, useState } from "react";
import {
    addNote,
    getNotes,
    updateNote,
    deleteNote,
    addFolder,
    getFolders,
    deleteFolder,
    updateFolder,
} from "../db/db";

interface Note {
    id: number;
    title: string;
    content: string;
    folderId?: number;
    updatedAt: number;
}

interface Folder {
    id: number;
    title: string;
    parentId?: number;
}

interface NotesContextType {
    notes: Note[];
    folders: Folder[];
    createNote: (note: Omit<Note, "id">) => Promise<void>;
    updateNote: (note: Note) => Promise<void>;
    renameNote: (id: number, title: string) => Promise<void>;
    removeNote: (id: number) => Promise<void>;
    createFolder: (folder: Omit<Folder, "id">) => Promise<void>;
    refreshNotes: () => Promise<void>;
    refreshFolders: () => Promise<void>;
    removeFolder: (id: number) => Promise<void>;
    renameFolder: (id: number, title: string) => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

type NotesProviderProps = {
    children: React.ReactNode;
};

export const NotesProvider = ({ children }: NotesProviderProps) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [folders, setFolders] = useState<Folder[]>([]);

    const refreshNotes = async () => {
        const allNotes = await getNotes();
        setNotes(allNotes);
    };

    const createNote = async (note: Omit<Note, "id">) => {
        await addNote(note);
        await refreshNotes();
    };

    const updateNoteFunction = async (note: Note) => {
        await updateNote(note);
        await refreshNotes();
    };

    const renameNote = async (id: number, title: string) => {
        const note = notes.find((n) => n.id === id);

        if (!note) return;

        await updateNote({ ...note, title });
        await refreshNotes();
    };

    const removeNote = async (id: number) => {
        await deleteNote(id);
        await refreshNotes();
    };

    const refreshFolders = async () => {
        const allFolders = await getFolders();
        setFolders(allFolders);
    };

    const createFolder = async (folder: Omit<Folder, "id">) => {
        await addFolder(folder);
        await refreshFolders();
    };

    const renameFolder = async (id: number, title: string) => {
        const folder = folders.find((f) => f.id === id);

        if (!folder) return;

        await updateFolder({ ...folder, title });
        await refreshFolders();
    };

    const removeFolder = async (id: number) => {
        await deleteFolder(id);
        await refreshFolders();
    };

    useEffect(() => {
        refreshNotes();
        refreshFolders();
    }, []);

    return (
        <NotesContext.Provider
            value={{
                notes,
                folders,
                createNote,
                updateNote: updateNoteFunction,
                renameNote,
                removeNote,
                createFolder,
                refreshNotes,
                refreshFolders,
                renameFolder,
                removeFolder,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) throw new Error("useNotes must be used within NotesProvider");
    return context;
};
