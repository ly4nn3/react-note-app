import { createContext } from "react";

/**
 * Note Interface
 * --------------
 * Represents a single note.
 */
interface Note {
    id: number;
    title: string;
    content: string;
    folderId?: number; // Optional folder association
    updatedAt: number; // Timestamp of last update
}

/**
 * Folder Interface
 * ----------------
 * Represents a folder for organizing notes.
 */
interface Folder {
    id: number;
    title: string;
    parentId?: number; // Optional for nested folders (future work)
}

/**
 * NotesContextType
 * ----------------
 * Defines shape of NotesContext:
 * - notes: array of all notes
 * - folders: array of all folders
 * - create/update/delete operations for notes
 * - create/update/delete operations for folders
 * - refresh functions for fetching latest data
 */
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

/**
 * NotesContext
 * ------------
 * React context for managing notes and folders.
 * Default value is `undefined` to enforce proper usage with a provider.
 */
export const NotesContext = createContext<NotesContextType | undefined>(
    undefined
);
