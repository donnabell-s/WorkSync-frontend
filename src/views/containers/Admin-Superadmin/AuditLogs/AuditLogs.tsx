import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

interface AuditLogsProps {
  mode: 'rooms' | 'bookings';
}

const ROOM_LOGS_COLUMNS = [
  'Action',
  'Room Name & Number',
  'Location',
  'Capacity',
  'Status',
  'Date',
];

const BOOKING_LOGS_COLUMNS = [
  'Action',
  'Booking ID',
  'User',
  'Room Number',
  'Location',
  'Booking Date',
  'Status',
];

// Dummy data for demonstration
const roomLogs = [
  {
    action: 'Room created',
    room: 'Training Room | TR-110',
    location: 'Southwing, Level 15',
    capacity: 12,
    status: 'AVAILABLE',
    date: '05/10/25\n09:00AM - 10:00AM',
    statusColor: 'text-green-500',
    dateColor: 'text-green-500',
  },
  {
    action: 'Room reserved by user',
    room: 'Executive Boardroom | CR-102A',
    location: 'North Tower, Level 12',
    capacity: 10,
    status: 'RESERVED',
    date: '04/15/25\n01:00PM - 05:30PM',
    statusColor: 'text-blue-500',
    dateColor: 'text-blue-500',
  },
  {
    action: 'Room under maintenance',
    room: 'Meeting Room | MR-201',
    location: 'East Wing, Level 2',
    capacity: 8,
    status: 'UNDER MAINTENANCE',
    date: '03/20/25\n09:00AM - 10:00AM',
    statusColor: 'text-red-500',
    dateColor: 'text-red-500',
  },
  {
    action: 'Room occupied',
    room: 'Conference Room | CR-210',
    location: 'West Wing, Level 3',
    capacity: 20,
    status: 'OCCUPIED',
    date: '05/14/25\n02:00PM - 04:00PM',
    statusColor: 'text-orange-500',
    dateColor: 'text-orange-500',
  },
  {
    action: 'Room reserved by admin',
    room: 'Board Room | BR-101',
    location: 'Main Tower, Level 1',
    capacity: 15,
    status: 'RESERVED',
    date: '04/28/25\n11:00AM - 12:00PM',
    statusColor: 'text-blue-500',
    dateColor: 'text-blue-500',
  },
  {
    action: 'Room available after cleaning',
    room: 'Training Room | TR-111',
    location: 'Southwing, Level 16',
    capacity: 14,
    status: 'AVAILABLE',
    date: '05/16/25\n10:00AM - 12:00PM',
    statusColor: 'text-green-500',
    dateColor: 'text-green-500',
  },
];

const bookingLogs = [
  {
    action: 'Booking completed',
    bookingId: '2021201',
    user: 'John',
    roomNumber: 'TR-110',
    location: 'Southwing, Level 15',
    bookingDate: '05/09/25\n01:00PM - 05:30PM',
    status: 'COMPLETED',
    statusColor: 'text-orange-500',
    dateColor: 'text-orange-500',
  },
  {
    action: 'Booking cancelled by user',
    bookingId: '0390241',
    user: 'Mark',
    roomNumber: 'CR-102A',
    location: 'North Tower, Level 12',
    bookingDate: '04/18/25\n01:00PM - 05:30PM',
    status: 'CANCELLED',
    statusColor: 'text-red-500',
    dateColor: 'text-red-500',
  },
  {
    action: 'Booking available for new user',
    bookingId: '2021202',
    user: 'Alice',
    roomNumber: 'MR-201',
    location: 'East Wing, Level 2',
    bookingDate: '03/22/25\n09:00AM - 10:00AM',
    status: 'AVAILABLE',
    statusColor: 'text-green-500',
    dateColor: 'text-green-500',
  },
  {
    action: 'Booking completed',
    bookingId: '2021203',
    user: 'Bob',
    roomNumber: 'CR-210',
    location: 'West Wing, Level 3',
    bookingDate: '05/15/25\n02:00PM - 04:00PM',
    status: 'COMPLETED',
    statusColor: 'text-orange-500',
    dateColor: 'text-orange-500',
  },
  {
    action: 'Booking cancelled by admin',
    bookingId: '2021204',
    user: 'Jane',
    roomNumber: 'BR-101',
    location: 'Main Tower, Level 1',
    bookingDate: '04/29/25\n11:00AM - 12:00PM',
    status: 'CANCELLED',
    statusColor: 'text-red-500',
    dateColor: 'text-red-500',
  },
  {
    action: 'Booking available after release',
    bookingId: '2021205',
    user: 'Mike',
    roomNumber: 'TR-111',
    location: 'Southwing, Level 16',
    bookingDate: '05/16/25\n10:00AM - 12:00PM',
    status: 'AVAILABLE',
    statusColor: 'text-green-500',
    dateColor: 'text-green-500',
  },
];

const ITEMS_PER_PAGE = 5;

function getMonthYear(dateStr: string) {
  const [date] = dateStr.split('\n');
  const [month, , year] = date.split('/');
  return { month, year };
}

const AuditLogs: React.FC<AuditLogsProps> = ({ mode }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('This Month');
  const [page, setPage] = useState(1);

  const today = new Date();
  const thisMonth = String(today.getMonth() + 1).padStart(2, '0');
  const thisYear = String(today.getFullYear()).slice(-2);
  const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonth = String(lastMonthDate.getMonth() + 1).padStart(2, '0');
  const lastMonthYear = String(lastMonthDate.getFullYear()).slice(-2);

  const data = mode === 'rooms' ? roomLogs : bookingLogs;

  const filteredData = data.filter(item => {
    let dateStr = mode === 'rooms' ? item.date : item.bookingDate;
    const { month, year } = getMonthYear(dateStr);

    let dateMatch = true;
    if (filter === 'This Month') {
      dateMatch = month === thisMonth && year === thisYear;
    } else if (filter === 'Last Month') {
      dateMatch = month === lastMonth && year === lastMonthYear;
    } else if (filter === 'This Year') {
      dateMatch = year === thisYear;
    }

    // Search filtering
    let searchMatch = true;
    if (search.trim()) {
      const s = search.toLowerCase();
      searchMatch = Object.values(item).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(s)
      );
    }

    return dateMatch && searchMatch;
  });

  // Pagination
  const total = filteredData.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const pagedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const startIdx = total === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const endIdx = Math.min(page * ITEMS_PER_PAGE, total);

  React.useEffect(() => {
    setPage(1);
  }, [search, filter, mode]);

  return (
    <div className="w-full h-full p-6">
      <div className="flex items-center mb-6">
        <span className="text-2xl font-bold mr-2">
          <span className="inline-block align-middle">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block mr-2 text-[#222]">
              <rect width="24" height="24" rx="4" fill="#222" fillOpacity="0.08"/>
              <path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" fill="#222"/>
            </svg>
          </span>
          {mode === 'rooms' ? 'ROOM LOGS' : 'BOOKING LOGS'}
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-400 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
        <div className="flex items-center gap-2 min-w-[260px]">
          <label htmlFor="audit-logs-filter" className="font-semibold text-gray-800 mb-0">
            Filter by:
          </label>
          <select
            id="audit-logs-filter"
            className="border border-gray-400 rounded-md py-2 px-4 bg-white text-gray-800 text-sm focus:outline-none"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              {(mode === 'rooms' ? ROOM_LOGS_COLUMNS : BOOKING_LOGS_COLUMNS).map(col => (
                <th key={col} className="py-3 px-4 font-semibold text-gray-700">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td colSpan={mode === 'rooms' ? ROOM_LOGS_COLUMNS.length : BOOKING_LOGS_COLUMNS.length} className="py-6 text-center text-gray-400">
                  No logs found.
                </td>
              </tr>
            ) : mode === 'rooms' ? (
              pagedData.map((log, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-3 px-4">{log.action}</td>
                  <td className="py-3 px-4">{log.room}</td>
                  <td className="py-3 px-4">{log.location}</td>
                  <td className="py-3 px-4">{log.capacity}</td>
                  <td className={`py-3 px-4 font-semibold ${log.statusColor}`}>{log.status}</td>
                  <td className="py-3 px-4">
                    <span className={`${log.dateColor} block whitespace-pre-line font-medium`}>
                      {log.date}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              pagedData.map((log, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-3 px-4">{log.action}</td>
                  <td className="py-3 px-4">{log.bookingId}</td>
                  <td className="py-3 px-4">{log.user}</td>
                  <td className="py-3 px-4">{log.roomNumber}</td>
                  <td className="py-3 px-4">{log.location}</td>
                  <td className="py-3 px-4">
                    <span className={`${log.dateColor} block whitespace-pre-line font-medium`}>
                      {log.bookingDate}
                    </span>
                  </td>
                  <td className={`py-3 px-4 font-semibold ${log.statusColor}`}>{log.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-2 text-sm text-gray-600 gap-4">
        <span>Items per page:</span>
        <span className="font-semibold text-blue-700">{ITEMS_PER_PAGE}</span>
        <span className="mx-2">•</span>
        <span>{startIdx}-{endIdx} of {total}</span>
        <button
          className={`mx-1 ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-700'}`}
          aria-label="Previous page"
          title="Previous page"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className={`mx-1 ${page === totalPages || total === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-700'}`}
          aria-label="Next page"
          title="Next page"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || total === 0}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AuditLogs;
