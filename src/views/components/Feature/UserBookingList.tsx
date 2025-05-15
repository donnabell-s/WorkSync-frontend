import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Booking, sampleBookingList } from './UserBookingListInterface';
import { useNavigate } from 'react-router';

interface Props {
  dateOrder: 'asc' | 'desc' | 'all';
  statusFilter: 'Completed' | 'Upcoming' | 'Cancelled' | 'See All';
  searchQuery: string;
}

const getStatusColor = (status: Booking['status']) => {
  switch (status.toLowerCase()) {
    case 'upcoming': return 'text-[#10B981]';
    case 'completed': return 'text-[#F59E0B]';
    case 'cancelled': return 'text-[#EF4444]';
    default: return 'text-gray-800';
  }
};

const getTdClasses = () => 'py-4 px-4 border-b-[1px] border-b-[#D2D4D8]';
const getThClasses = () => 'py-5 px-4 border-b-[1px] border-b-[#D2D4D8] text-base';

const UserBookingList: React.FC<Props> = ({ dateOrder, statusFilter, searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  // Filter by search query (search by id, name, room, location)
  let filtered = [...sampleBookingList];
  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    filtered = filtered.filter(booking => 
      booking.id.toLowerCase().includes(lowerCaseSearchQuery) ||
      booking.name.toLowerCase().includes(lowerCaseSearchQuery) ||
      booking.room.toLowerCase().includes(lowerCaseSearchQuery) ||
      booking.location.toLowerCase().includes(lowerCaseSearchQuery)
    );
  }

  // Filter by status
  if (statusFilter !== 'See All') {
    filtered = filtered.filter(b => b.status === statusFilter);
  }

  // Sort by date
  if (dateOrder !== 'all') {
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const visibleBookings = filtered.slice(startIndex, endIndex);

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
              <th className={getThClasses()}>Name</th>
              <th className={getThClasses()}>Room</th>
              <th className={getThClasses()}>Location</th>
              <th className={getThClasses()}>Date</th>
              <th className={getThClasses()}>Time</th>
              <th className={getThClasses()}>Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleBookings.map((booking) => (
              // <tr key={booking.id} className="text-sm hover:bg-gray-50">
              <tr
                key={booking.id}
                className={`text-sm ${booking.status === "Upcoming" ? "hover:bg-gray-100 cursor-pointer" : ""}`}
                onClick={() => {
                  if (booking.status === "Upcoming") {
                    navigate(`/user/edit-booking`);
                  }
                }}
              >

                <td className={getTdClasses()}>{booking.id}</td>
                <td className={getTdClasses()}>{booking.name}</td>
                <td className={getTdClasses()}>{booking.room}</td>
                <td className={getTdClasses()}>{booking.location}</td>
                <td className={getTdClasses()}>{booking.date}</td>
                <td className={getTdClasses()}>{booking.time}</td>
                <td className={`py-3 px-4 border-b border-b-[#D2D4D8] font-semibold uppercase ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} className="py-5 px-4 border-t">
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
