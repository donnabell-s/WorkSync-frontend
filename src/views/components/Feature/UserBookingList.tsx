import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface Props {
  dateOrder: 'asc' | 'desc' | 'all';
  statusFilter: 'Completed' | 'Upcoming' | 'Cancelled' | 'See All';
}

interface Booking {
  id: string;
  name: string;
  room: string;
  location: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

const sampleBookingList: Booking[] = [
  {
    id: 'MTG12',
    name: 'Investor Town Hall',
    room: 'Upcoming Booking GH-200 (Grand Auditorium)',
    location: 'Main Lobby, Level 1',
    date: '28-April-2024',
    time: '16:00-18:30',
    status: 'Completed',
  },
  {
    id: 'MTG13',
    name: 'Product Strategy Meeting',
    room: 'Conf Room A-101',
    location: 'Tower B, 3rd Floor',
    date: '05-May-2025',
    time: '10:00-12:00',
    status: 'Upcoming',
  },
  {
    id: 'MTG14',
    name: 'Quarterly Sales Review',
    room: 'Meeting Room C-202',
    location: 'Block C, Level 2',
    date: '30-April-2025',
    time: '14:00-16:00',
    status: 'Completed',
  },
  {
    id: 'MTG15',
    name: 'Tech Onboarding Session',
    room: 'Training Room T-001',
    location: 'Innovation Wing, Ground Floor',
    date: '01-May-2025',
    time: '09:00-11:00',
    status: 'Cancelled',
  },
  {
    id: 'MTG16',
    name: 'All Hands Meeting',
    room: 'Auditorium A',
    location: 'Main Building, Level 1',
    date: '06-May-2025',
    time: '15:00-16:30',
    status: 'Upcoming',
  },
  {
    id: 'MTG17',
    name: 'Client Feedback Workshop',
    room: 'Meeting Room D-303',
    location: 'Customer Experience Center',
    date: '03-May-2025',
    time: '13:00-15:00',
    status: 'Completed',
  },
  {
    id: 'MTG18',
    name: 'HR Policy Update Briefing',
    room: 'Conference Room B-202',
    location: 'Admin Block, 2nd Floor',
    date: '04-May-2025',
    time: '11:00-12:30',
    status: 'Cancelled',
  },
];


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

const UserBookingList: React.FC<Props> = ({ dateOrder, statusFilter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter by status
  let filtered = [...sampleBookingList];
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
      <div className="overflow-x-auto shadow-[0_0_9px_rgba(0,0,0,0.1)]">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm text-[#1F2937]">
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
              <tr key={booking.id} className="text-sm hover:bg-gray-50">
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
