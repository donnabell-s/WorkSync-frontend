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
    action: 'Admin added room',
    room: 'Training Room | TR-110',
    location: 'Southwing, Level 15',
    capacity: 12,
    status: 'AVAILABLE',
    date: '03/04/25\n01:00PM - 05:30PM',
    statusColor: 'text-green-500',
    dateColor: 'text-green-500',
  },
  {
    action: 'Room booked by user',
    room: 'Executive Boardroom | CR-102A',
    location: 'North Tower, Level 12',
    capacity: 10,
    status: 'BOOKED',
    date: '03/01/25\n01:00PM - 05:30PM',
    statusColor: 'text-yellow-500',
    dateColor: 'text-red-500',
  },
];

const bookingLogs = [
  {
    action: 'Booking completed',
    bookingId: '2021201',
    user: 'John',
    roomNumber: 'TR-110',
    location: 'Southwing, Level 15',
    bookingDate: '03/04/25\n01:00PM - 05:30PM',
    status: 'COMPLETED',
    statusColor: 'text-green-500',
    dateColor: 'text-green-500',
  },
  {
    action: 'User canceled booking',
    bookingId: '0390241',
    user: 'Mark',
    roomNumber: 'CR-102A',
    location: 'North Tower, Level 12',
    bookingDate: '03/01/25\n01:00PM - 05:30PM',
    status: 'CANCELED',
    statusColor: 'text-red-500',
    dateColor: 'text-red-500',
  },
];

const AuditLogs: React.FC<AuditLogsProps> = ({ mode }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('This Month');


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
            {mode === 'rooms'
              ? roomLogs.map((log, idx) => (
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
              : bookingLogs.map((log, idx) => (
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
                ))}
          
            {[...Array(3 - (mode === 'rooms' ? roomLogs.length : bookingLogs.length))].map((_, idx) => (
              <tr key={`empty-${idx}`}>
                {(mode === 'rooms' ? ROOM_LOGS_COLUMNS : BOOKING_LOGS_COLUMNS).map((_, cidx) => (
                  <td key={cidx} className="py-3 px-4">&nbsp;</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-2 text-sm text-gray-600 gap-4">
        <span>Items per page:</span>
        <span className="font-semibold text-blue-700">5</span>
        <span className="mx-2">•</span>
        <span>1-3 of 3</span>
        <button
          className="mx-1 text-gray-400 hover:text-gray-700"
          aria-label="Previous page"
          title="Previous page"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="mx-1 text-gray-400 hover:text-gray-700"
          aria-label="Next page"
          title="Next page"
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
