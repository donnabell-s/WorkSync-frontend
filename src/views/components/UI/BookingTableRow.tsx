import React from 'react';
import AdminButton from './AdminButton';
import { MdOutlineAccessTime } from "react-icons/md";

interface BookingTableRowProps {
  bookingId?: number;
  name: string;
  day: string;
  date: string; // Full date for display (e.g., "MAY 9")
  time: string;
  organizer: string;
  dateBooked: string;
  recurringBooking: string | boolean;
  notes?: string;
  status?: string;
  variant?: 'history' | 'reservations';
  onClick?: () => void;
}

const BookingTableRow: React.FC<BookingTableRowProps> = ({
  name,
  day,
  date,
  time,
  organizer,
  dateBooked,
  recurringBooking,
  notes = 'None',
  status = 'PENDING',
  variant = 'reservations',
  onClick,
}) => {
  
  const recurringDisplay = typeof recurringBooking === 'boolean'
    ? (recurringBooking ? 'Yes' : 'No')
    : recurringBooking;

  // Get status color
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'approved') return 'text-green-500';
    if (statusLower === 'pending') return 'text-amber-500';
    if (statusLower === 'declined' || statusLower === 'cancelled') return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="bg-white p-4 rounded-lg w-full">
      <div className={`grid ${variant === 'history' ? 'grid-cols-7' : 'grid-cols-8'} gap-x-4 gap-y-2 w-full`}>
        <div className='flex flex-col gap-2'>
          <p className="text-md font-semibold">{date}</p>
          <p className="text-sm text-gray-500">{day}</p>
        </div>
        <div className={`font-semibold flex flex-col gap-2 col-span-2`}>
          <p className="text-sm font-semibold">{name}</p>
          <p className="flex gap-2 text-sm text-gray-500"><MdOutlineAccessTime className='size-5'/> {time}</p>
        </div>
        <div className={`flex gap-2 col-span-2`}>
          <div className='flex flex-col gap-2'>
            <p className="text-sm font-semibold">Organizer: </p>
            <p className="text-sm font-semibold">Date Booked: </p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className="text-sm text-gray-500">{organizer}</p>
            <p className="text-sm text-gray-500">{dateBooked}</p>
          </div>
        </div>
        <div className={`grid grid-cols-2 gap-4 col-span-2`}>
          <div className=' flex flex-col gap-2'>
            <p className="text-sm font-semibold">Recurring Booking: </p>
            <p className="text-sm font-semibold">Notes: </p>
          </div>
          <div className=' flex flex-col gap-2'>
            <p className="text-sm text-gray-500">{recurringDisplay}</p>
            <p className="text-sm text-gray-500">{notes}</p>
          </div>
        </div>
        {variant === 'reservations' && (
          <div className='flex flex-col gap-2 items-end'>
            <p className={`font-bold ${getStatusColor(status)}`}>{status.toUpperCase()}</p>
            <AdminButton 
              label='View Details' 
              className='bg-blue-600 text-xs px-4 py-2' 
              onClick={onClick}
            />
          </div>
        )
        }
      </div>
    </div>
  );
};

export default BookingTableRow;