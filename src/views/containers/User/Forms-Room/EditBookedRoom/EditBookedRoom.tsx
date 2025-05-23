import { useEffect, useState } from 'react';
import RoomDetailsForm from '../../../../components/Feature/RoomDetailsForm';
import MeetingDetailsForm from '../../../../components/Feature/MeetingDetailsForm';
import RoomBookingForm from '../../../../components/Feature/RoomBookingForm';

const EditBookedRoom = () => {
  const [roomCode, setRoomCode] = useState<string | null>(null);

  useEffect(() => {
    const storedBookingCode = localStorage.getItem("selectedBookingId");
    setRoomCode(storedBookingCode);
  }, []);

  return (
    <div className='h-full bg-white flex flex-col px-4 sm:px-8 md:px-13 lg:px-25 xl:px-33 py-6 sm:py-8 md:py-10 gap-9'>
      <div>
        <RoomBookingForm edit={true} />
      </div>
      <div  className="h-full flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-13">
        <MeetingDetailsForm roomCode={roomCode} />
        <RoomDetailsForm roomCode={roomCode} />
      </div>
    </div>
  );
};

export default EditBookedRoom;
