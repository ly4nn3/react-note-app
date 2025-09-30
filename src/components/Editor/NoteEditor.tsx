import { useSidebarContext } from "../../context/useSidebar";
import { useNotes } from "../../context/useNotes";
import styles from "../../styles/modules/NoteEditor.module.css";
import { useEffect, useState } from "react";

/**
 * NoteEditor Component
 * --------------------
 * Renders the editor interface for currently active note.
 * - Fetches active note from context (via Sidebar selection)
 * - Allows editing of content within textarea
 * - Updates note in state when user stops editing (onBlur)
 */
function NoteEditor() {
    // Grab active note ID of note selected in sidebar
    const { activeNoteId } = useSidebarContext();
    // Access notes array and update function from context
    const { notes, updateNote } = useNotes();

    // Find active note object based on ID
    const activeNote = notes.find((n) => n.id === activeNoteId);

    // Local state for textarea content
    const [localContent, setLocalContent] = useState("");

    // Sync local state whenever active note changes
    useEffect(() => {
        setLocalContent(activeNote ? activeNote.content : "");
    }, [activeNote]);

    // Show placeholder if no note is selected
    if (!activeNote) {
        return (
            <div className={styles.noteEditor}>
                <h2>Select a note to view</h2>
            </div>
        );
    }

    /**
     * Event handler: Update local state while typing
     * - Keeps cursor position stable
     * - Does NOT immediately update context to avoid jumping to end
     */
    const handleContentChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setLocalContent(event.target.value);
    };

    /**
     * Event handler: Persist content to context / DB
     * - Triggered when user finishes editing (onBlur)
     */
    const handleBlur = () => {
        updateNote({
            ...activeNote, // Copy existing note properties
            content: localContent, // Replace content with local state
            updatedAt: Date.now(), // Update timestamp for last modified
        });
    };

    return (
        <div className={styles.noteEditor}>
            {/* Note title header */}
            <h2>{activeNote.title}</h2>

            {/* Editable text area bound to local state */}
            <textarea
                value={localContent}
                onChange={handleContentChange}
                onBlur={handleBlur}
                className={styles.textarea}
                placeholder="Start writing..."
            />
        </div>
    );
}

export default NoteEditor;
