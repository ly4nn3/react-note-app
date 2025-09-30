import { useSidebarContext } from "../../context/useSidebar";
import { useNotes } from "../../context/useNotes";
import {
    SidebarOpenIcon,
    SidebarCloseIcon,
    CreateFolderIcon,
    CreateNoteIcon,
} from "../Shared/Icons";
import styles from "../../styles/modules/ShortcutBar.module.css";

/**
 * ShortcutBar Component
 * ---------------------
 * Renders a vertical bar of shortcut buttons:
 * - Toggle sidebar visibility
 * - Create new folder
 * - Create new note
 * Integrates with context to perform actions and update state.
 */
function ShortcutBar() {
    // Sidebar visibility and active note/folder state
    const { isSidebarOpen, toggleSidebar, setActiveNoteId, activeFolderId } =
        useSidebarContext();

    // Note and folder actions from context
    const { createNote, createFolder, notes } = useNotes();

    /**
     * Handler for creating new note.
     * - Uses active folder if available and selected
     * - Sets newly created note as active
     */
    const handleCreateNote = async () => {
        const newNote = {
            title: "Untitled",
            content: "",
            updatedAt: Date.now(),
            folderId: activeFolderId,
        };

        await createNote(newNote);

        // Selects newly created note
        const latestNote = notes[notes.length - 1];
        if (latestNote) setActiveNoteId(latestNote.id);
    };

    /**
     * Handler for creating new folder.
     * - Prompts user for folder name with pop-up
     * - Cancels if no title is entered
     */
    const handleCreateFolder = async () => {
        const title = prompt("Folder name:");
        if (!title) return;
        await createFolder({ title, parentId: undefined });
    };

    return (
        <div className={styles.shortcutBar}>
            {/* Sidebar toggle button */}
            <button onClick={toggleSidebar} className={styles.toggleButton}>
                {isSidebarOpen ? <SidebarCloseIcon /> : <SidebarOpenIcon />}
            </button>

            {/* Create folder button */}
            <button
                onClick={handleCreateFolder}
                className={styles.createFolderButton}
            >
                <CreateFolderIcon />
            </button>

            {/* Create note button */}
            <button onClick={handleCreateNote} className={styles.newNoteButton}>
                <CreateNoteIcon />
            </button>
        </div>
    );
}

export default ShortcutBar;
