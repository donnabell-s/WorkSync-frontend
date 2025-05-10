import React from 'react';
import HeaderLink from './HeaderLink';
import NotifDropdown from './NotifDropdown';
import ProfileDropdown from './ProfileDropdown';
import Logo from "../../../../assets/user-brand-logo.svg"
import {useLocation} from "react-router"


const Header: React.FC = () => {
    const location = useLocation();

    return (
    <div className="sticky top-0 z-50 flex justify-between p-5 pl-13 pr-10 shadow-zinc-100 shadow-lg bg-[#FFFFFF] shadow-md shadow-zinc-200">
      <div className="flex justify-center items-center">
        <img src={Logo} alt="Logo" className="h-16" />
      </div>
      <div className="flex pt-3 pb-3 gap-4">
        <HeaderLink
          label="Home"
          selected={location.pathname === '/user/home'}
          path="/user/home"
        />
        <HeaderLink
          label="My Bookings"
          selected={location.pathname === '/user/my-bookings'}
          path="/user/my-bookings"
        />
        <HeaderLink
          label="Room Explorer"
          selected={location.pathname === '/user/room-explorer'}
          path="/user/room-explorer"
        />
      </div>
      <div className='flex flex-row gap-5'>
        <ProfileDropdown/>
        <NotifDropdown/>
      </div>
    </div>
  );
}

export default Header;