import { EditIcon, DeleteIcon, MoreIcon } from "./Icons";
import styles from "../../styles/modules/DropdownMenu.module.css";

/**
 * DropdownMenu Component
 * ----------------------
 * Provides a contextual menu with actions (Rename, Delete).
 * - Triggerd by a "More" (⋮) icon button
 * - Shows options when menu is open
 * - Relies on parent component for handlers (edit/delete/toggle)
 */
interface DropdownMenuProps {
    isOpen: boolean; // Whether dropdown is open
    onEdit: (e: React.MouseEvent) => void; // Handler for "Rename"
    onDelete: (e: React.MouseEvent) => void; // Handler for "Delete"
    onToggle: (e: React.MouseEvent) => void; // Handler for toggling menu
    isActive?: boolean; // Changes icon style if item is active
}

function DropdownMenu({
    isOpen,
    onEdit,
    onDelete,
    onToggle,
    isActive,
}: DropdownMenuProps) {
    return (
        <div className={styles.dropdownContainer}>
            {/* "More" (⋮) button to toggle dropdown menu */}
            <button
                onClick={onToggle}
                className={`${styles.iconButton} ${isActive ? styles.active : ""}`}
            >
                <MoreIcon />
            </button>

            {/* Render dropdown menu conditionally */}
            {isOpen && (
                <div className={styles.dropdown}>
                    {/* Rename option */}
                    <button onClick={onEdit} className={styles.dropdownItem}>
                        <EditIcon />
                        <span>Rename</span>
                    </button>

                    {/* Delete option */}
                    <button onClick={onDelete} className={styles.dropdownItem}>
                        <DeleteIcon />
                        <span>Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
