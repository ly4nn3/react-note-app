import { useState, useRef, useEffect, useCallback } from "react";
import { useSidebarContext } from "../../context/SidebarContext";
import { useNotes } from "../../context/NotesContext";
import styles from "./DirectorySidebar.module.css";

function DirectorySidebar() {
    const {
        isSidebarOpen,
        activeNoteId,
        setActiveNoteId,
        activeFolderId,
        setActiveFolderId,
    } = useSidebarContext();

    const {
        notes,
        folders,
        renameNote,
        removeNote,
        renameFolder,
        removeFolder,
    } = useNotes();

    const [renamingFolderId, setRenamingFolderId] = useState<number | null>(
        null
    );
    const [renamingNoteId, setRenamingNoteId] = useState<number | null>(null);
    const [tempTitle, setTempTitle] = useState("");
    const [openDropDown, setOpenDropDown] = useState<string | null>(null);
    const [collapsedFolders, setCollapsedFolders] = useState<Set<number>>(new Set());

    const [sidebarWidth, setSidebarWidth] = useState(280);
    const [isResizing, setIsResizing] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startWidth, setStartWidth] = useState(0);
    const sidebarReference = useRef<HTMLDivElement>(null);

    if (!isSidebarOpen) return null;

    const unassignedNotes = notes.filter((note) => !note.folderId);

    const DownIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M480-360 280-560h400L480-360Z"/></svg>
    );

    const RightIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M400-280v-400l200 200-200 200Z"/></svg>
    );

    const MoreIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor">
            <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
        </svg>
    );

    const EditIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 -960 960 960"
            width="16"
            fill="currentColor"
        >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
        </svg>
    );

    const DeleteIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 -960 960 960"
            width="16"
            fill="currentColor"
        >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
    );

    const toggleFolderCollapse = (folderId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setCollapsedFolders(prev => {
            const newSet = new Set(prev);

            if (newSet.has(folderId)) {
                newSet.delete(folderId);
            } else {
                newSet.add(folderId);
            }
            return newSet;
        });
    };

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        setIsResizing(true);
        setStartX(e.clientX);
        setStartWidth(sidebarWidth);
        e.preventDefault();
    }, [sidebarWidth]);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isResizing) return;

            const deltaX = e.clientX - startX;
            const newWidth = startWidth + deltaX;
            const minWidth = 200;
            const maxWidth = 600;

            if (newWidth >= minWidth && newWidth <= maxWidth) {
                setSidebarWidth(newWidth);
            }
        },
        [isResizing, startX, startWidth]
    );

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
    }, []);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "ew-resize";
            document.body.style.userSelect = "none";
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    const handleDropdownToggle = (
        id: string,
        e: React.MouseEvent
    ) => {
        e.stopPropagation();
        setOpenDropDown(openDropDown === id ? null : id);
    }

    const handleEdit = (
        id: number,
        title: string,
        type: "folder" | "note",
        e: React.MouseEvent
    ) => {
        e.stopPropagation();

        if (type === "folder") {
            setRenamingFolderId(id);
        } else {
            setRenamingNoteId(id);
        }

        setTempTitle(title);
        setOpenDropDown(null);
    };

    const handleDelete = (
        id: number,
        type: "folder" | "note",
        e: React.MouseEvent
    ) => {
        e.stopPropagation();

        let title = "";
        if (type === "folder") {
            const folder = folders.find(f => f.id === id);
            title = folder ? folder.title : "this folder";
        } else {
            const note = notes.find(n => n.id === id);
            title = note ? note.title : "this note";
        }

        const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
        
        if (confirmed) {
            if (type === "folder") {
                removeFolder(id);
            } else {
                removeNote(id);
            }
        }

        setOpenDropDown(null);
    };

    const renderTitle = (
        id: number,
        title: string,
        type: "folder" | "note"
    ) => {
        const isRenaming = renamingFolderId === id || renamingNoteId === id;
        const dropdownId = `${type}-${id}`;

        if (isRenaming) {
            return (
                <input
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onBlur={() => {
                        if (type === "folder") {
                            renameFolder(id, tempTitle);
                            setRenamingFolderId(null);
                        } else {
                            renameNote(id, tempTitle);
                            setRenamingNoteId(null);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (type === "folder") {
                                renameFolder(id, tempTitle);
                                setRenamingFolderId(null);
                            } else {
                                renameNote(id, tempTitle);
                                setRenamingNoteId(null);
                            }
                        }
                    }}
                    autoFocus
                />
            );
        }

        return (
            <>
                <span>{title}</span>
                <div className={styles.dropdownContainer}>
                    <button
                        onClick={(e) => handleDropdownToggle(dropdownId, e)}
                        className={styles.iconButton}
                    >
                        {MoreIcon}
                    </button>

                    {openDropDown === dropdownId && (
                        <div className={styles.dropdown}>
                            <button
                                onClick={(e) => handleEdit(id, title, type, e)}
                                className={styles.dropdownItem}
                            >
                                {EditIcon}
                                <span>Edit</span>
                            </button>

                            <button
                                onClick={(e) => handleDelete(id, type, e)}
                                className={styles.dropdownItem}
                            >
                                {DeleteIcon}
                                <span>Delete</span>
                            </button>
                        </div>
                    )}
                </div>
            </>
        );
    };

    const handleOutsideClick = () => {
        setOpenDropDown(null);
    };

    return (
        <div
            ref={sidebarReference}
            className={styles.directorySidebar}
            style={{ width: sidebarWidth }}
            onClick={handleOutsideClick}
        >
            <h3 className={styles.title}>Notes</h3>

            <ul className={styles.list}>
                {folders.map((folder) => (
                    <li
                        key={folder.id}
                        className={`${styles.item} ${folder.id === activeFolderId ? styles.active : ""}`}
                        onClick={() => setActiveFolderId(folder.id)}
                    >
                        <strong style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <button
                                onClick={(e) => toggleFolderCollapse(folder.id, e)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {collapsedFolders.has(folder.id) ? RightIcon : DownIcon}
                            </button>
                            {renderTitle(folder.id, folder.title, "folder")}
                        </strong>

                        {!collapsedFolders.has(folder.id) && (
                            <ul className={styles.subList}>
                                {notes
                                    .filter((note) => note.folderId === folder.id)
                                    .map((note) => (
                                        <li
                                            key={note.id}
                                            className={`${styles.item} ${note.id === activeNoteId ? styles.active : ""}`}
                                            onClick={() => setActiveNoteId(note.id)}
                                        >
                                            {renderTitle(
                                                note.id,
                                                note.title,
                                                "note"
                                            )}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </li>
                ))}

                {unassignedNotes.length > 0 && (
                    <li className={styles.folderItem}>
                        <strong>Unassgined</strong>
                        <ul className={styles.subList}>
                            {unassignedNotes.map((note) => (
                                <li
                                    key={note.id}
                                    className={`${styles.item} ${note.id === activeNoteId ? styles.active : ""}`}
                                    onClick={() => setActiveNoteId(note.id)}
                                >
                                    {renderTitle(note.id, note.title, "note")}
                                </li>
                            ))}
                        </ul>
                    </li>
                )}
            </ul>

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '4px',
                    height: '100%',
                    cursor: 'ew-resize',
                    backgroundColor: isResizing ? '#999' : 'transparent'
                }}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
}

export default DirectorySidebar;
