import { useState } from "react";
import { useNotes } from "../../context/useNotes";
import DropdownMenu from "../Shared/DropdownMenu";
import styles from "../../styles/modules/NoteItem.module.css";

/**
 * Note Interface
 * --------------
 * Represents a note object.
 */
interface Note {
    id: number;
    title: string;
    content: string;
    folderId?: number; // Optional folder association
    updatedAt: number; // Timestamp of last update
}

/**
 * Props for NoteItem component
 * ----------------------------
 * - note: note object to render
 * - isActive: whether this note is selected
 * - onClick: callback when note is clicked
 * - openDropDown: currently open dropdown ID (from parent)
 * - onDropdownToggle: dropdown toggle handler
 */
interface NoteItemProps {
    note: Note;
    isActive: boolean;
    onClick: () => void;
    openDropDown: string | null;
    onDropdownToggle: (id: string, e: React.MouseEvent) => void;
}

function NoteItem({
    note,
    isActive,
    onClick,
    openDropDown,
    onDropdownToggle,
}: NoteItemProps) {
    // Note actions from context
    const { renameNote, removeNote } = useNotes();

    // Local state for inline renaming
    const [isRenaming, setIsRenaming] = useState(false);
    const [tempTitle, setTempTitle] = useState(note.title);

    // Unique ID for note's dropdown menu
    const dropdownId = `note-${note.id}`;
    const isDropdownOpen = openDropDown === dropdownId;

    // Renaming note
    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsRenaming(true);
        setTempTitle(note.title);
    };

    // Deleting note with pop-up confirmation
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        const confirmed = window.confirm(
            `Are you sure you want to delete "${note.title}"?`
        );

        if (confirmed) {
            removeNote(note.id);
        }
    };

    // Submit note renaming
    const handleRenameSubmit = () => {
        renameNote(note.id, tempTitle);
        setIsRenaming(false);
    };

    // Cancel renaming note and revert title
    const handleRenameCancel = () => {
        setTempTitle(note.title);
        setIsRenaming(false);
    };

    /**
     * Handle keyboard event while renaming
     * - Enter: submit rename
     * - Escape: cancel rename
     */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleRenameSubmit();
        } else if (e.key === "Escape") {
            handleRenameCancel();
        }
    };

    // Render note title or rename input
    const renderTitle = () => {
        if (isRenaming) {
            return (
                <input
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onBlur={handleRenameSubmit} // submit rename on blur
                    onKeyDown={handleKeyDown}
                    className={styles.renameInput}
                    autoFocus
                />
            );
        }

        return (
            <>
                <span className={styles.noteTitle}>{note.title}</span>
                {/* Dropdown menu for note actions */}
                <DropdownMenu
                    isOpen={isDropdownOpen}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggle={(e) => onDropdownToggle(dropdownId, e)}
                    isActive={isActive}
                />
            </>
        );
    };

    return (
        <li
            className={`${styles.noteItem} ${isActive ? styles.active : ""}`}
            onClick={onClick} // Select note on click
        >
            <div className={styles.noteContent}>{renderTitle()}</div>
        </li>
    );
}

export default NoteItem;
