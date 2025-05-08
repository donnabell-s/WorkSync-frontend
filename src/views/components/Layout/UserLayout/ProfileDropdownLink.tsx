import React from "react";
import { useNavigate } from "react-router";

interface ProfileDropdownProps{
    icon: React.ReactNode;
    label: string;
    path: string;
}

const ProfileDropdownLink:React.FC<ProfileDropdownProps> = ({icon, label, path}) => {
    const navigate = useNavigate();

    const handleClick = () => {
          navigate(path);
      };
  
    return (
        <div
        onClick={handleClick}
        className="flex flex-row text-md text-[#1F2937] items-center gap-2 cursor-pointer 
                hover:text-emerald-500
                transition duration-200 ease-in-out`"
  >
            <span>{icon}</span>
            <p>{label}</p>
        </div>
    )
}

export default ProfileDropdownLink