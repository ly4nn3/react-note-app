import { useSidebarContext } from "../../context/useSidebar";
import { useNotes } from "../../context/useNotes";
import { SidebarOpenIcon, SidebarCloseIcon, CreateFolderIcon, CreateNoteIcon } from "../Shared/Icons";
import styles from "../../styles/modules/ShortcutBar.module.css";

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
                {isSidebarOpen ? <SidebarCloseIcon /> : <SidebarOpenIcon />}
            </button>

            <button
                onClick={handleCreateFolder}
                className={styles.createFolderButton}
            >
                <CreateFolderIcon />   
            </button>

            <button onClick={handleCreateNote} className={styles.newNoteButton}>
                <CreateNoteIcon />
            </button>
        </div>
    );
}

export default ShortcutBar;
