import { useSidebarContext } from "../../context/SidebarContext";
import { useNotes } from "../../context/NotesContext";
import styles from "./DirectorySidebar.module.css";

function DirectorySidebar() {
    const {
        isSidebarOpen,
        activeNoteId,
        setActiveNoteId,
        activeFolderId,
        setActiveFolderId,
    } = useSidebarContext();
    const { notes, folders } = useNotes();

    if (!isSidebarOpen) return null;

    const unassignedNotes = notes.filter((note) => !note.folderId);

    return (
        <div className={styles.directorySidebar}>
            <h3 className={styles.title}>Notes</h3>

            <ul className={styles.list}>
                {folders.map((folder) => (
                    <li
                        key={folder.id}
                        className={`${styles.item} ${folder.id === activeFolderId ? styles.active : ""}`}
                        onClick={() => setActiveFolderId(folder.id)}
                    >
                        <strong>{folder.title}</strong>
                        <ul className={styles.subList}>
                            {notes
                                .filter((note) => note.folderId === folder.id)
                                .map((note) =>
                                    note.id !== undefined ? (
                                        <li
                                            key={note.id}
                                            className={`${styles.item} ${note.id === activeNoteId ? styles.active : ""}`}
                                            onClick={() =>
                                                setActiveNoteId(note.id)
                                            }
                                        >
                                            {note.title}
                                        </li>
                                    ) : null
                                )}
                        </ul>
                    </li>
                ))}

                {unassignedNotes.length > 0 && (
                    <li className={styles.folderItem}>
                        <strong>Unassgined</strong>
                        <ul className={styles.subList}>
                            {unassignedNotes.map((note) => (
                                <li
                                    key={note.id}
                                    className={`${styles.item} ${note.id === activeNoteId ? styles.active : ""}`}
                                    onClick={() => setActiveNoteId(note.id)}
                                >
                                    {note.title}
                                </li>
                            ))}
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default DirectorySidebar;
