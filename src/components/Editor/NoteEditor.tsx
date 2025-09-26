import { useSidebarContext } from "../../context/useSidebar";
import { useNotes } from "../../context/useNotes";
import styles from "../../styles/modules/NoteEditor.module.css";

function NoteEditor() {
    const { activeNoteId } = useSidebarContext();
    const { notes, updateNote } = useNotes();

    const activeNote = notes.find((n) => n.id === activeNoteId);

    if (!activeNote) {
        return (
            <div className={styles.noteEditor}>
                <h2>Select a note to view</h2>
            </div>
        );
    }

    const handleContentChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        updateNote({
            ...activeNote,
            content: event.target.value,
            updatedAt: Date.now(),
        });
    };

    return (
        <div className={styles.noteEditor}>
            <h2>{activeNote.title}</h2>
            <textarea
                value={activeNote.content}
                onChange={handleContentChange}
                className={styles.textarea}
            />
        </div>
    );
}

export default NoteEditor;
