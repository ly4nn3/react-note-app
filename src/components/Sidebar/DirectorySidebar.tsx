import { useState } from "react";

import { useSidebarContext } from "../../context/useSidebar";
import { useNotes } from "../../context/useNotes";
import { useResizableSidebar } from "../../context/useResizableSidebar";
import { useDropdownMenu } from "../../context/useDropdownMenu";

import FolderItem from "./FolderItem";
import NoteItem from "./NoteItem";
import ResizeHandle from "./ResizeHandle";

import styles from "../../styles/modules/DirectorySidebar.module.css";

/**
 * DirectorySidebar Component
 * --------------------------
 * Displays main sidebar with folders and notes.
 * - Organizes notes into folders or under "Unassigned"
 * - Supports collapsing/expanding folders
 * - Allows slecting active note/folder
 * - Integrates with dropdown menus and resizable sidebar
 */
function DirectorySidebar() {
    // Sidebar state and actions from context
    const {
        isSidebarOpen, // Whether sidebar is open
        activeNoteId, // Current active note ID
        setActiveNoteId, // Setter for active note ID
        activeFolderId, // Current active folder ID
        setActiveFolderId, // Setter for active folder ID
    } = useSidebarContext();

    // Notes and folders data from context
    const { notes, folders } = useNotes();

    // Track whoch folders are collapsed (hidden notes inside)
    const [collapsedFolders, setCollapsedFolders] = useState<Set<number>>(
        new Set()
    );

    // Sidebar resizing logic (width, mouse events, ref binding)
    const { sidebarWidth, isResizing, handleMouseDown, sidebarRef } =
        useResizableSidebar();

    // Dropdown menu state (item is open, toggle behacior, close menu)
    const { openDropDown, handleDropdownToggle, closeDropdown } =
        useDropdownMenu();

    // Hide sidebar if closed
    if (!isSidebarOpen) return null;

    // Notes without a folder
    const unassignedNotes = notes.filter((note) => !note.folderId);

    /**
     * Toggle collapse/expand state of a folder.
     * - Uses Set for efficient add/remove of folder IDs
     * - Stops click event from bubbling (parent folder click isn't triggered)
     */
    const toggleFolderCollapse = (folderId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setCollapsedFolders((prev) => {
            const newSet = new Set(prev);

            if (newSet.has(folderId)) {
                newSet.delete(folderId); // Expand folder
            } else {
                newSet.add(folderId); // Collapse folder
            }
            return newSet;
        });
    };

    return (
        <div
            ref={sidebarRef} // For resizing behavior
            className={styles.directorySidebar}
            style={{ width: sidebarWidth }} // Dynamic width
            onClick={closeDropdown} // Close dropdown if clicking outside
        >
            <h3 className={styles.title}>Notes</h3>

            <ul className={styles.list}>
                {/* Render folders */}
                {folders.map((folder) => (
                    <FolderItem
                        key={folder.id}
                        folder={folder}
                        isActive={folder.id === activeFolderId}
                        isCollapsed={collapsedFolders.has(folder.id)}
                        onFolderClick={() => setActiveFolderId(folder.id)}
                        onToggleCollapse={(e) =>
                            toggleFolderCollapse(folder.id, e)
                        }
                        openDropDown={openDropDown}
                        onDropdownToggle={handleDropdownToggle}
                    >
                        {/* Render notes inside folder (not collapsed) */}
                        {!collapsedFolders.has(folder.id) && (
                            <ul className={styles.subList}>
                                {notes
                                    .filter(
                                        (note) => note.folderId === folder.id
                                    )
                                    .map((note) => (
                                        <NoteItem
                                            key={note.id}
                                            note={note}
                                            isActive={note.id === activeNoteId}
                                            onClick={() =>
                                                setActiveNoteId(note.id)
                                            }
                                            openDropDown={openDropDown}
                                            onDropdownToggle={
                                                handleDropdownToggle
                                            }
                                        />
                                    ))}
                            </ul>
                        )}
                    </FolderItem>
                ))}

                {/* Unassigned section for notes without folders */}
                {unassignedNotes.length > 0 && (
                    <li className={styles.folderItem}>
                        <strong>Unassigned</strong>
                        <ul className={styles.subList}>
                            {unassignedNotes.map((note) => (
                                <NoteItem
                                    key={note.id}
                                    note={note}
                                    isActive={note.id === activeNoteId}
                                    onClick={() => setActiveNoteId(note.id)}
                                    openDropDown={openDropDown}
                                    onDropdownToggle={handleDropdownToggle}
                                />
                            ))}
                        </ul>
                    </li>
                )}
            </ul>

            {/* Resize handle at right edge of sidebar */}
            <ResizeHandle
                isResizing={isResizing}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
}

export default DirectorySidebar;
