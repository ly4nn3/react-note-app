import ShortcutBar from "../components/Sidebar/ShortcutBar";
import DirectorySidebar from "../components/Sidebar/DirectorySidebar";
import NoteEditor from "../components/Editor/NoteEditor";
import { SidebarProvider } from "../context/SidebarContext";

import styles from "./AppLayout.module.css";
import { NotesProvider } from "../context/NotesContext";

function AppLayout() {
    return (
        <NotesProvider>
            <SidebarProvider>
                <div className={styles.appLayout}>
                    <ShortcutBar />
                    <DirectorySidebar />
                    <NoteEditor />
                </div>
            </SidebarProvider>
        </NotesProvider>
    );
}

export default AppLayout;
