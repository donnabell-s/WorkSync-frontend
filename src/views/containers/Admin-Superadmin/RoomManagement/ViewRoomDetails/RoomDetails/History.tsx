import React, { useMemo } from 'react';
import BookingTableRow from '@/views/components/UI/BookingTableRow';
import { useBookings } from '@/context/BookingContext';
import { useRooms } from '@/context/RoomContext';
import type { Booking as LegacyBooking } from '@/views/components/Feature/UserBookingListInterface';
import type { Booking as ApiBooking } from '@/types';
import { useNavigate } from 'react-router';

interface HistoryProps {
    searchQuery?: string;
    selectedWeek?: Date;
}

const History: React.FC<HistoryProps> = ({ searchQuery = '', selectedWeek }) => {
    const { bookings, isLoading } = useBookings();
    const { currentRoom } = useRooms();
    type BookingItem = ApiBooking | LegacyBooking;
    const navigate = useNavigate();

    // Function to get the day of the week from a date string
    const getDayOfWeek = (dateString: string): string => {
        const date = new Date(dateString);
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
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

    // Filter bookings for this room that are completed or cancelled (history)
    const roomBookings = useMemo(() => {
        const roomId = currentRoom?.roomId?.toString();
        if (!roomId) return [];

        const now = new Date();
        let filtered = bookings
            .filter(booking =>
                booking.roomId?.toString() === roomId &&
                (booking.status === 'Completed' ||
                    booking.status === 'Cancelled' ||
                    new Date(booking.endDatetime) < now)
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

        return filtered.sort((a, b) => new Date(b.startDatetime).getTime() - new Date(a.startDatetime).getTime());
    }, [bookings, currentRoom, searchQuery, selectedWeek]);

    // Group bookings by date ranges
    const groupedBookings = useMemo(() => {
        const groups: { [key: string]: typeof roomBookings } = {};

        roomBookings.forEach(booking => {
            const startDate = new Date(booking.startDatetime);
            const monthYear = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

            if (!groups[monthYear]) {
                groups[monthYear] = [];
            }
            groups[monthYear].push(booking);
        });

        return groups;
    }, [roomBookings]);

    // Separate today's bookings
    const todayBookings = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return roomBookings.filter(booking => {
            const bookingDate = new Date(booking.startDatetime);
            bookingDate.setHours(0, 0, 0, 0);
            return bookingDate.getTime() === today.getTime();
        });
    }, [roomBookings]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-gray-100">
                <div className="flex-1 px-6 py-4">
                    <p className="text-gray-600">Loading booking history...</p>
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
                        {todayBookings.length === 0 ? (
                            <p className="text-gray-600">No Bookings</p>
                        ) : (
                            <div className="mt-2 flex flex-col gap-2">
                                {todayBookings.map(booking => (
                                    <BookingTableRow
                                        variant='history'
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
                        )}
                    </div>

                    {/* Previous History Section */}
                    {Object.entries(groupedBookings).map(([monthYear, monthBookings]) => {
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
                                            variant='history'
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
                            </div>
                        );
                    })}

                    {roomBookings.length === 0 && todayBookings.length === 0 && (
                        <div className="mt-6">
                            <p className="text-gray-600">No booking history available for this room.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;