import React from 'react';
import { FaCheck, FaTimes, FaEdit} from 'react-icons/fa';

interface ViewBookingProps {
  mode?: 'view' | 'approved';
  onApprove?: () => void;
}

const dummyBooking = {
  organizer: 'Jane Doe',
  userId: '#123456',
  title: 'Marketing Project Proposal',
  date: 'May 17, 2022',
  day: 'Friday',
  time: '12:00 PM - 1:20 PM',
  description: 'N/A',
  attendees: 10,
  room: 'Executive Boardroom - CR-102A',
  roomImage: '/src/assets/meeting-room.png',
  status: 'AVAILABLE',
};

const ViewBooking: React.FC<ViewBookingProps> = ({ mode = 'view', onApprove }) => {
  return (
    <div className="min-h-screen w-full bg-white p-8 md:px-20 xl:px-32 overflow-y-auto">
      <div className="flex justify-between items-start mb-8">
        <a href="#" className="text-[#5B5B5B] text-sm font-medium hover:underline">
          &lt; Back to View Bookings
        </a>
        {mode === 'view' && (
          <button className="bg-[#FFC107] text-white text-sm font-semibold py-2 px-5 rounded-md hover:bg-yellow-600 shadow">
            Edit
          </button>
        )}
      </div>

      <h1 className="text-2xl font-bold text-[#2D2D2D] mb-10">BOOKING DETAILS</h1>

      <div className="flex flex-col lg:flex-row gap-12">

        
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          <Detail label="Organizer" value={dummyBooking.organizer} />
          <Detail label="User ID" value={dummyBooking.userId} />
          <Detail label="Event Title" value={dummyBooking.title} />
          <Detail label="Date" value={dummyBooking.date} />
          <Detail label="Day" value={dummyBooking.day} />
          <Detail label="Time" value={dummyBooking.time} />
          <Detail label="Description" value={dummyBooking.description} />
          <Detail label="Number of Attendees" value={dummyBooking.attendees.toString()} />
          <Detail
            label="Status on Booking Date"
            value={mode === 'approved' ? 'APPROVED' : dummyBooking.status}
            color={mode === 'approved' ? 'text-[#0077CC]' : 'text-[#28A745]'}
            bold
          />
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-4">
          <Detail label="Room" value={dummyBooking.room} />
          <div className="w-full h-[300px] rounded overflow-hidden">
            <img
              src={dummyBooking.roomImage}
              alt="Meeting Room"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>
      </div>

      {mode === 'view' && (
        <div className="mt-10 flex gap-4">
          <button
            onClick={onApprove}
            className="bg-[#28A745] hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-md shadow-md"
          >
            Approve
          </button>
          <button className="bg-[#DC3545] hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-md shadow-md">
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

interface DetailProps {
  label: string;
  value: string;
  color?: string;
  bold?: boolean;
}

const Detail: React.FC<DetailProps> = ({ label, value, color = 'text-[#333]', bold = false }) => (
  <div>
    <div className="text-sm text-[#5B5B5B] font-medium mb-1">{label}</div>
    <div className={`text-base ${color} ${bold ? 'font-bold' : 'font-normal'}`}>{value}</div>
  </div>
);

export default ViewBooking;
