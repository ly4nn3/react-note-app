import styles from "./DirectorySidebar.module.css";

function DirectorySidebar() {
    return (
        <div className={styles.directorySidebar}>
            <h3 className={styles.title}>Notes</h3>
            <ul className={styles.list}>
                <li className={styles.item}>Folder 1</li>
                <li className={styles.item}>Folder 2</li>
                <li className={styles.item}>Note A</li>
                <li className={styles.item}>Note B</li>
            </ul>
        </div>
    );
}

export default DirectorySidebar;