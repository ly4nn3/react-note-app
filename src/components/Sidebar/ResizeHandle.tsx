import styles from "../../styles/modules/ResizeHandle.module.css";

interface ResizeHandleProps {
    isResizing: boolean;
    onMouseDown: (e: React.MouseEvent) => void;
}

function ResizeHandle({ isResizing, onMouseDown }: ResizeHandleProps) {
    return (
        <div
            className={`${styles.resizeHandle} ${isResizing ? styles.resizing : ""}`}
            onMouseDown={onMouseDown}
        />
    );
}

export default ResizeHandle;
