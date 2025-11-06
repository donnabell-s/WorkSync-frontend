import React from 'react'
import { useNavigate } from "react-router"
// import { IoIosArrowForward } from "react-icons/io";

interface SideNavLinkProps {
    label: string;
    selected: boolean;
    path: string;
    // nav: boolean;
    // path: string;
    // active: boolean;
}


const HeaderLink: React.FC<SideNavLinkProps> = ({ label, selected, path }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      if (!selected) {
        navigate(path);
      }
    };

    return (
    <div
            onClick={handleClick}
            className={`
        h-full flex items-center justify-between px-3 cursor-pointer rounded-md
                text-[#4B5563] text-md font-medium
                relative
        after:content-['']
        after:absolute after:left-0 after:bottom-[-2.5px]
  after:h-[2.5px] after:w-full
                after:transition-transform after:duration-300
                after:origin-left
                ${selected ? 'after:scale-x-100 after:bg-emerald-500' : 'after:scale-x-0 after:bg-emerald-500 hover:after:scale-x-100'}
            `}
        >
          <p className={`${selected ? 'text-[#1F2937]' : 'text-[#4B5563]'}`}>{label}</p>
        </div>
      );
  };
  

export default HeaderLink;