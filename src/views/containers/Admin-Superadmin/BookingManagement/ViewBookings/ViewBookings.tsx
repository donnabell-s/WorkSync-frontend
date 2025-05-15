import React from 'react'
import AdminHeading from '../../../../components/UI/AdminHeading'
import ViewManagementHeader from '../../../../components/UI/ViewManagementHeader'
import RoomList from '../../../../components/Feature/RoomList'

const ViewBookings = () => {
  

  return (
    <div className='h-[calc(100%-3rem)] flex flex-col p-3 px-7'>
      <div>
        <AdminHeading label="BOOKINGS" />
      </div>
      <div className='h-full flex flex-col mt-5 bg-white rounded-lg shadow-md divide-y-1 divide-[#D2D4D8]'>
        <ViewManagementHeader view="bookings" />
        <div className='h-full bg-[#F3F4F6] p-3 overflow-y-scroll rounded-md'>
          
        </div>
      </div>
    </div>
  )
}

export default ViewBookings