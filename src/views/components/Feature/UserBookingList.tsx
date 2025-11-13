import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import { useBookings } from '../../../context/BookingContext';
import { useRooms } from '../../../context/RoomContext';

interface Props {
  dateOrder: 'asc' | 'desc' | 'all';
  statusFilter: 'Completed' | 'Upcoming' | 'Cancelled' | 'See All';
  searchQuery: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'upcoming': return 'text-[#10B981]';
    case 'confirmed': return 'text-[#10B981]';
    case 'completed': return 'text-[#F59E0B]';
    case 'cancelled': return 'text-[#EF4444]';
    default: return 'text-gray-800';
  }
};

const getTdClasses = () => 'py-4 px-4';
const getThClasses = () => 'py-5 px-4 border-b-[1px] border-b-[#D2D4D8] text-base';

const formatDate = (dateString: string | Date) => {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
};

const formatTime = (dateString: string | Date) => {
  const d = new Date(dateString);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const UserBookingList: React.FC<Props> = ({ dateOrder, statusFilter, searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();
  const { bookings, fetchBookings } = useBookings();
  const { rooms, getRoomById } = useRooms();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  let filtered = [...bookings];
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(b => b.title.toLowerCase().includes(q));
  }
  if (statusFilter !== 'See All') {
    filtered = filtered.filter(b => b.status === statusFilter);
  }
  if (dateOrder !== 'all') {
    filtered.sort((a, b) => {
      const dateA = new Date((a as any).startDatetime ?? (a as any).startDateTime);
      const dateB = new Date((b as any).startDatetime ?? (b as any).startDateTime);
      return dateOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const visibleBookings = filtered.slice(startIndex, endIndex);

  // Trigger loading rooms for visible bookings
  useEffect(() => {
    visibleBookings.forEach((b: any) => {
      const hasRoom = rooms.find(r => String((r as any).roomId) === String(b.roomId));
      if (!hasRoom) {
        getRoomById(String(b.roomId));
      }
    });
  }, [visibleBookings, rooms, getRoomById]);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePrevious = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div>
      <div className="overflow-x-auto shadow-[0_0_4px_rgba(0,0,0,0.1)] rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-[#1F2937]">
          <thead>
            <tr className="text-left text-sm">
              <th className={getThClasses()}>ID</th>
              <th className={getThClasses()}>Meeting Name</th>
              <th className={getThClasses()}>Room</th>
              <th className={getThClasses()}>Location</th>
              <th className={getThClasses()}>Date</th>
              <th className={getThClasses()}>Time</th>
              <th className={getThClasses()}>Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleBookings.map((booking: any) => {
              const room = rooms.find(r => String((r as any).roomId) === String(booking.roomId));
              return (
                <tr
                  key={booking.bookingId ?? booking.id}
                  className={`text-sm odd:bg-white even:bg-gray-100 hover:bg-gray-100 cursor-pointer`}
                  onClick={() => {
                    localStorage.setItem("selectedBookingId", String(booking.bookingId ?? booking.id));
                    navigate(`/user/view-booking`);
                  }}
                >
                  <td className={getTdClasses()}>{booking.bookingId ?? booking.id}</td>
                  <td className={getTdClasses()}>{booking.title}</td>
                  <td className={getTdClasses()}>{room ? room.name : 'Loading...'}</td>
                  <td className={getTdClasses()}>{room ? room.location : 'Loading...'}</td>
                  <td className={getTdClasses()}>{formatDate(booking.startDatetime ?? booking.startDateTime)}</td>
                  <td className={getTdClasses()}>{formatTime(booking.startDatetime ?? booking.startDateTime)} - {formatTime(booking.endDatetime ?? booking.endDateTime)}</td>
                  <td className={`py-3 px-4 font-semibold uppercase ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} className="py-5 px-4 border-t-[1px] border-t-[#D2D4D8]">
                <div className="flex items-center justify-end text-sm gap-8">
                  <div className="flex items-center space-x-2">
                    <label htmlFor="itemsPerPage">Items per page:</label>
                    <select
                      id="itemsPerPage"
                      className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                    </select>
                  </div>
                  <div>{startIndex + 1} - {endIndex} of {totalItems}</div>
                  <div className="space-x-2">
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                      className="p-1 hover:text-emerald-600 disabled:opacity-50"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className="p-1 hover:text-emerald-600 disabled:opacity-50"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default UserBookingList;
