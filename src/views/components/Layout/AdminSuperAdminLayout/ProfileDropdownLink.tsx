import React from "react";
import { useNavigate } from "react-router";

interface ProfileDropdownProps {
    icon: React.ReactNode;
    label: string;
    path?: string;
    onClick?: () => void;
}

const ProfileDropdownLink: React.FC<ProfileDropdownProps> = ({ icon, label, path, onClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (path) {
            navigate(path);
        }
    };

    return (
        <div
            onClick={onClick ? onClick : handleClick}
            className="flex flex-row text-md text-[#1F2937] items-center gap-2 cursor-pointer 
                hover:text-emerald-500
                transition duration-200 ease-in-out`"
        >
            <span>{icon}</span>
            <p>{label}</p>
        </div>
    )
}

export default ProfileDropdownLink;