import { openDB } from "idb";

// Databse constants
const DB_NAME = "notes-app";
const DB_VERSION = 1;
const NOTE_STORE = "notes";
const FOLDER_STORE = "folders";

// Note structure
interface Note {
    id: number;
    title: string;
    content: string;
    folderId?: number;
    updatedAt: number;
}

// Folder structure
interface Folder {
    id: number;
    title: string;
    parentId?: number;
}

/**
 * Initialize IndexedDB
 * --------------------
 * Creates object stores for notes and folders if they don't exist.
 */
export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(NOTE_STORE)) {
                db.createObjectStore(NOTE_STORE, {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }

            if (!db.objectStoreNames.contains(FOLDER_STORE)) {
                db.createObjectStore(FOLDER_STORE, {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
        },
    });
};

// ======== NOTES ======== //
/**
 * Add new note
 * @param note Note data excluding ID (auto-incremented)
 */
export const addNote = async (note: Omit<Note, "id">) => {
    const db = await initDB();
    return db.add(NOTE_STORE, note);
};

// Get all notes
export const getNotes = async () => {
    const db = await initDB();
    return db.getAll(NOTE_STORE);
};

/**
 * Update an existing note
 * @param note Full note object including ID
 */
export const updateNote = async (note: Note) => {
    const db = await initDB();
    return db.put(NOTE_STORE, note);
};

/**
 * Delete note by ID
 * @param id Note ID
 */
export const deleteNote = async (id: number) => {
    const db = await initDB();
    return db.delete(NOTE_STORE, id);
};

// ======== FOLDERS ======== //
/**
 * Add new folder
 * @param folder Folder data excluding ID (auto-incremented)
 */
export const addFolder = async (folder: Omit<Folder, "id">) => {
    const db = await initDB();
    return db.add(FOLDER_STORE, folder);
};

// Get all folders
export const getFolders = async () => {
    const db = await initDB();
    return db.getAll(FOLDER_STORE);
};

/**
 * Update an existing folder
 * @param folder Full folder object including ID
 */
export const updateFolder = async (folder: Folder) => {
    const db = await initDB();
    return db.put(FOLDER_STORE, folder);
};

/**
 * Delete folder by ID
 * @param id Folder ID
 */
export const deleteFolder = async (id: number) => {
    const db = await initDB();
    return db.delete(FOLDER_STORE, id);
};
