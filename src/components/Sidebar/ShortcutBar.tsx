import { useSidebarContext } from "../../context/SidebarContext";
import { useNotes } from "../../context/NotesContext";
import styles from "./ShortcutBar.module.css";

function ShortcutBar() {
    const { isSidebarOpen, toggleSidebar, setActiveNoteId, activeFolderId } =
        useSidebarContext();
    const { createNote, createFolder, notes } = useNotes();

    const handleCreateNote = async () => {
        const newNote = {
            title: "Untitled",
            content: "",
            updatedAt: Date.now(),
            folderId: activeFolderId,
        };

        await createNote(newNote);

        const latestNote = notes[notes.length - 1];
        if (latestNote) setActiveNoteId(latestNote.id);
    };

    const handleCreateFolder = async () => {
        const title = prompt("Folder name:");
        if (!title) return;
        await createFolder({ title, parentId: undefined });
    };

    return (
        <div className={styles.shortcutBar}>
            <button onClick={toggleSidebar} className={styles.toggleButton}>
                {isSidebarOpen ? (
                    // Close icon
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e3e3e3"
                    >
                        <path d="M660-320v-320L500-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z" />
                    </svg>
                ) : (
                    // Open icon
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e3e3e3"
                    >
                        <path d="M500-640v320l160-160-160-160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z" />
                    </svg>
                )}
            </button>

            <button
                onClick={handleCreateFolder}
                className={styles.createFolderButton}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                >
                    <path d="M560-320h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
                </svg>
            </button>

            <button onClick={handleCreateNote} className={styles.newNoteButton}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                >
                    <path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                </svg>
            </button>
        </div>
    );
}

export default ShortcutBar;
