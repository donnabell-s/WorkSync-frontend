import React from 'react';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

interface ViewBookingProps {
  mode?: 'view' | 'approved';
  onApprove?: () => void;
  onCancel?: () => void;
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

const ViewBooking: React.FC<ViewBookingProps> = ({
  mode = 'view',
  onApprove,
  onCancel,
}) => {
  return (
    <div className="min-h-screen w-full bg-[#F7F8FA] p-0 m-0">
      <div className="w-full pt-8 px-0 md:px-8">
        <a
          href="/admin/bookings"
          className="flex items-center text-[#0077CC] text-sm font-medium hover:underline mb-6 ml-4 md:ml-0"
        >
          <span className="mr-2 text-lg">&lt;</span> Back to View Bookings
        </a>
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden border border-[#E5E7EB] w-full">
          <div className="flex justify-between items-center px-4 md:px-8 pt-8 pb-2">
            <h1 className="text-2xl font-bold text-[#2D2D2D]">BOOKING DETAILS</h1>
            {mode === 'view' && (
              <button className="flex items-center gap-2 bg-[#FFC107] hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-5 rounded-md shadow transition">
                <FaEdit className="text-base" />
                Edit
              </button>
            )}
          </div>
          <div className="border-t border-[#E5E7EB] mt-4 mx-0" />
          {/* Details */}
          <DetailRow label="Organizer" value={dummyBooking.organizer} />
          <Divider />
          <DetailRow label="User ID" value={dummyBooking.userId} />
          <Divider />
          <DetailRow label="Meeting/Event Title" value={dummyBooking.title} />
          <Divider />
          <DetailRow
            label="Date/Time"
            value={
              <div>
                <div>{dummyBooking.date}</div>
                <div>{dummyBooking.day}</div>
                <div>{dummyBooking.time}</div>
              </div>
            }
            multiLine
          />
          <Divider />
          <DetailRow label="Description" value={dummyBooking.description} />
          <Divider />
          <DetailRow label="Expected Attendees" value={dummyBooking.attendees.toString()} />
          <Divider />
          {/* Selected Room + Status + Image row */}
          <div className="flex flex-col lg:flex-row px-4 md:px-8 py-4 items-start lg:items-center">
            <div className="w-full lg:w-1/3 min-w-[160px] text-[#2D2D2D] text-sm font-semibold flex flex-col gap-6">
              <span>Selected Room</span>
              <span>Status on Booking Date</span>
            </div>
            <div className="flex-1 w-full flex flex-col lg:flex-row items-start lg:items-center mt-4 lg:mt-0">
              <div className="flex flex-col gap-6 flex-1 w-full">
                <span className="text-base text-[#333]">{dummyBooking.room}</span>
                <span className="font-bold text-[#28A745]">{dummyBooking.status}</span>
              </div>
              <img
                src={dummyBooking.roomImage}
                alt="Meeting Room"
                className="h-[80px] w-full max-w-[220px] object-cover rounded mt-4 lg:mt-0 lg:ml-6"
              />
            </div>
          </div>
          <div className="border-t border-[#E5E7EB] mx-0" />
          {/* Action Buttons */}
          {mode === 'view' && (
            <div className="flex flex-col sm:flex-row gap-4 px-4 md:px-8 py-6 bg-white">
              <button
                onClick={onApprove}
                className="flex items-center justify-center gap-2 bg-[#28A745] hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-md shadow-md transition w-full sm:w-auto"
              >
                <FaCheck className="text-lg" />
                Approve
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#DC3545] hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-md shadow-md transition w-full sm:w-auto">
                <FaTimes className="text-lg" />
                Decline
              </button>
            </div>
          )}
          {mode === 'approved' && (
            <div className="flex flex-col sm:flex-row gap-4 px-4 md:px-8 py-6 bg-white">
              <div className="flex items-center gap-2 text-[#28A745] font-bold text-base">
                <FaCheck className="text-lg" />
                APPROVED
              </div>
              <button
                onClick={onCancel}
                className="flex items-center gap-2 bg-[#DC3545] hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-md shadow-md transition w-full sm:w-auto"
              >
                <FaTimes className="text-lg" />
                Cancel
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
  <div className={`flex ${multiLine ? 'items-start' : 'items-center'} px-4 md:px-8 py-4`}>
    <div className="w-full lg:w-1/3 min-w-[160px] text-[#2D2D2D] text-sm font-semibold">{label}</div>
    <div className={`flex-1 text-base text-[#333] ${multiLine ? 'space-y-0' : ''}`}>{value}</div>
  </div>
);

const Divider = () => <div className="border-t border-[#E5E7EB] mx-0" />;

export default ViewBooking;
