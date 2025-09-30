import { useState } from "react";
import { useNotes } from "../../context/useNotes";
import { DownIcon, RightIcon } from "../Shared/Icons";
import DropdownMenu from "../Shared/DropdownMenu";
import styles from "../../styles/modules/FolderItem.module.css";

/**
 * Folder Interface
 * ----------------
 * Represents a folder object.
 */
interface Folder {
    id: number;
    title: string;
    parentId?: number; // For nested folder structure (future work)
}

/**
 * Props for FolderItem component
 * ------------------------------
 * - folder: folder object to render
 * - isActive: whether this folder is selected
 * - isCollapsed: whether folder's notes/children are hidden
 * - onFolderClick: callback for selecting this folder
 * - onToggleCollapse: callback for collapsing/expanding folder
 * - openDropDown: currently open dropdown ID (from parent)
 * - onDropdownToggle: dropdown toggle handler
 * - children: optional nested notes or subfolders
 */
interface FolderItemProps {
    folder: Folder;
    isActive: boolean;
    isCollapsed: boolean;
    onFolderClick: () => void;
    onToggleCollapse: (e: React.MouseEvent) => void;
    openDropDown: string | null;
    onDropdownToggle: (id: string, e: React.MouseEvent) => void;
    children?: React.ReactNode;
}

function FolderItem({
    folder,
    isActive,
    isCollapsed,
    onFolderClick,
    onToggleCollapse,
    openDropDown,
    onDropdownToggle,
    children,
}: FolderItemProps) {
    // Folder actions from context
    const { renameFolder, removeFolder } = useNotes();

    // Local state for inline renaming
    const [isRenaming, setIsRenaming] = useState(false);
    const [tempTitle, setTempTitle] = useState(folder.title);

    // Unique ID for folder's dropdown menu
    const dropdownId = `folder-${folder.id}`;
    const isDropdownOpen = openDropDown === dropdownId;

    // Renaming folder
    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsRenaming(true);
        setTempTitle(folder.title);
    };

    // Deleting folder with pop-up confirmation
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        const confirmed = window.confirm(
            `Are you sure you want to delete "${folder.title}"?`
        );

        if (confirmed) {
            removeFolder(folder.id);
        }
    };

    // Submit folder renaming
    const handleRenameSubmit = () => {
        renameFolder(folder.id, tempTitle);
        setIsRenaming(false);
    };

    // Cancel renaming folder and revert title
    const handleRenameCancel = () => {
        setTempTitle(folder.title);
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

    // Render folder title or rename input
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
                <span className={styles.folderTitle}>{folder.title}</span>
                {/* Dropdown menu for folder actions */}
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
            className={styles.folderItem}
            onClick={onFolderClick} // Select folder on click
        >
            <div
                className={`${styles.folderHeader} ${isActive ? styles.active : ""}`}
            >
                {/* Collapse/expand button */}
                <button
                    onClick={onToggleCollapse}
                    className={styles.collapseButton}
                >
                    {isCollapsed ? <RightIcon /> : <DownIcon />}
                </button>

                {/* Folder title or rename input + dropdown */}
                <div className={styles.folderContent}>{renderTitle()}</div>
            </div>

            {/* Render nested notes or children if any */}
            {children}
        </li>
    );
}

export default FolderItem;
