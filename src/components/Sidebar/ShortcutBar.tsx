import styles from "./ShortcutBar.module.css";

function ShortcutBar() {
    return (
        <div className={styles.shortcutBar}>
            <div className={styles.icon}></div>
            <div className={styles.icon}></div>
            <div className={styles.icon}></div>
        </div>
    );
}

export default ShortcutBar;