import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import React, { useState, useMemo, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLogs } from '../../../../context/LogContext';
import { useRooms } from '../../../../context/RoomContext';
import { format } from 'date-fns';

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

  const filteredLogs = useMemo(() => {
    return logs
      .map(log => {
        const room = rooms.find(r => r.id === String(log.roomId));
        if (!room) return null;

        return {
          action: log.eventType,
          room: `${room.name} | ${room.code}`,
          location: room.location || 'N/A',
          capacity: room.size ?? '-',
          status: log.currentStatus,
          date: format(new Date(log.timestamp), 'MM/dd/yy\nhh:mmaaa'),
          statusColor: getStatusColor(log.currentStatus),
        };
      })
      .filter(Boolean)
      .filter(log => log!.action.toLowerCase().includes(search.toLowerCase()));
  }, [logs, rooms, search]);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">ROOM LOGS</h2>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search actions..."
        className="border px-3 py-2 mb-4 rounded w-full max-w-sm"
      />
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              {ROOM_LOGS_COLUMNS.map(col => (
                <th key={col} className="px-4 py-3 border-b font-semibold text-gray-700">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-3">{log!.action}</td>
                  <td className="px-4 py-3">{log!.room}</td>
                  <td className="px-4 py-3">{log!.location}</td>
                  <td className="px-4 py-3">{log!.capacity}</td>
                  <td className={`px-4 py-3 ${log!.statusColor} font-semibold`}>{log!.status}</td>
                  <td className="px-4 py-3 whitespace-pre-line">{log!.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={ROOM_LOGS_COLUMNS.length} className="text-center py-4 text-gray-500">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;