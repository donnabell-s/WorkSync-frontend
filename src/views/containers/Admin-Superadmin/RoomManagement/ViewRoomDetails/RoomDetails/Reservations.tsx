import React from 'react';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import BookingTableRow from '../../../../../components/UI/BookingTableRow';
import { reservations } from "../../../../../components/Feature";

const Reservations: React.FC = () => {
    // Function to get day of week from date
    const getDayOfWeek = (dateString: string): string => {
        const date = new Date(dateString);
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
        return days[date.getDay()];
    };

    // Function to format reservation data for BookingTableRow
    const formatReservationForBookingRow = (reservation: any) => {
        // Default values for organizer and dateBooked if not available
        const organizer = reservation.organizer || reservation.name || '';
        const dateBooked = reservation.dateBooked || 'Not specified';
        
        // Format recurring booking information
        const recurringBooking = reservation.recurrence ? 'recurring' : 'non-recurring';
        
        // Combine room and location info for notes if available
        const notes = reservation.note || 
            (reservation.room && reservation.location ? 
                `Room: ${reservation.room}, Location: ${reservation.location}` : 
                'None');
        
        return {
            name: reservation.name || '',
            day: getDayOfWeek(reservation.date),
            time: reservation.time || '',
            organizer,
            dateBooked,
            recurringBooking,
            notes
        };
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1">
                <div className="p-6">
                    <AdminHeading label="RESERVATIONS" />
                    <div className="mt-4">
                        {reservations.map(reservation => {
                            const bookingData = formatReservationForBookingRow(reservation);
                            return (
                                <BookingTableRow
                                    key={reservation.id}
                                    name={bookingData.name}
                                    day={bookingData.day}
                                    time={bookingData.time}
                                    organizer={bookingData.organizer}
                                    dateBooked={bookingData.dateBooked}
                                    recurringBooking={bookingData.recurringBooking}
                                    notes={bookingData.notes}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservations;