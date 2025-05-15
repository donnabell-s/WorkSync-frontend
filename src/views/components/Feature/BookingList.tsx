import React from 'react';
import { Booking } from './UserBookingListInterface';
import { LuClock } from 'react-icons/lu';

interface BookingListProps {
  bookings: Booking[];
}

const statusColors: Record<Booking['status'], string> = {
  Upcoming: 'text-[#10B981]',
  Completed: 'text-[#F59E0B]',
  Cancelled: 'text-[#EF4444]',
  Approved: 'text-[#10B981]',
  Pending: 'text-[#F59E0B]',
  Declined: 'text-[#EF4444]',
};

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const [day, month, year] = booking.date.split('-');

        return (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-sm p-3 pl-4 pr-1.5 border border-gray-200 flex flex-col gap-y-3 md:flex-row md:items-center md:justify-between"
          >

            <div className="flex flex-col items-start w-full md:w-20">
              <span className="text-sm font-bold text-[#1F2937] whitespace-nowrap">
                {day} {month}
              </span>
              <span className="text-sm text-[#575F69]">{year}</span>
            </div>

            <div className="w-full h-28 bg-gray-200 rounded-lg flex-shrink-0 md:w-50 md:h-16" />

            <div className="flex flex-col w-full md:w-48 min-w-0 text-sm gap-1 text-[#1F2937]">
              <h3 className="font-semibold truncate">{booking.name}</h3>
              <div className="flex items-center text-[#AAAEB3] gap-1">
                <LuClock className="text-md" />
                <span className="truncate">{booking.time}</span>
              </div>
            </div>

            <div className="flex flex-col w-full md:w-48 min-w-0 text-sm gap-1 text-[#81868E]">
              <span className="font-medium truncate">{booking.room}</span>
              <div className="flex items-center text-sm gap-1">
                <span className="truncate">{booking.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-9 w-full md:w-52 text-sm text-[#1F2937]">
            <span className="font-medium text-gray-500 whitespace-nowrap">Organizer</span>
            <span className="truncate">John Doe</span>

            <span className="font-medium text-gray-500 whitespace-nowrap">Date Requested</span>
            <span className="truncate">May 10, 2023</span>
            </div>

            <div className="flex flex-col items-end w-full md:w-28">
              <span
                className={`text-sm font-semibold uppercase ${statusColors[booking.status]} mb-2 transform -translate-y-3`}
              >
                {booking.status}
              </span>
              <button className="text-sm text-white bg-[#10B981] px-3 py-1 rounded-md hover:bg-[#1BAC7C] font-medium  transform translate-y-2.5">
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingList;
