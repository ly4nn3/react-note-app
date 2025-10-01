import styles from "../../styles/modules/ResizeHandle.module.css";

/**
 * Props for ResizeHandle
 * ----------------------
 * - isResizing: whether the sidebar is currently being resized
 * - onMouseDown: initiate resizing handler (mouse down event)
 */
interface ResizeHandleProps {
    isResizing: boolean;
    onMouseDown: (e: React.MouseEvent) => void;
}

/**
 * ResizeHandle Component
 * ----------------------
 * Draggable divider used to resize the sidebar.
 * Visually styled as a thin bar;
 * - Additionl `resizing` class when sidebar is actively being resized
 */
function ResizeHandle({ isResizing, onMouseDown }: ResizeHandleProps) {
    return (
        <div
            className={`${styles.resizeHandle} ${isResizing ? styles.resizing : ""}`}
            onMouseDown={onMouseDown}
        />
    );
}

export default ResizeHandle;
