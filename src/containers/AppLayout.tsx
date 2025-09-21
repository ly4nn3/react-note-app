import ShortcutBar from "../components/Sidebar/ShortcutBar";
import DirectorySidebar from "../components/Sidebar/DirectorySidebar";
import NoteEditor from "../components/Editor/NoteEditor";

import styles from "./AppLayout.module.css";

function AppLayout() {
    return (
        <div className={styles.appLayout}>
            <ShortcutBar />
            <DirectorySidebar />
            <NoteEditor />
        </div>
    );
}

export default AppLayout;
