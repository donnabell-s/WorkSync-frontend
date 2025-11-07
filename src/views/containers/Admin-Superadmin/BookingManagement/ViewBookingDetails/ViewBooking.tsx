import React from 'react';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { Booking } from './../../../../components/Feature/UserBookingListInterface';
import AdminBackLink from '../../../../components/UI/AdminBackLink';

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
}) => {
  const location = useLocation();
  const booking = (location.state as { booking: Booking })?.booking;
  const navigate = useNavigate();

  if (!booking) {
    return <div>No booking data found.</div>;
  }

  const handleCancel = () => {
    navigate('/admin/bookings/cancel', { state: { booking } });
  };

  const handleEdit = (booking: Booking) => {
    navigate('/admin/bookings/edit', { state: { booking } });
  }

  return (
    <div className="w-full p-0 m-0 flex flex-col">
        <div className="mb-6 ml-4 md:ml-0">
          <AdminBackLink label='Back to View Bookings' backPath='/admin/bookings/view' />
        </div>
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden border border-[#E5E7EB] w-full mb-8">
          <div className="flex justify-between items-center px-4 md:px-8 pt-8 pb-2">
            <h1 className="text-2xl font-bold text-[#2D2D2D]">BOOKING DETAILS</h1>
            {mode === 'view' && (
              <button className="flex items-center gap-2 bg-[#FFC107] hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-5 rounded-md shadow transition"
              onClick={() => handleEdit(booking)}>
                <FaEdit className="text-base" />
                Edit
              </button>
            )}
          </div>
          <div className="border-t border-[#E5E7EB] mt-4 mx-0" />
          
          <DetailRow label="Organizer" value='John Doe' />
          <Divider />
          <DetailRow label="User ID" value={dummyBooking.userId} />
          <Divider />
          <DetailRow label="Meeting/Event Title" value={dummyBooking.title} />
          <Divider />
          <DetailRow
            label="Date/Time"
            value={
                <div>
                  <div>
                  {(() => {
                    const dateObj = new Date(booking.date);
                    return isNaN(dateObj.getTime())
                    ? booking.date
                    : dateObj.toLocaleDateString(undefined, { month: 'long', day: '2-digit', year: 'numeric' });
                  })()}
                  </div>
                  <div>
                  {(() => {
                    const dateObj = new Date(booking.date);
                    return isNaN(dateObj.getTime())
                    ? ''
                    : dateObj.toLocaleDateString(undefined, { weekday: 'long' });
                  })()}
                  </div>
                  <div>
                  {(() => {
                    // booking.time is expected to be "HH:mm-HH:mm" or "HH:mm AM/PM - HH:mm AM/PM"
                    // Try to parse and format to 12-hour with AM/PM
                    const timeRange = booking.time?.split('-');
                    if (!timeRange || timeRange.length !== 2) return booking.time;
                    const formatTime = (t: string) => {
                    // If already contains AM/PM, just return
                    if (t.match(/am|pm/i)) return t.trim();
                    const [h, m] = t.trim().split(':');
                    if (!h || !m) return t;
                    let hour = parseInt(h, 10);
                    const minute = m;
                    const ampm = hour >= 12 ? 'PM' : 'AM';
                    hour = hour % 12 || 12;
                    return `${hour}:${minute} ${ampm}`;
                    };
                    return `${formatTime(timeRange[0])} - ${formatTime(timeRange[1])}`;
                  })()}
                  </div>
                </div>
            }
            multiLine
          />
          <Divider />
          <DetailRow label="Description" value='N/A' />
          <Divider />
          <DetailRow label="Expected Attendees" value={120} />
          <Divider />
          
          <div className="flex flex-col lg:flex-row px-4 md:px-8 py-4 items-start lg:items-center">
            <div className="w-full lg:w-1/3 min-w-[160px] text-[#2D2D2D] text-sm font-semibold flex flex-col gap-6">
              <span>Selected Room</span>
              <span>Status on Booking Date</span>
            </div>
            <div className="flex-1 w-full flex flex-col lg:flex-row items-start lg:items-center mt-4 lg:mt-0">
              <div className="flex flex-col gap-6 flex-1 w-full">
                <span className="text-base text-[#333]">{booking.room}</span>
                <span className="font-bold text-[#28A745]">{booking.status}</span>
              </div>
              <img
                src={dummyBooking.roomImage}
                alt="Meeting Room"
                className="h-[80px] w-full max-w-[220px] object-cover rounded mt-4 lg:mt-0 lg:ml-6"
              />
            </div>
          </div>
          <div className="border-t border-[#E5E7EB] mx-0" />
        
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
                onClick={handleCancel}
                className="flex items-center gap-2 bg-[#DC3545] hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-md shadow-md transition w-full sm:w-auto"
              >
                <FaTimes className="text-lg" />
                Cancel
              </button>
            </div>
          )}
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
