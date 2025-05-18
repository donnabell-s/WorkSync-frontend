import React from 'react';

interface BookingTableRowProps {
    name: string;
    day: string;
    time: string;
    organizer: string;
    dateBooked: string;
    recurringBooking: string | boolean;
    notes?: string;
}

const BookingTableRow: React.FC<BookingTableRowProps> = ({
    name,
    day,
    time,
    organizer,
    dateBooked,
    recurringBooking,
    notes = 'None',
}) => {
    // Format recurring display
    const recurringDisplay = typeof recurringBooking === 'boolean' 
        ? (recurringBooking ? 'Yes' : 'No') 
        : recurringBooking;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            {/* First Line */}
            <div className="flex justify-between items-baseline mb-2">
                <div className="flex items-baseline space-x-4">
                    <div className="font-bold">{name}</div>
                    <div className="text-sm uppercase text-gray-500">{day}</div>
                </div>
                <div className="flex space-x-8">
                    <div>
                        <div className="font-semibold">Organizer: </div>
                        <div>{organizer}</div>
                    </div>
                    <div>
                        <div className="font-semibold">Recurring Booking: </div>
                        <span>{recurringDisplay}</span>
                    </div>
                </div>
            </div>

            {/* Second Line */}
            <div className="flex justify-between items-baseline">
                <div className="flex items-center space-x-2 text-gray-600">
                    <div>©</div>
                    <div>{time}</div>
                </div>
                <div className="flex space-x-8">
                    <div>
                        <div className="font-semibold">Date Booked: </div>
                        <div>{dateBooked}</div>
                    </div>
                    <div>
                        <div className="font-semibold">Notes: </div>
                        <div>{notes}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingTableRow;