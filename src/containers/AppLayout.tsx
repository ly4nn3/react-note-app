import ShortcutBar from "../components/Sidebar/ShortcutBar";
import DirectorySidebar from "../components/Sidebar/DirectorySidebar";
import NoteEditor from "../components/Editor/NoteEditor";
import { SidebarProvider } from "../context/SidebarProvider";
import { NotesProvider } from "../context/NotesProvider";

import styles from "../styles/modules/AppLayout.module.css";

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
