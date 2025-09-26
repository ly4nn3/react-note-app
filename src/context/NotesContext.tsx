import { createContext } from "react";

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

export interface NotesContextType {
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

export const NotesContext = createContext<NotesContextType | undefined>(
    undefined
);
