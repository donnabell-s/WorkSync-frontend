import React from 'react'
import Logo from '../../../../assets/admin-brand-logo.png'
import { IoNotifications } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMenu, IoClose } from "react-icons/io5";

interface HeaderProps {
    nav: boolean;
    toggleNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ nav, toggleNav }) => {
    return (
        <div className='bg-[#1E40AF] h-16 flex items-center justify-between px-4'>
            <div className='flex items-center gap-10'>
                <img src={Logo} alt="Logo" className='h-20  cursor-pointer' />
                {nav ? <IoClose className='text-white size-7 cursor-pointer' onClick={() => { toggleNav() }} /> :
                    <IoMenu className='text-white size-7 cursor-pointer' onClick={() => { toggleNav() }} />}
            </div>
            <div className='text-white flex items-center gap-10'>
                <IoNotifications className='size-6 cursor-pointer' />
                <div className='flex items-center gap-4'>
                    <p className='font-medium cursor-pointer'>John Doe</p>
                    <CgProfile className='size-8 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default Header