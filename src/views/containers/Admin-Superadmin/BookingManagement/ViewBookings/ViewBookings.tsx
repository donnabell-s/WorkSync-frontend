import AdminHeading from '../../../../components/UI/AdminHeading'
import ViewManagementHeader from '../../../../components/UI/ViewManagementHeader'
import BookingList from '../../../../components/Feature/BookingList'
import { sampleBookingList } from '../../../../components/Feature/UserBookingListInterface'
import { useState } from 'react'


const ViewBookings = () => {
  const [filteredBookings, setFilteredBookings] = useState(sampleBookingList)

  return (
    <div className='h-full min-h-0 flex flex-col px-7 pt-6 pb-8'>
      <div>
        <AdminHeading label="BOOKINGS" />
      </div>
      <div className='h-full min-h-0 flex flex-col mt-5 bg-white rounded-lg shadow-md divide-y-1 divide-[#D2D4D8]'>
        <ViewManagementHeader view="bookings" setFunction={setFilteredBookings} />
  <div className='flex-1 min-h-0 bg-[#EAECEF] p-3 rounded-md flex flex-col overflow-hidden'>
          <div className='flex-1 min-h-0 overflow-y-auto overscroll-contain'>
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
    </div>
  )
}

export default ViewBookings;
