import React from 'react'
import SideNavLinkDropdown from './SideNavLinkDropdown'
import { MdAdminPanelSettings, MdMeetingRoom } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { AiOutlineAudit } from "react-icons/ai";
import { FaUserCog, FaUser } from "react-icons/fa";

interface SideNavProps {
    nav: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ nav }) => {
    return (
        <div className={`fixed bg-[#FFFFFF] w-67 h-full flex flex-col shadow-zinc-500 shadow-lg duration-300 ease-in-out
            ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
            <SideNavLinkDropdown icon={<MdAdminPanelSettings className='size-7' />} label="Superadmin View" />
            <SideNavLinkDropdown icon={<MdMeetingRoom className='size-6' />} label="Room Management" />
            <SideNavLinkDropdown icon={<FaBookBookmark className='size-5' />} label="Booking Management" />
            <SideNavLinkDropdown icon={<AiOutlineAudit className='size-6' />} label="Audit Logs" />
            <SideNavLinkDropdown icon={<FaUserCog className='size-6' />} label="Admins" />
            <SideNavLinkDropdown icon={<FaUser className='size-5' />} label="Users" />
        </div>
    )
}

export default SideNav