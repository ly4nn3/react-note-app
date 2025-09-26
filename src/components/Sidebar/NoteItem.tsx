import { useState } from "react";
import { useNotes } from "../../context/useNotes";
import DropdownMenu from "../Shared/DropdownMenu";
import styles from "../../styles/modules/NoteItem.module.css";

interface Note {
    id: number;
    title: string;
    content: string;
    folderId?: number;
    updatedAt: number;
}

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
    const { renameNote, removeNote } = useNotes();

    const [isRenaming, setIsRenaming] = useState(false);
    const [tempTitle, setTempTitle] = useState(note.title);

    const dropdownId = `note-${note.id}`;
    const isDropdownOpen = openDropDown === dropdownId;

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsRenaming(true);
        setTempTitle(note.title);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        const confirmed = window.confirm(
            `Are you sure you want to delete "${note.title}"?`
        );

        if (confirmed) {
            removeNote(note.id);
        }
    };

    const handleRenameSubmit = () => {
        renameNote(note.id, tempTitle);
        setIsRenaming(false);
    };

    const handleRenameCancel = () => {
        setTempTitle(note.title);
        setIsRenaming(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleRenameSubmit();
        } else if (e.key === "Escape") {
            handleRenameCancel();
        }
    };

    const renderTitle = () => {
        if (isRenaming) {
            return (
                <input
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onBlur={handleRenameSubmit}
                    onKeyDown={handleKeyDown}
                    className={styles.renameInput}
                    autoFocus
                />
            );
        }

        return (
            <>
                <span className={styles.noteTitle}>{note.title}</span>
                <DropdownMenu
                    isOpen={isDropdownOpen}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggle={(e) => onDropdownToggle(dropdownId, e)}
                />
            </>
        );
    };

    return (
        <li
            className={`${styles.noteItem} ${isActive ? styles.active : ""}`}
            onClick={onClick}
        >
            <div className={styles.noteContent}>{renderTitle()}</div>
        </li>
    );
}

export default NoteItem;
