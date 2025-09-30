import { useEffect, useState } from "react";
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
import { NotesContext } from "./NotesContext";

/**
 * Note Interface
 * --------------
 * Represents a single note object.
 */
interface Note {
    id: number;
    title: string;
    content: string;
    folderId?: number;
    updatedAt: number;
}

/**
 * Folder Interface
 * ----------------
 * Represents a folder for organizing notes.
 */
interface Folder {
    id: number;
    title: string;
    parentId?: number;
}

/**
 * Props for NotesProvider
 * -----------------------
 * - children: React nodes that will consume NotesContext
 */
type NotesProviderProps = {
    children: React.ReactNode;
};

/**
 * NotesProvider Component
 * -----------------------
 * Provides notes and folders data to all child components.
 * Handles CRUD operations and refresh logic for both notes and folders.
 */
export const NotesProvider = ({ children }: NotesProviderProps) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [folders, setFolders] = useState<Folder[]>([]);

    // Refresh notes list from database
    const refreshNotes = async () => {
        const allNotes = await getNotes();
        setNotes(allNotes);
    };

    // Create new note and refresh state
    const createNote = async (note: Omit<Note, "id">) => {
        await addNote(note);
        await refreshNotes();
    };

    // Update existing note and refresh state
    const updateNoteFunction = async (note: Note) => {
        await updateNote(note);
        await refreshNotes();
    };

    // Rename note by ID
    const renameNote = async (id: number, title: string) => {
        const note = notes.find((n) => n.id === id);

        if (!note) return;

        await updateNote({ ...note, title });
        await refreshNotes();
    };

    // Remove note by ID
    const removeNote = async (id: number) => {
        await deleteNote(id);
        await refreshNotes();
    };

    // Refresh folders list from database
    const refreshFolders = async () => {
        const allFolders = await getFolders();
        setFolders(allFolders);
    };

    // Create new folder and refresh state
    const createFolder = async (folder: Omit<Folder, "id">) => {
        await addFolder(folder);
        await refreshFolders();
    };

    // Rename folder by ID
    const renameFolder = async (id: number, title: string) => {
        const folder = folders.find((f) => f.id === id);

        if (!folder) return;

        await updateFolder({ ...folder, title });
        await refreshFolders();
    };

    // Remove folder by ID
    const removeFolder = async (id: number) => {
        await deleteFolder(id);
        await refreshFolders();
    };

    // Initial load of notes and folders when provider mounts
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
