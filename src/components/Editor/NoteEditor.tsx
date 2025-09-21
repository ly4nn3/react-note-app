import styles from "./NoteEditor.module.css";

function NoteEditor() {
    return (
        <div className={styles.noteEditor}>
            <textarea
                className={styles.textarea}
                placeholder="Start writing here..."
            />
        </div>
    );
}

export default NoteEditor;
