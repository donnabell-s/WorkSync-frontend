import AdminHeading from '../../../../components/UI/AdminHeading'
import ViewManagementHeader from '../../../../components/UI/ViewManagementHeader'
import BookingList from '../../../../components/Feature/BookingList'
import { sampleBookingList } from '../../../../components/Feature/UserBookingListInterface'
import { useState } from 'react'


const ViewBookings = () => {
  const [filteredBookings, setFilteredBookings] = useState(sampleBookingList)

  return (
    <div className='h-[calc(100%-3rem)] flex flex-col p-3 px-7'>
      <div>
        <AdminHeading label="BOOKINGS" />
      </div>
      <div className='h-full flex flex-col mt-5 bg-white rounded-lg shadow-md divide-y-1 divide-[#D2D4D8]'>
        <ViewManagementHeader view="bookings"  setFunction={setFilteredBookings} />
        <div className='h-full bg-[#F3F4F6] p-3 overflow-y-scroll rounded-md'>
          {
            filteredBookings.length > 0 ?
              <BookingList bookings={filteredBookings} /> :
              <div className='flex items-center justify-center h-full'>
                <p className='text-gray-500 text-md'>No Bookings found</p>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ViewBookings