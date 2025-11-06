import React, { useState, useMemo } from 'react';
import { useLogs } from '../../../../context/LogContext';
import { useRooms } from '../../../../context/RoomContext';
import { format } from 'date-fns';
import { DataTable, DataTableColumn } from '../../../components/UI';
import { FaSearch } from 'react-icons/fa';

interface AuditLogsProps {
  mode: 'rooms' | 'bookings';
}

type RoomLogRow = {
  action: string;
  room: string;
  location: string;
  capacity: string | number;
  status: string;
  date: string;
  statusColor: string;
};

const ROOM_LOGS_COLUMNS: DataTableColumn<RoomLogRow>[] = [
  { key: 'action', header: 'Action' },
  { key: 'room', header: 'Room Name & Number' },
  { key: 'location', header: 'Location' },
  { key: 'capacity', header: 'Capacity', align: 'right' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <span className={`font-semibold ${row.statusColor}`}>{row.status}</span>,
  },
  { key: 'date', header: 'Date' },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'available':
      return 'text-green-500';
    case 'booked':
      return 'text-yellow-500';
    case 'under maintenance':
    case 'unavailable':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const AuditLogs: React.FC<AuditLogsProps> = ({ mode }) => {
  const { logs } = useLogs();
  const { rooms } = useRooms();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const filteredLogs = useMemo<RoomLogRow[]>(() => {
    // Currently only room logs are available via context; we format them consistently.
    return logs
      .map((log) => {
        const room = rooms.find((r) => r.id === String(log.roomId));
        if (!room) return null;
        return {
          action: log.eventType,
          room: `${room.name} | ${room.code}`,
          location: room.location || 'N/A',
          capacity: (room as any).size ?? '-',
          status: log.currentStatus,
          date: format(new Date(log.timestamp), 'MM/dd/yy\nhh:mmaaa'),
          statusColor: getStatusColor(log.currentStatus),
        } as RoomLogRow;
      })
      .filter((x): x is RoomLogRow => Boolean(x))
      .filter((log) => log.action.toLowerCase().includes(search.toLowerCase()));
  }, [logs, rooms, search]);

  // Built-in DataTable pagination will handle slicing; keep currentPage for controlled pagination


  return (
    <div className="px-7 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4 gap-4">
        <h2 className="text-2xl font-bold">{mode === 'bookings' ? 'BOOKING LOGS' : 'ROOM LOGS'}</h2>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search actions..."
            className="w-80 pr-9 pl-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <DataTable
        columns={ROOM_LOGS_COLUMNS}
        rows={filteredLogs}
        className="whitespace-pre-line"
        itemsPerPage={pageSize}
        page={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AuditLogs;