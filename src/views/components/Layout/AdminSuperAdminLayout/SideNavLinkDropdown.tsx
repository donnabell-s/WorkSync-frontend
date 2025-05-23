import React, { useState } from 'react'
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { navLinks } from '../../../../constant/superadmin-nav-links';
import SideNavLink from './SideNavLink';
// import { RiDashboardHorizontalFill } from "react-icons/ri";
// import { IoNotifications } from "react-icons/io5";
// import { MdMeetingRoom } from "react-icons/md";
// import { FaBookBookmark, FaUser } from "react-icons/fa6";
// import { FaUserCog } from 'react-icons/fa';

interface SideNavLinkDropdownProps {
    label: string;
    icon: React.ReactNode;
    // nav: boolean;
    // path: string;
    // active: boolean;
}

const SideNavLinkDropdown: React.FC<SideNavLinkDropdownProps> = ({ label, icon }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const getNavLinksKey = (label: string) => {
        switch (label.toLowerCase()) {
            case 'superadmin view':
                return 'superadmin';
            case 'room management':
                return 'room_mgnt';
            case 'booking management':
                return 'booking_mgnt';
            case 'audit logs':
                return 'logs';
            case 'admins':
                return 'admins';
            case 'users':
                return 'users';
            default:
                return '';
        }
    }

    return (
        <div className='flex flex-col'>
            <div className={`flex items-center justify-between p-3 hover:bg-[#F3F4F6] cursor-pointer text-[#1F2937] text-md font-medium
                ${isOpen ? 'bg-[#F3F4F6]' : ''}`
            }
                onClick={handleToggle}>
                <div className='flex items-center gap-4'>
                    <span className='w-7 flex items-center justify-center'>{icon}</span>
                    <p>{label}</p>
                </div>
                {isOpen ?
                    <IoIosArrowDown className='size-5' /> :
                    <IoIosArrowForward className='size-5' />}
            </div>
            <div className={`flex flex-col overflow-hidden transition-[max-height] duration-300 ease-in-out`}
                style={{
                    maxHeight: isOpen ? `${Object.keys(navLinks[getNavLinksKey(label)]).length * 48}px` : '0',
                }}>
                {Object.entries(navLinks[getNavLinksKey(label)]).map(([_, value]) => (
                    <SideNavLink
                        key={value.path}
                        label={value.label}
                        icon={value.icon}
                        path={value.path} />
                ))}
            </div>
        </div>
    )
}

export default SideNavLinkDropdown