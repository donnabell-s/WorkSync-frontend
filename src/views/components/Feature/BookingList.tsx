/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Booking as LegacyBooking } from './UserBookingListInterface';
import type { Booking as ApiBooking, Room } from '../../../types';
import { LuClock } from 'react-icons/lu';
import { useRooms } from '../../../context/RoomContext';
import { useAuth } from '../../../context/AuthContext';

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
  const { users, getAllUsers } = useAuth();

  type BookingItem = ApiBooking | LegacyBooking;
  const isLegacyBooking = (b: BookingItem): b is LegacyBooking => (b as any).date !== undefined || (b as any).name !== undefined;

  const handleViewDetails = (booking: BookingItem) => {
    navigate('/admin/bookings/booking-detail', { state: { booking } });
  };

  React.useEffect(() => {
    if (!users || users.length === 0) {
      void getAllUsers().catch(() => {});
    }
  }, [users, getAllUsers]);

  const getCreatedAtTime = React.useCallback((booking: BookingItem): number => {
    const toTime = (value: string | undefined): number => {
      if (!value) return 0;
      const t = new Date(value).getTime();
      return Number.isNaN(t) ? 0 : t;
    };
    if (isLegacyBooking(booking)) {
      return toTime(booking.dateBooked ?? booking.date);
    }
    const api = booking as ApiBooking;
    return toTime(api.createdAt ?? api.startDatetime);
  }, []);

  const sortedBookings = React.useMemo(() => {
    const indexed = bookings.map((booking, idx) => ({ booking, idx }));
    indexed.sort((a, b) => {
      const diff = getCreatedAtTime(b.booking) - getCreatedAtTime(a.booking);
      return diff !== 0 ? diff : a.idx - b.idx;
    });
    return indexed.map(item => item.booking);
  }, [bookings, getCreatedAtTime]);

  const resolveOrganizerName = (booking: BookingItem): string => {
    if (isLegacyBooking(booking)) {
      return (booking.organizer ?? booking.user ?? '').trim() || '—';
    }
    const api = booking as ApiBooking;
    const userId = (api as any).userRefId;
    if (!userId) return '—';
    const user = users?.find(u => Number(u.id) === Number(userId));
    if (!user) return '—';
    const full = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
    return full || user.email || `User ${user.id}`;
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {sortedBookings.map((booking) => {
        // Normalize fields between legacy booking and API booking
        const legacyBooking = isLegacyBooking(booking) ? booking : null;
        const apiBooking = legacyBooking ? null : (booking as ApiBooking);

        const title = legacyBooking ? legacyBooking.name : apiBooking?.title ?? 'Untitled Booking';

        // Derive date parts
        let day = '01';
        let month = 'Jan';
        let year = '1970';
        if (legacyBooking?.date) {
          const parts = legacyBooking.date.split('-');
          if (parts.length === 3) {
            [day, month, year] = parts;
          }
        } else if (apiBooking) {
          const start = new Date(apiBooking.startDatetime);
          const opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
          const formatted = start.toLocaleDateString(undefined, opts); // e.g., "24 May 2025"
          const [d, m, y] = formatted.replace(',', '').split(' ');
          day = d ?? day;
          month = m ?? month;
          year = y ?? year;
        }

        // Time window
        const time = legacyBooking
          ? legacyBooking.time
          : (() => {
              if (!apiBooking) return '';
              const start = new Date(apiBooking.startDatetime);
              const end = new Date(apiBooking.endDatetime);
              const fmt: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
              return `${start.toLocaleTimeString(undefined, fmt)}-${end.toLocaleTimeString(undefined, fmt)}`;
            })();

        // Room and location (prefer embedded room, else lookup by roomId from context)
        let roomLabel = '';
        let location = '';
        let computedRoom: Room | undefined = undefined;
        if (legacyBooking) {
          roomLabel = legacyBooking.room;
          location = legacyBooking.location;
        } else if (apiBooking) {
          computedRoom = apiBooking.room ?? rooms.find(r => String(r.roomId) === String(apiBooking.roomId));
          roomLabel = computedRoom?.name || computedRoom?.code || '';
          const levelText = (typeof computedRoom?.level === 'string' && computedRoom.level.trim().length > 0)
            ? `Level ${computedRoom.level.trim()}`
            : undefined;
          const locParts = [computedRoom?.location, levelText].filter((part): part is string => typeof part === 'string' && part.trim().length > 0);
          location = locParts.join(', ');
        }

        const status: string = (booking as any).status ?? 'Pending';
        const statusClass = statusColors[status] ?? 'text-gray-500';

        const key = String((booking as any).bookingId ?? (booking as any).id ?? `${title ?? ''}-${(booking as any).startDatetime ?? ''}`);

        const organizerName = resolveOrganizerName(booking);

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
                  const room = apiBooking
                    ? (apiBooking.room ?? rooms.find(r => String(r.roomId) === String(apiBooking.roomId)))
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
              <span className="truncate">{organizerName}</span>

              <span className="font-medium text-gray-500 whitespace-nowrap">Date Requested</span>
              <span className="truncate">
                {(apiBooking && apiBooking.createdAt)
                  ? new Date(apiBooking.createdAt).toLocaleDateString()
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
