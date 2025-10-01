import { useState, useEffect } from "react";

/**
 * useDropdownmenu Hook
 * --------------------
 * Manages open/close state of dropdown menus.
 * Provides function to toggle:
 * - close or auto close by clicking outside or pressing Enter/Escape
 */
export const useDropdownMenu = () => {
    // Tracks currently open dropdown ID; null if none
    const [openDropDown, setOpenDropDown] = useState<string | null>(null);

    /**
     * Toggle dropdown by ID
     * - If same dropdown is open, close it
     * - Otherwise, open specified dropdown
     */
    const handleDropdownToggle = (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // prevent click from bubbling to document
        setOpenDropDown(openDropDown === id ? null : id);
    };

    // Close any open dropdown
    const closeDropdown = () => {
        setOpenDropDown(null);
    };

    /**
     * Side effect to handle clicks outside and key presses
     * - Closes dropdown if user clicks anywhere
     * - Closes dropdown on Escape or Enter key
     */
    useEffect(() => {
        if (!openDropDown) return;

        const handleDocumentClick = () => {
            closeDropdown();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeDropdown();
            }
            if (e.key === "Enter") {
                closeDropdown();
            }
        };

        document.addEventListener("click", handleDocumentClick);
        document.addEventListener("keydown", handleKeyDown);

        // Must cleanup listeners on unmount or when dropdown closes
        return () => {
            document.removeEventListener("click", handleDocumentClick);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openDropDown]);

    return {
        openDropDown,
        handleDropdownToggle,
        closeDropdown,
    };
};
