import SideContainer from "../../../components/Layout/UserLayout/SideContainer"
import UserHeading from '../../../components/UI/UserHeading'
import UserBookingList from "../../../components/Feature/UserBookingList"

const MyBookings = () => {
  return (
    <div>
      <SideContainer>
      </SideContainer>
      <div className='ml-67 p-10 flex flex-col gap-6'>
        <div className='flex flex-row justify-between'>
          <UserHeading label={"My Bookings"}/>
        </div>
        <div>
          <UserBookingList/>
        </div>
      </div>
    </div>
  )
}

export default MyBookings