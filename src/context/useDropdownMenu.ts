import { useState, useEffect } from "react";

export const useDropdownMenu = () => {
    const [openDropDown, setOpenDropDown] = useState<string | null>(null);

    const handleDropdownToggle = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenDropDown(openDropDown === id ? null : id);
    };

    const closeDropdown = () => {
        setOpenDropDown(null);
    };

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
