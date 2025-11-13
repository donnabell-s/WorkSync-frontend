import { useEffect, useMemo, useState } from 'react';
import RoomDetailsForm from '../../../../components/Feature/RoomDetailsForm';
import MeetingDetailsForm from '../../../../components/Feature/MeetingDetailsForm';
import RoomBookingForm from '../../../../components/Feature/RoomBookingForm';
import { useBookings } from '../../../../../context/BookingContext';
import AdminBackLink from '../../../../components/UI/AdminBackLink';

const EditBookedRoom = () => {
  // We display room details for the booking's roomId, not the bookingId
  const { currentBooking } = useBookings();
  const readOnly = useMemo(() => {
    const s = String(currentBooking?.status || '').toLowerCase();
    return s === 'approved' || s === 'declined';
  }, [currentBooking?.status]);

  // Lift description/attendees for controlled MeetingDetailsForm and payload
  const [description, setDescription] = useState<string>("");
  const [attendees, setAttendees] = useState<number>(1);

  // No need to read selectedBookingId for room details; we use currentBooking.roomId

  useEffect(() => {
    if (currentBooking) {
      setDescription(currentBooking.description || "");
      setAttendees(currentBooking.expectedAttendees || 1);
    }
  }, [currentBooking]);

  return (
    <div className='h-full bg-white flex flex-col px-4 sm:px-8 md:px-13 lg:px-25 xl:px-33 py-6 sm:py-8 md:py-10 gap-9'>

      <div className='flex-1 min-h-0 max-w-screen-xl w-full mx-auto flex flex-col gap-9'>
        <div>
          <div className='mb-7'>
            <AdminBackLink label='Back to My Bookings' backPath='/user/my-bookings' />
          </div>
          <RoomBookingForm edit={true} description={description} expectedAttendees={attendees} />
        </div>
        <div  className="h-full flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-13">
          <MeetingDetailsForm
            roomCode={currentBooking?.roomId ?? null}
            readOnly={readOnly}
            description={description}
            onDescriptionChange={setDescription}
            attendees={attendees}
            onAttendeesChange={setAttendees}
          />
          <RoomDetailsForm roomCode={currentBooking?.roomId ?? null} />
        </div>
      </div>
    </div>
  );
};

export default EditBookedRoom;
