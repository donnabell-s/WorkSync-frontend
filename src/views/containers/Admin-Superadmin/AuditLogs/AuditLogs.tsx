import React, { useState, useMemo, useEffect } from 'react';
import { useLogs } from '../../../../context/LogContext';
import { format } from 'date-fns';
import { DataTable, DataTableColumn } from '../../../components/UI';
import { FaSearch } from 'react-icons/fa';

interface AuditLogsProps {
  mode: 'rooms' | 'bookings';
}

type LogRow = {
  action: string;
  room: string;
  location: string;
  capacity: string | number;
  status: string;
  date: string;
  statusColor: string;
};

const LOGS_COLUMNS: DataTableColumn<LogRow>[] = [
  { key: 'action', header: 'ACTION' },
  { key: 'room', header: 'ROOM NAME & NUMBER' },
  { key: 'location', header: 'LOCATION' },
  { key: 'capacity', header: 'CAPACITY', align: 'right' },
  {
    key: 'status',
    header: 'STATUS',
    render: (row) => (
      <span className={`font-semibold ${row.statusColor}`}>{row.status}</span>
    ),
  },
  { key: 'date', header: 'DATE' },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'available':
    case 'approved':
    case 'completed':
      return 'text-green-500';
    case 'pending':
    case 'booked':
      return 'text-yellow-500';
    case 'under maintenance':
    case 'unavailable':
    case 'cancelled':
    case 'declined':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const AuditLogs: React.FC<AuditLogsProps> = ({ mode }) => {
  const { roomLogs, bookingLogs, fetchRoomLogs, fetchBookingLogs, loading, error } = useLogs();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFetched, setDataFetched] = useState(false);
  const pageSize = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mode === 'rooms') {
          await fetchRoomLogs();
        } else {
          await fetchBookingLogs();
        }
        setDataFetched(true);
      } catch (err) {
        // Error is handled by context
      }
    };

    fetchData();
  }, [mode, fetchRoomLogs, fetchBookingLogs]);

  const filteredLogs = useMemo<LogRow[]>(() => {
    const logs = mode === 'rooms' ? roomLogs : bookingLogs;

    if (!Array.isArray(logs) || logs.length === 0) {
      return [];
    }

    const mapped = logs.map((log) => ({
      action: log.action || 'N/A',
      room: `${log.roomName || 'N/A'} | ${log.roomCode || 'N/A'}`,
      location: log.location || 'N/A',
      capacity: log.capacity ?? '-',
      status: log.status || 'N/A',
      date: log.timestamp ? format(new Date(log.timestamp), 'MM/dd/yy\nhh:mmaaa') : 'N/A',
      statusColor: getStatusColor(log.status || ''),
    }));

    const filtered = mapped.filter((log) => 
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.room.toLowerCase().includes(search.toLowerCase()) ||
      log.location.toLowerCase().includes(search.toLowerCase())
    );

    return filtered;
  }, [mode, roomLogs, bookingLogs, search]);

  if (loading && !dataFetched) {
    return <div className="px-7 pt-6 pb-8">Loading logs...</div>;
  }

  if (error) {
    return <div className="px-7 pt-6 pb-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="px-7 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {mode === 'bookings' ? 'BOOKING LOGS' : 'ROOM LOGS'}
        </h2>
        <div className="relative w-[18rem] md:w-[24rem] lg:w-[28rem]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search actions..."
            className="w-full pr-9 pl-3 p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      {filteredLogs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No records found
        </div>
      ) : (
        <DataTable
          columns={LOGS_COLUMNS}
          rows={filteredLogs}
          className="text-base whitespace-pre-line"
          itemsPerPage={pageSize}
          page={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AuditLogs;