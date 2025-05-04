import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Header from '../../../components/AdminSuperAdminLayout/Header'
import SideNav from '../../../components/AdminSuperAdminLayout/SideNav'

const AdminMain = () => {

  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  }

  return (
    <div className='h-screen w-screen flex flex-col'>
      <Header nav={nav} toggleNav={handleNav} />
      <main className='flex h-full'>
        <SideNav nav={nav} />
        <div className={`w-full h-full overflow-y-auto ${nav ? 'ml-67' : 'ml-0'} duration-300 ease-in-out`}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminMain