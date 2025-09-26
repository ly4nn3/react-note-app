import { useState } from "react";

import { useSidebarContext } from "../../context/useSidebar";
import { useNotes } from "../../context/useNotes";
import { useResizableSidebar } from "../../context/useResizableSidebar";
import { useDropdownMenu } from "../../context/useDropdownMenu";

import FolderItem from "./FolderItem";
import NoteItem from "./NoteItem";
import ResizeHandle from "./ResizeHandle";

import styles from "../../styles/modules/DirectorySidebar.module.css";

function DirectorySidebar() {
    const {
        isSidebarOpen,
        activeNoteId,
        setActiveNoteId,
        activeFolderId,
        setActiveFolderId,
    } = useSidebarContext();

    const { notes, folders } = useNotes();

    const [collapsedFolders, setCollapsedFolders] = useState<Set<number>>(
        new Set()
    );

    const { sidebarWidth, isResizing, handleMouseDown, sidebarRef } =
        useResizableSidebar();

    const { openDropDown, handleDropdownToggle, handleOutsideClick } =
        useDropdownMenu();

    if (!isSidebarOpen) return null;

    const unassignedNotes = notes.filter((note) => !note.folderId);

    const toggleFolderCollapse = (folderId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setCollapsedFolders((prev) => {
            const newSet = new Set(prev);

            if (newSet.has(folderId)) {
                newSet.delete(folderId);
            } else {
                newSet.add(folderId);
            }
            return newSet;
        });
    };

    return (
        <div
            ref={sidebarRef}
            className={styles.directorySidebar}
            style={{ width: sidebarWidth }}
            onClick={handleOutsideClick}
        >
            <h3 className={styles.title}>Notes</h3>

            <ul className={styles.list}>
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

            <ResizeHandle
                isResizing={isResizing}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
}

export default DirectorySidebar;
