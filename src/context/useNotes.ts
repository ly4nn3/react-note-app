import { useContext } from "react";
import { NotesContext } from "./NotesContext";
import type { NotesContextType } from "./NotesContext";

export const useNotes = (): NotesContextType => {
    const context = useContext(NotesContext);
    if (!context) throw new Error("useNotes must be used within NotesProvider");
    return context;
};
