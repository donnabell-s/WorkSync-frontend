import { useEffect, useState } from 'react';
import RoomDetailsForm from '../../../../components/Feature/RoomDetailsForm';
import MeetingDetailsForm from '../../../../components/Feature/MeetingDetailsForm';
import RoomBookingForm from '../../../../components/Feature/RoomBookingForm';
import { useAuth } from '../../../../../context/AuthContext';
import AdminBackLink from '../../../../components/UI/AdminBackLink';

const EditBookedRoom = () => {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const {user} = useAuth();

  useEffect(() => {
    if(user){
    const storedBookingCode = localStorage.getItem("selectedBookingId");
    setBookingId(storedBookingCode);
    }
  }, [user]);

  return (
    <div className='h-full bg-white flex flex-col px-4 sm:px-8 md:px-13 lg:px-25 xl:px-33 py-6 sm:py-8 md:py-10 gap-9'>

      <div className='flex-1 min-h-0 max-w-screen-xl w-full mx-auto flex flex-col gap-9'>
        <div>
          <RoomBookingForm edit={true} />
        </div>
        <div  className="h-full flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-13">
          <MeetingDetailsForm roomCode={bookingId} />
          <RoomDetailsForm roomCode={bookingId} />
        </div>
      </div>
    </div>
  );
};

export default EditBookedRoom;
