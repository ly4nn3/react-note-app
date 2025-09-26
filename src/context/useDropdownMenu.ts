import { useState } from "react";

export const useDropdownMenu = () => {
    const [openDropDown, setOpenDropDown] = useState<string | null>(null);

    const handleDropdownToggle = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenDropDown(openDropDown === id ? null : id);
    };

    const handleOutsideClick = () => {
        setOpenDropDown(null);
    };

    const closeDropdown = () => {
        setOpenDropDown(null);
    };

    return {
        openDropDown,
        handleDropdownToggle,
        handleOutsideClick,
        closeDropdown,
    };
};
