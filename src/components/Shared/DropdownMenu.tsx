import { EditIcon, DeleteIcon, MoreIcon } from "./Icons";
import styles from "../../styles/modules/DropdownMenu.module.css";

interface DropdownMenuProps {
    isOpen: boolean;
    onEdit: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
    onToggle: (e: React.MouseEvent) => void;
}

function DropdownMenu({
    isOpen,
    onEdit,
    onDelete,
    onToggle
}: DropdownMenuProps) {

    return (
        <div className={styles.dropdownContainer}>
            <button
                onClick={onToggle}
                className={styles.iconButton}
            >
                <MoreIcon />
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <button
                        onClick={onEdit}
                        className={styles.dropdownItem}
                    >
                        <EditIcon />
                        <span>Rename</span>
                    </button>

                    <button
                        onClick={onDelete}
                        className={styles.dropdownItem}
                    >
                        <DeleteIcon />
                        <span>Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
