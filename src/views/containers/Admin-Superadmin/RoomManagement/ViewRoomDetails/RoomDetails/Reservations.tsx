import React, { useMemo } from 'react';
import BookingTableRow from '@/views/components/UI/BookingTableRow';
import { useBookings } from '@/context/BookingContext';
import { useRooms } from '@/context/RoomContext';
import { useNavigate } from 'react-router';
import type { Booking as LegacyBooking } from '@/views/components/Feature/UserBookingListInterface';
import type { Booking as ApiBooking } from '@/types';

interface ReservationsProps {
  searchQuery?: string;
  selectedWeek?: Date;
  selectedStatus?: string;
}

const Reservations: React.FC<ReservationsProps> = ({ searchQuery = '', selectedWeek, selectedStatus = 'all' }) => {
  const { bookings, isLoading } = useBookings();
  const { currentRoom } = useRooms();
  type BookingItem = ApiBooking | LegacyBooking;
  const navigate = useNavigate();

  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[date.getDay()];
  };

  // Function to format date for display (e.g., "MAY 9")
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  };

  // Function to format time range
  const formatTimeRange = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };
    return `${formatTime(startDate)} - ${formatTime(endDate)}`;
  };

  // Function to format date booked
  const formatDateBooked = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' | ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Filter bookings for this room that are upcoming/pending (reservations)
  const roomReservations = useMemo(() => {
    const roomId = currentRoom?.roomId?.toString();
    if (!roomId) return [];

    const now = new Date();
    let filtered = bookings
      .filter(booking =>
        booking.roomId?.toString() === roomId &&
        (booking.status === 'Pending' ||
          booking.status === 'Approved' ||
          new Date(booking.startDatetime) >= now)
      );

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply week filter
    if (selectedWeek) {
      const weekStart = new Date(selectedWeek);
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(selectedWeek);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.startDatetime);
        return bookingDate >= weekStart && bookingDate <= weekEnd;
      });
    }

    // Apply status filter
    if (selectedStatus && selectedStatus !== 'all') {
      filtered = filtered.filter(booking =>
        booking.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    return filtered.sort((a, b) => new Date(a.startDatetime).getTime() - new Date(b.startDatetime).getTime());
  }, [bookings, currentRoom, searchQuery, selectedWeek, selectedStatus]);

  // Separate today's reservations
  const todayReservations = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return roomReservations.filter(booking => {
      const bookingDate = new Date(booking.startDatetime);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() === today.getTime();
    });
  }, [roomReservations]);

  // Group upcoming reservations by date ranges
  const upcomingReservations = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return roomReservations.filter(booking => {
      const bookingDate = new Date(booking.startDatetime);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() > today.getTime();
    });
  }, [roomReservations]);

  // Group upcoming by month
  const groupedUpcoming = useMemo(() => {
    const groups: { [key: string]: typeof upcomingReservations } = {};

    upcomingReservations.forEach(booking => {
      const startDate = new Date(booking.startDatetime);
      const monthYear = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(booking);
    });

    return groups;
  }, [upcomingReservations]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 px-6 py-4">
          <p className="text-gray-600">Loading reservations...</p>
        </div>
      </div>
    );
  }

  const handleBookingClick = (booking: BookingItem) => {
    navigate('/admin/bookings/booking-detail', { state: { booking } });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1">
        <div className="px-6">
          {/* TODAY Section */}
          <div className="">
            <h2 className="text-lg font-semibold">TODAY</h2>
            {todayReservations.length === 0 ? (
              <p className="text-gray-600">No Bookings</p>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                {todayReservations.map(booking => (
                  <BookingTableRow
                    variant='reservations'
                    key={booking.bookingId}
                    bookingId={booking.bookingId}
                    name={booking.title}
                    date={formatDate(booking.startDatetime)}
                    time={formatTimeRange(booking.startDatetime, booking.endDatetime)}
                    organizer={`User ID: ${booking.userRefId}`}
                    dateBooked={formatDateBooked(booking.createdAt)}
                    notes={booking.description || 'None'}
                    day={getDayOfWeek(booking.startDatetime)}
                    recurringBooking={!!booking.recurrence}
                    status={booking.status}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Reservations Section */}
          {Object.entries(groupedUpcoming).map(([monthYear, monthBookings]) => {
            if (monthBookings.length === 0) return null;

            const dates = monthBookings.map(b => new Date(b.startDatetime));
            const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
            const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
            const dateRange = `${minDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${maxDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

            return (
              <div key={monthYear} className="mt-6">
                <h2 className="text-md font-semibold">{dateRange}</h2>
                <div className="mt-2 flex flex-col gap-2">
                  {monthBookings.map(booking => (
                    <BookingTableRow
                      variant='reservations'
                      key={booking.bookingId}
                      bookingId={booking.bookingId}
                      name={booking.title}
                      date={formatDate(booking.startDatetime)}
                      time={formatTimeRange(booking.startDatetime, booking.endDatetime)}
                      organizer={`User ID: ${booking.userRefId}`} 
                      dateBooked={formatDateBooked(booking.createdAt)}
                      notes={booking.description || 'None'}
                      day={getDayOfWeek(booking.startDatetime)}
                      recurringBooking={!!booking.recurrence}
                      status={booking.status}
                      onClick={() => handleBookingClick(booking)}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {roomReservations.length === 0 && todayReservations.length === 0 && (
            <div className="mt-6">
              <p className="text-gray-600">No upcoming reservations for this room.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;