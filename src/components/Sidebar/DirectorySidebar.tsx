import { useSidebarContext } from "../../context/SidebarContext";
import styles from "./DirectorySidebar.module.css";

function DirectorySidebar() {
    const { isSidebarOpen, notes, activeNoteId, setActiveNoteId } =
        useSidebarContext();

    if (!isSidebarOpen) return null;

    return (
        <div className={styles.directorySidebar}>
            <h3 className={styles.title}>Notes</h3>
            <ul className={styles.list}>
                {notes.map((note) => (
                    <li key={note.id} className={`${styles.item} ${note.id === activeNoteId ? styles.active : ""}`} onClick={() => setActiveNoteId(note.id)}>
                        {note.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DirectorySidebar;