import React from 'react'
// import { IoIosArrowForward } from "react-icons/io";

interface SideNavLinkProps {
    label: string;
    icon: React.ReactNode;
    // nav: boolean;
    // path: string;
    // active: boolean;
}

const SideNavLink: React.FC<SideNavLinkProps> = ({ label, icon }) => {
    return (
        <div className='flex items-center justify-between p-3 hover:bg-[#F3F4F6] cursor-pointer rounded-md text-[#1F2937] text-md font-medium'>
            <div className='flex items-center gap-4 pl-7'>
                <span className='w-7 flex items-center justify-center'>{icon}</span>
                <p>{label}</p>
            </div>
        </div>
    )
}

export default SideNavLink