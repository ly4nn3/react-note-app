import { useState } from "react";
import { useNotes } from "../../context/useNotes";
import { DownIcon, RightIcon } from "../Shared/Icons";
import DropdownMenu from "../Shared/DropdownMenu";
import styles from "./FolderItem.module.css";

interface Folder {
    id: number;
    title: string;
    parentId?: number;
}

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
    children
}: FolderItemProps) {
    const { renameFolder, removeFolder } = useNotes();

    const [isRenaming, setIsRenaming] = useState(false);
    const [tempTitle, setTempTitle] = useState(folder.title);

    const dropdownId = `folder-${folder.id}`;
    const isDropdownOpen = openDropDown === dropdownId;

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsRenaming(true);
        setTempTitle(folder.title);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        const confirmed = window.confirm(`Are you sure you want to delete "${folder.title}"?`);

        if (confirmed) {
            removeFolder(folder.id);
        }
    };

    const handleRenameSubmit = () => {
        renameFolder(folder.id, tempTitle);
        setIsRenaming(false);
    };

    const handleRenameCancel = () => {
        setTempTitle(folder.title);
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
                <span className={styles.folderTitle}>{folder.title}</span>
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
            className={`${styles.folderItem} ${isActive ? styles.active : ""}`}
            onClick={onFolderClick}
        >
            <div className={styles.folderHeader}>
                <button
                    onClick={onToggleCollapse}
                    className={styles.collapseButton}
                >
                    {isCollapsed ? <RightIcon /> : <DownIcon />}
                </button>

                <div className={styles.folderContent}>
                    {renderTitle()}
                </div>

                {children}
            </div>
        </li>
    );
}

export default FolderItem;