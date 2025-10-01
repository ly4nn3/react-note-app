import { useContext } from "react";
import { NotesContext } from "./NotesContext";
import type { NotesContextType } from "./NotesContext";

/**
 * useNotes Hook
 * -------------
 * Custom hook to access NotesContext.
 * Provides all notes/folders data and CRUD functions.
 * Must be used within NotesProvider.
 *
 * @throws Error if used outside of NotesProvider
 */
export const useNotes = (): NotesContextType => {
    const context = useContext(NotesContext);
    if (!context) throw new Error("useNotes must be used within NotesProvider");
    return context;
};
