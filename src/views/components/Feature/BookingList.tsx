/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Booking as LegacyBooking } from './UserBookingListInterface';
import type { Booking as ApiBooking, Room } from '../../../types';
import { LuClock } from 'react-icons/lu';
import { useRooms } from '../../../context/RoomContext';

interface BookingListProps {
  bookings: Array<ApiBooking | LegacyBooking>;
}

const statusColors: Record<string, string> = {
  Upcoming: 'text-[#10B981]',
  Completed: 'text-[#F59E0B]',
  Cancelled: 'text-[#EF4444]',
  Approved: 'text-[#10B981]',
  Pending: 'text-[#F59E0B]',
  Declined: 'text-[#EF4444]',
};

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const navigate = useNavigate();
  const { rooms } = useRooms();

  type BookingItem = ApiBooking | LegacyBooking;

  const handleViewDetails = (booking: BookingItem) => {
    navigate('/admin/bookings/booking-detail', { state: { booking } });
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {bookings.map((booking) => {
        // Normalize fields between legacy booking and API booking
        const isLegacy = (b: BookingItem): b is LegacyBooking => (b as any).date !== undefined || (b as any).name !== undefined;

        const title = isLegacy(booking) ? booking.name : (booking as ApiBooking).title;

        // Derive date parts
        let day = '01';
        let month = 'Jan';
        let year = '1970';
        if (isLegacy(booking) && booking.date) {
          const parts = booking.date.split('-');
          if (parts.length === 3) {
            [day, month, year] = parts;
          }
        } else if (!isLegacy(booking)) {
          const start = new Date((booking as ApiBooking).startDatetime);
          const opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
          const formatted = start.toLocaleDateString(undefined, opts); // e.g., "24 May 2025"
          const [d, m, y] = formatted.replace(',', '').split(' ');
          day = d ?? day;
          month = m ?? month;
          year = y ?? year;
        }

        // Time window
        const time = isLegacy(booking)
          ? booking.time
          : (() => {
              const start = new Date((booking as ApiBooking).startDatetime);
              const end = new Date((booking as ApiBooking).endDatetime);
              const fmt: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
              return `${start.toLocaleTimeString(undefined, fmt)}-${end.toLocaleTimeString(undefined, fmt)}`;
            })();

        // Room and location (prefer embedded room, else lookup by roomId from context)
        let roomLabel = '';
        let location = '';
        let computedRoom: Room | undefined = undefined;
        if (isLegacy(booking)) {
          roomLabel = booking.room;
          location = booking.location;
        } else {
          const api = booking as ApiBooking;
          computedRoom = api.room ?? rooms.find(r => String(r.roomId) === String(api.roomId));
          roomLabel = computedRoom?.name || computedRoom?.code || '';
          location = computedRoom?.location || '';
        }

        const status: string = (booking as any).status ?? 'Pending';
        const statusClass = statusColors[status] ?? 'text-gray-500';

        const key = String((booking as any).bookingId ?? (booking as any).id ?? `${title}-${(booking as any).startDatetime ?? ''}`);

        return (
          <div
            key={key}
            className="bg-white rounded-lg shadow-sm p-3 pl-4 pr-1.5 border border-gray-200 flex flex-col gap-y-3 md:flex-row md:items-center md:justify-between"
          >

            <div className="flex flex-col items-start w-full md:w-20">
              <span className="text-sm font-bold text-[#1F2937] whitespace-nowrap">
                {day} {month}
              </span>
              <span className="text-sm text-[#575F69]">{year}</span>
            </div>

            {/* Room image: prefer booking.room.imageUrl or context room.imageUrl; fallback by sizeLabel */}
            <div className="w-full h-28 rounded-lg flex-shrink-0 md:w-50 md:h-16 overflow-hidden">
              <img
                src={(() => {
                  const api = booking as ApiBooking;
                  const room = !isLegacy(booking)
                    ? (api.room ?? rooms.find(r => String(r.roomId) === String(api.roomId)))
                    : undefined;
                  const img = room?.imageUrl?.trim();
                  if (img) return img;
                  const size = (room?.sizeLabel || '').toLowerCase();
                  if (size === 'small') return '/meetingroom/small.jpg';
                  if (size === 'medium') return '/meetingroom/medium.jpg';
                  if (size === 'large') return '/meetingroom/large.jpg';
                  return '/meetingroom/default.jpg';
                })()}
                alt={roomLabel}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col w-full md:w-48 min-w-0 text-sm gap-1 text-[#1F2937]">
              <h3 className="font-semibold truncate">{title}</h3>
              <div className="flex items-center text-[#AAAEB3] gap-1">
                <LuClock className="text-md" />
                <span className="truncate">{time}</span>
              </div>
            </div>

            <div className="flex flex-col w-full md:w-48 min-w-0 text-sm gap-1 text-[#81868E]">
              <span className="font-medium truncate">{roomLabel}</span>
              <div className="flex items-center text-sm gap-1">
                <span className="truncate">{location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-9 w-full md:w-52 text-sm text-[#1F2937]">
              <span className="font-medium text-gray-500 whitespace-nowrap">Organizer</span>
              <span className="truncate">John Doe</span>

              <span className="font-medium text-gray-500 whitespace-nowrap">Date Requested</span>
              <span className="truncate">
                {(!isLegacy(booking) && (booking as ApiBooking).createdAt)
                  ? new Date((booking as ApiBooking).createdAt).toLocaleDateString()
                  : '—'}
              </span>
            </div>

            <div className="flex flex-col items-end w-full md:w-28">
              <span
                className={`text-sm font-semibold uppercase ${statusClass} mb-2 transform -translate-y-3`}
              >
                {status}
              </span>
              <button
                className="text-sm text-white bg-[#10B981] px-3 py-1 rounded-md hover:bg-[#1BAC7C] font-medium  transform translate-y-2.5 cursor-pointer"
                onClick={() => handleViewDetails(booking)}
              >
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
