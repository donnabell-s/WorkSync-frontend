import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Header from '../../../components/Layout/AdminSuperAdminLayout/Header'
import SideNav from '../../../components/Layout/AdminSuperAdminLayout/SideNav'
import { useAuth } from '../../../../context/AuthContext'

const AdminMain = () => {

  const [nav, setNav] = useState(true);
  const { user } = useAuth();

  const handleNav = () => {
    setNav(!nav);
  }

  return (
    <div className='h-screen w-screen flex flex-col min-w-20 min-h-20'>
      <Header nav={nav} toggleNav={handleNav} />
      <main className='flex h-[calc(100%-4rem)] bg-[#F3F4F6]'>
        <SideNav role={user!.role as 'admin' | 'superadmin'} nav={nav} />
        <div className={`w-full h-full overflow-y-auto ${nav ? 'ml-67' : 'ml-0'} duration-300 ease-in-out`}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminMain