import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import ViewRoomHeader from './ViewRoomHeader';
import Calendar from './RoomDetails/Calendar';
import History from './RoomDetails/History';
import Reservations from './RoomDetails/Reservations';
<<<<<<< HEAD
import AdminBackLink from '../../../../components/UI/AdminBackLink';
=======
>>>>>>> origin/admin-room-detail/yana

const ViewRoomDetails = () => {

  const [activeTab, setActiveTab] = useState('Calendar');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='flex flex-col gap-0 bg-[#F3F4F6] w-full h-full px-7 py-4 rounded-md'>
<<<<<<< HEAD
      <AdminBackLink label='Back to View Rooms' backPath='/admin/rooms/view' />
=======
      <div className='w-fit'>
        <a href="/admin/rooms/view" className='flex items-center gap-2 text-[#2563EB] text-md font-medium cursor-pointer hover:underline'>
          <IoIosArrowBack className='size-5' />
          Back to View Rooms
        </a>
      </div>
>>>>>>> origin/admin-room-detail/yana
      <div className='flex flex-col gap-4 mt-5 bg-white h-full w-full rounded-md shadow-md'>
        <ViewRoomHeader activeTab={activeTab} handleTabClick={handleTabClick} />
        {activeTab === 'Calendar' && <Calendar />}
        {activeTab === 'History' && <History />}
        {activeTab === 'Reservations' && <Reservations />}
      </div>
    </div>
  )
}

export default ViewRoomDetails