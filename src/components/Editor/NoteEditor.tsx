import { useSidebarContext } from "../../context/SidebarContext";
import styles from "./NoteEditor.module.css";

function NoteEditor() {
    const { notes, activeNoteId } = useSidebarContext();

    const activeNote = notes.find((n) => n.id === activeNoteId);

    if (!activeNote) {
        return (
            <div className={styles.noteEditor}>
                <h2>Select a note to view</h2>
            </div>
        );
    }

    return (
        <div className={styles.noteEditor}>
            <h2>{activeNote.title}</h2>
            <p>{activeNote.content}</p>
        </div>
    );
}

export default NoteEditor;
