import React from 'react';

type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

interface Booking {
  id: number;
  date: string;
  title: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
}

const mockBookings: Booking[] = [
  { id: 1, date: '2025-04-27', title: 'Team Meeting', start_time: '10:00 AM', end_time: '11:00 AM', status: 'cancelled' },
  { id: 2, date: '2025-04-29', title: 'Team Meeting', start_time: '10:00 AM', end_time: '11:00 AM', status: 'completed' },
  { id: 3, date: '2025-05-16', title: 'Client Call', start_time: '2:30 PM', end_time: '11:00 AM', status: 'upcoming' },
  { id: 4, date: '2025-05-19', title: 'Project Review', start_time: '11:00 AM', end_time: '11:00 AM', status: 'cancelled' },
];

interface BookingListForDateProps {
  date: Date;
}

const BookingListForDate: React.FC<BookingListForDateProps> = ({ date }) => {
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  const bookingsForDate = mockBookings.filter(
    (booking) => booking.date === formattedDate
  );

  if (bookingsForDate.length === 0) return null;

  const getStatusStyles = (status: BookingStatus) => {
    switch (status) {
      case 'cancelled':
        return 'bg-[#EF4444] text-white';
      case 'upcoming':
        return 'bg-[#10B981] text-white';
      case 'completed':
        return 'bg-[#F59E0B] text-white';
      default:
        return 'bg-[#1E40AF] text-white';
    }
  };

  return (
    <div className="w-full translate-x-[-6px]">
      {bookingsForDate.map((booking) => (
        <div
          key={booking.id}
          className={`${getStatusStyles(booking.status)} flex items-start text-xs font-semibold rounded px-1 py-1 truncate mb-0.5`}
        >
          {booking.start_time} - {booking.title}
        </div>
      ))}
    </div>
  );
};

export default BookingListForDate;