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
    <div className="min-h-screen w-full bg-[#F7F8FA] p-0 md:px-0 xl:px-0 overflow-y-auto">
      <div className="max-w-5xl mx-auto pt-8">
        <a href="#" className="flex items-center text-[#5B5B5B] text-sm font-medium hover:underline mb-6">
          <span className="mr-2 text-lg">&lt;</span> Back to View Bookings
        </a>
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden border border-[#E5E7EB]">
          <div className="flex justify-between items-center px-8 pt-8 pb-2">
            <h1 className="text-2xl font-bold text-[#2D2D2D]">BOOKING DETAILS</h1>
            {mode === 'view' && (
              <button className="flex items-center gap-2 bg-[#FFC107] hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-5 rounded-md shadow transition">
                <FaEdit className="text-base" />
                Edit
              </button>
            )}
          </div>
          <div className="border-t border-[#E5E7EB] mt-4" />
          <div className="flex flex-col lg:flex-row gap-0">
            {/* Left Column */}
            <div className="flex-1">
              <DetailRow label="Organizer" value={dummyBooking.organizer} />
              <Divider />
              <DetailRow label="User ID" value={dummyBooking.userId} />
              <Divider />
              <DetailRow label="Meeting/Event Title" value={dummyBooking.title} />
              <Divider />
              <DetailRow
                label="Date/Time"
                value={
                  <>
                    <div>{dummyBooking.date}</div>
                    <div>{dummyBooking.day}</div>
                    <div>{dummyBooking.time}</div>
                  </>
                }
                multiLine
              />
              <Divider />
              <DetailRow label="Description" value={dummyBooking.description} />
              <Divider />
              <DetailRow label="Expected Attendees" value={dummyBooking.attendees.toString()} />
              <Divider />
              <DetailRow label="Selected Room" value={dummyBooking.room} />
              <Divider />
              <DetailRow
                label="Status on Booking Date"
                value={
                  <span className={`font-bold ${mode === 'approved' ? 'text-[#0077CC]' : 'text-[#28A745]'}`}>
                    {mode === 'approved' ? 'APPROVED' : dummyBooking.status}
                  </span>
                }
              />
            </div>
            {/* Right Column */}
            <div className="flex-1 flex items-center justify-center border-l border-[#E5E7EB] min-h-[300px]">
              <div className="w-[90%] h-[180px] rounded overflow-hidden my-8">
                <img
                  src={dummyBooking.roomImage}
                  alt="Meeting Room"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          </div>
          {mode === 'view' && (
            <div className="border-t border-[#E5E7EB] mt-2" />
          )}
          {mode === 'view' && (
            <div className="flex gap-4 px-8 py-6 bg-white">
              <button
                onClick={onApprove}
                className="flex items-center gap-2 bg-[#28A745] hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-md shadow-md transition"
              >
                <FaCheck className="text-lg" />
                Approve
              </button>
              <button className="flex items-center gap-2 bg-[#DC3545] hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-md shadow-md transition">
                <FaTimes className="text-lg" />
                Decline
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  multiLine?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, multiLine = false }) => (
  <div className={`flex ${multiLine ? 'items-start' : 'items-center'} px-8 py-4`}>
    <div className="w-1/3 min-w-[160px] text-[#5B5B5B] text-sm font-semibold">{label}</div>
    <div className={`flex-1 text-base text-[#333] ${multiLine ? 'space-y-0' : ''}`}>{value}</div>
  </div>
);

const Divider = () => <div className="border-t border-[#E5E7EB] mx-8" />;

export default ViewBooking;
