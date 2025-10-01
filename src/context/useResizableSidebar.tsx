import { useState, useRef, useEffect, useCallback } from "react";

/**
 * useResizableSidebar Hook
 * ------------------------
 * Handles logic for resizable sidebar.
 * - Tracks sidebar width and stores it in localStorage
 * - Manages resizing state when user drags resize handle
 * - Provides ref for sidebar DOM element
 * - Applies min/max width constraints
 * - Handles mouse events globally during resize
 */
export const useResizableSidebar = () => {
    // Sidebar width state, default 280px or localStorage value if available
    const [sidebarWidth, setSidebarWidth] = useState(() => {
        const saved = localStorage.getItem("sidebarWidth");
        return saved ? parseInt(saved, 10) : 280;
    });
    const [isResizing, setIsResizing] = useState(false); // Whether resizing is active
    const [startX, setStartX] = useState(0); // Mouse X at start of drag
    const [startWidth, setStartWidth] = useState(0); // Sidebar width at start of drag
    const sidebarRef = useRef<HTMLDivElement>(null); // Ref to sidebar DOM element

    // Initiate resizing on mouse down
    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            setIsResizing(true);
            setStartX(e.clientX);
            setStartWidth(sidebarWidth);
            e.preventDefault(); // Prevent text selection
        },
        [sidebarWidth]
    );

    // Handle mouse move while resizing
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isResizing) return;

            const deltaX = e.clientX - startX;
            const newWidth = startWidth + deltaX;
            const minWidth = 200;
            const maxWidth = 600;

            if (newWidth >= minWidth && newWidth <= maxWidth) {
                setSidebarWidth(newWidth);
            }
        },
        [isResizing, startX, startWidth]
    );

    // Stop resizing on mouse up
    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
    }, []);

    // Persist sidebar width in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("sidebarWidth", sidebarWidth.toString());
    }, [sidebarWidth]);

    // Global mouse events when resizing; clean up after
    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "ew-resize";
            document.body.style.userSelect = "none";
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    return {
        sidebarWidth,
        isResizing,
        handleMouseDown,
        sidebarRef,
    };
};
