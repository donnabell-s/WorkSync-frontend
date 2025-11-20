import React, { useState, useMemo, useEffect } from 'react';
import { useLogs } from '../../../../context/LogContext';
import { format } from 'date-fns';
import { DataTable, DataTableColumn } from '../../../components/UI';
import { FaSearch } from 'react-icons/fa';
import type { Log } from '../../../../types';

interface AuditLogsProps {
  mode: 'rooms' | 'bookings';
}

type RoomLogRow = {
  action: string;
  room: string;
  message: string;
  author: string;
  timestamp: string;
};

type BookingLogRow = {
  action: string;
  booking: string;
  message: string;
  author: string;
  timestamp: string;
};

const ROOM_LOGS_COLUMNS: DataTableColumn<RoomLogRow>[] = [
  { key: 'action', header: 'Action' },
  { key: 'room', header: 'Room Name' },
  { key: 'message', header: 'Message' },
  { key: 'author', header: 'Author' },
  { key: 'timestamp', header: 'Timestamp' },
];

const BOOKING_LOGS_COLUMNS: DataTableColumn<BookingLogRow>[] = [
  { key: 'action', header: 'Action' },
  { key: 'booking', header: 'Booking Name' },
  { key: 'message', header: 'Message' },
  { key: 'author', header: 'Author' },
  { key: 'timestamp', header: 'Timestamp' },
];

const AuditLogs: React.FC<AuditLogsProps> = ({ mode }) => {
  const { logs, fetchRoomLogs, fetchBookingLogs } = useLogs();
  // Fetch correct logs when switching modes
  useEffect(() => {
    if (mode === 'bookings') {
      fetchBookingLogs({ force: true }).catch(() => {});
    } else {
      fetchRoomLogs({ force: true }).catch(() => {});
    }
  }, [mode, fetchRoomLogs, fetchBookingLogs]);

  useEffect(() => {
    if (mode === 'bookings') {
      fetchBookingLogs().catch(() => {});
    } else {
      fetchRoomLogs().catch(() => {});
    }
  }, [mode, fetchRoomLogs, fetchBookingLogs]);

  // Add polling for automatic updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (mode === 'bookings') {
        fetchBookingLogs({ force: true }).catch(() => {});
      } else {
        fetchRoomLogs({ force: true }).catch(() => {});
      }
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [mode, fetchRoomLogs, fetchBookingLogs]);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const filteredRoomLogs = useMemo<RoomLogRow[]>(() => {
    if (mode !== 'rooms') return [];
    // Memoize room name lookup for speed, fallback to roomId if missing
    return [...logs]
      .reverse()
      .map((log) => {
        const l = log as Log;
        let roomName = l.roomName;
        if (!roomName && l.roomId) roomName = `Room #${l.roomId}`;
        return {
          action: `${(l.changeType || 'unknown').toUpperCase()}`,
          room: roomName || 'N/A',
          message: l.message || 'N/A',
          author: l.authorName || `User #${l.authorId}` || 'N/A',
          timestamp: format(new Date(l.timestamp || ''), 'MM/dd/yy hh:mma'),
        } as RoomLogRow;
      })
      .filter((x): x is RoomLogRow => Boolean(x))
      .filter((log) => log.action.toLowerCase().includes(search.toLowerCase()));
  }, [logs, search, mode]);

  const filteredBookingLogs = useMemo<BookingLogRow[]>(() => {
    if (mode !== 'bookings') return [];
    // Memoize booking name lookup for speed, fallback to bookingId if missing
    return [...logs]
      .reverse()
      .map((log) => {
        const l = log as Log;
        let bookingName = l.bookingName;
        if (!bookingName && l.bookingId) bookingName = `Booking #${l.bookingId}`;
        return {
          action: `${(l.changeType || 'unknown').toUpperCase()}`,
          booking: bookingName || 'N/A',
          message: l.message || 'N/A',
          author: l.authorName || `User #${l.authorId}` || 'N/A',
          timestamp: format(new Date(l.timestamp || ''), 'MM/dd/yy hh:mma'),
        } as BookingLogRow;
      })
      .filter((x): x is BookingLogRow => Boolean(x))
      .filter((log) => log.action.toLowerCase().includes(search.toLowerCase()));
  }, [logs, search, mode]);

  return (
    <div className="px-7 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">{mode === 'bookings' ? 'BOOKING LOGS' : 'ROOM LOGS'}</h2>
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

      {mode === 'bookings' ? (
        <DataTable
          columns={BOOKING_LOGS_COLUMNS}
          rows={filteredBookingLogs}
          className="text-base whitespace-pre-line"
          itemsPerPage={pageSize}
          page={currentPage}
          onPageChange={setCurrentPage}
        />
      ) : (
        <DataTable
          columns={ROOM_LOGS_COLUMNS}
          rows={filteredRoomLogs}
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