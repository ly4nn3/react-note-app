import ShortcutBar from "../components/Sidebar/ShortcutBar";
import DirectorySidebar from "../components/Sidebar/DirectorySidebar";
import NoteEditor from "../components/Editor/NoteEditor";
import { SidebarProvider } from "../context/SidebarProvider";
import { NotesProvider } from "../context/NotesProvider";

import styles from "../styles/modules/AppLayout.module.css";

/**
 * AppLayout Component
 * -------------------
 * Main layout for the app, wraps all major UI sections:
 * - Provides Notes and Sidebar context to all children
 * - Renders shortcut bar, directory sidebar, and note editor
 *
 * Context Providers:
 * - NotesProvider: manages notes and folders data + actions
 * - SidebarProvider: manages sidebar visibility and active note/folder state
 */
function AppLayout() {
    return (
        <NotesProvider>
            <SidebarProvider>
                <div className={styles.appLayout}>
                    {/* Shortcut buttons for creating notes/folders, sidebar toggle */}
                    <ShortcutBar />
                    {/* Sidebar showing folders and notes */}
                    <DirectorySidebar />
                    {/* Main note editor area */}
                    <NoteEditor />
                </div>
            </SidebarProvider>
        </NotesProvider>
    );
}

export default AppLayout;
