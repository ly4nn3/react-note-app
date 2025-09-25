import { openDB } from "idb";

const DB_NAME = "notes-app";
const DB_VERSION = 1;
const NOTE_STORE = "notes";
const FOLDER_STORE = "folders";

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

// Notes
export const addNote = async (note: any) => {
    const db = await initDB();
    return db.add(NOTE_STORE, note);
};

export const getNotes = async () => {
    const db = await initDB();
    return db.getAll(NOTE_STORE);
};

export const updateNote = async (note: any) => {
    const db = await initDB();
    return db.put(NOTE_STORE, note);
};

export const deleteNote = async (id: number) => {
    const db = await initDB();
    return db.delete(NOTE_STORE, id);
};

// Folders
export const addFolder = async (folder: any) => {
    const db = await initDB();
    return db.add(FOLDER_STORE, folder);
};

export const getFolders = async () => {
    const db = await initDB();
    return db.getAll(FOLDER_STORE);
};

export const updateFolder = async (folder: any) => {
    const db = await initDB();
    return db.put(FOLDER_STORE, folder);
};

export const deleteFolder = async (id: number) => {
    const db = await initDB();
    return db.delete(FOLDER_STORE, id);
};
