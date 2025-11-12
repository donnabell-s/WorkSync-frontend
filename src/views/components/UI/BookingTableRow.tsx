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
    const recurringDisplay = typeof recurringBooking === 'boolean' 
        ? (recurringBooking ? 'Yes' : 'No') 
        : recurringBooking;

    return (
<div className="bg-white p-4 rounded-lg w-full">
  <div className="text-xl font-bold mb-3">MAY 9</div>

  <div className="grid grid-cols-4 gap-x-4 gap-y-2 w-full">
    <div className="text-gray-500">THUR</div>
    <div className="font-semibold">Leadership Training 1</div>
    <div>Organizer: <span className="font-medium">John Doe</span></div>
    <div>Recurring Booking: <span className="font-medium">No</span></div>

    <div></div> 
    <div>10:20 PM - 1:30 PM</div>
    <div>
      Date Booked: <span className="font-medium">May 6, 2022 | 3:26 PM</span>
    </div>
    <div>Notes: <span className="font-medium">None</span></div>
  </div>
</div>
    );
};

export default BookingTableRow;