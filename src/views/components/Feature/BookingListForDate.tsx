// import React from 'react';
// import { useBookings } from '../../../context/BookingContext';

// type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

// interface Booking {
//   id: number;
//   date: string;
//   title: string;
//   start_time: string;
//   end_time: string;
//   status: BookingStatus;
// }

// const mockBookings: Booking[] = [
//   { id: 1, date: '2025-04-27', title: 'Team Meeting', start_time: '10:00 AM', end_time: '11:00 AM', status: 'cancelled' },
//   { id: 2, date: '2025-04-29', title: 'Team Meeting', start_time: '10:00 AM', end_time: '11:00 AM', status: 'completed' },
//   { id: 3, date: '2025-05-16', title: 'Client Call', start_time: '2:30 PM', end_time: '11:00 AM', status: 'upcoming' },
//   { id: 4, date: '2025-05-19', title: 'Project Review', start_time: '11:00 AM', end_time: '11:00 AM', status: 'cancelled' },
// ];

// interface BookingListForDateProps {
//   date: Date;
// }

// const BookingListForDate: React.FC<BookingListForDateProps> = ({ date }) => {
//   const {booking} = useBookings();

//   const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
//     .toString()
//     .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

//   const bookingsForDate = mockBookings.filter(
//     (booking) => booking.date === formattedDate
//   );

//   if (bookingsForDate.length === 0) return null;

//   const getStatusStyles = (status: BookingStatus) => {
//     switch (status) {
//       case 'cancelled':
//         return 'bg-[#EF4444] text-white';
//       case 'upcoming':
//         return 'bg-[#10B981] text-white';
//       case 'completed':
//         return 'bg-[#F59E0B] text-white';
//       default:
//         return 'bg-[#1E40AF] text-white';
//     }
//   };

//   return (
//     <div className="w-full translate-x-[-6px]">
//       {bookingsForDate.map((booking) => (
//         <div
//           key={booking.id}
//           className={`${getStatusStyles(booking.status)} flex items-start text-xs font-semibold rounded px-1 py-1 truncate mb-0.5`}
//         >
//           {booking.start_time} - {booking.title}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookingListForDate;

import React from 'react';
import { useBookings } from '../../../context/BookingContext';
import { occursOnDate } from '../../../utils/recurrence';

// Status rendering handled via booking.status string values

// Using context-provided booking shape; keep local types minimal

interface BookingListForDateProps {
  date: Date;
}

const BookingListForDate: React.FC<BookingListForDateProps> = ({ date }) => {
  const { bookings } = useBookings();

  // Filter bookings that have an occurrence on the date
  const bookingsForDate = bookings.filter((b: any) => occursOnDate(b, date));

  if (bookingsForDate.length === 0) return null;

  const isRecurringBooking = (booking: any): boolean => {
    const r = (booking as any).recurrence;
    try {
      const parsed = typeof r === 'string' ? JSON.parse(r as string) : r;
      return Boolean(parsed && (parsed.isRecurring || (Array.isArray(parsed.dates) && parsed.dates.length > 0)));
    } catch {
      return false;
    }
  };

  const styleForBooking = (booking: any) => {
    const status = String(booking.status || '').toLowerCase();
    if (status === 'declined' || status === 'cancelled') return 'bg-[#EF4444] text-white';
    if (status === 'pending') return 'bg-[#F59E0B] text-white';
    return isRecurringBooking(booking) ? 'bg-[#1E40AF] text-white' : 'bg-[#10B981] text-white';
  };

  // Helper to format time string (you might want to adjust this depending on your date format)
  const formatTime = (dateTimeString: string | Date) => {
    const d = new Date(dateTimeString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full translate-x-[-6px]">
      {bookingsForDate.map((booking: any) => (
        <div
          key={booking.bookingId ?? booking.id}
          className={`${styleForBooking(booking)} flex items-start text-xs font-semibold rounded px-1 py-1 truncate mb-0.5`}
          title={isRecurringBooking(booking) ? 'Recurring booking' : 'One-time booking'}
        >
          {formatTime(booking.startDatetime ?? booking.startDateTime)} - {booking.title}
        </div>
      ))}
    </div>
  );
};

export default BookingListForDate;
