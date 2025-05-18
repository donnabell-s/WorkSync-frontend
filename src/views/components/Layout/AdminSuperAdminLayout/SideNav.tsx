import React from 'react'
import SideNavLinkDropdown from './SideNavLinkDropdown'
import { MdAdminPanelSettings, MdMeetingRoom } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { AiOutlineAudit } from "react-icons/ai";
import { FaUserCog, FaUser } from "react-icons/fa";

interface SideNavProps {
    nav: boolean;
    role: 'admin' | 'superadmin';
}

const SideNav: React.FC<SideNavProps> = ({ nav, role }) => {


    return (
        <div className={`fixed bg-[#FFFFFF] sm:w-67 w-full h-full flex flex-col overflow-y-auto shadow-zinc-500 shadow-lg duration-300 ease-in-out
            ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
            <SideNavLinkDropdown icon={<MdAdminPanelSettings className='size-7' />} label="Superadmin View" />
            <SideNavLinkDropdown icon={<MdMeetingRoom className='size-6' />} label="Room Management" />
            <SideNavLinkDropdown icon={<FaBookBookmark className='size-5' />} label="Booking Management" />
            <SideNavLinkDropdown icon={<AiOutlineAudit className='size-6' />} label="Audit Logs" />
            {
                role === 'superadmin' &&
                <SideNavLinkDropdown icon={<FaUserCog className='size-5' />} label="Admins" />
            }
            <SideNavLinkDropdown icon={<FaUser className='size-5' />} label="Users" />
        </div>
    )
}

export default SideNav;