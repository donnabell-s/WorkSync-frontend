import React, { createContext, useContext, useState, useCallback } from 'react';
import { RoomLog, BookingLog } from '../types';
import { logsService } from '../services/logs.service';

interface LogsContextType {
  roomLogs: RoomLog[];
  fetchRoomLogs: (options?: { force?: boolean }) => Promise<void>;
  bookingLogs: BookingLog[];
  fetchBookingLogs: (options?: { force?: boolean }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const LogsContext = createContext<LogsContextType | undefined>(undefined);

export const LogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomLogs, setRoomLogs] = useState<RoomLog[]>([]);
  const [bookingLogs, setBookingLogs] = useState<BookingLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomLoaded, setRoomLoaded] = useState(false);
  const [bookingLoaded, setBookingLoaded] = useState(false);
  
  const roomInFlightRef = React.useRef<Promise<void> | null>(null);
  const bookingInFlightRef = React.useRef<Promise<void> | null>(null);

  const fetchRoomLogs = useCallback(async (options?: { force?: boolean }) => {
    if (roomInFlightRef.current) {
      await roomInFlightRef.current;
      return;
    }
    
    if (roomLoaded && !options?.force) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const promise = logsService.getRoomLogs()
      .then((data) => {
        const logs = Array.isArray(data) ? data : [];
        setRoomLogs(logs);
        setRoomLoaded(true);
      })
      .catch((e: any) => {
        setError(e?.message ?? 'Failed to load room logs');
        setRoomLogs([]);
      })
      .finally(() => {
        roomInFlightRef.current = null;
        setLoading(false);
      });
    
    roomInFlightRef.current = promise;
    await promise;
  }, [roomLoaded]);

  const fetchBookingLogs = useCallback(async (options?: { force?: boolean }) => {
    if (bookingInFlightRef.current) {
      await bookingInFlightRef.current;
      return;
    }
    
    if (bookingLoaded && !options?.force) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const promise = logsService.getBookingLogs()
      .then((data) => {
        const logs = Array.isArray(data) ? data : [];
        setBookingLogs(logs);
        setBookingLoaded(true);
      })
      .catch((e: any) => {
        setError(e?.message ?? 'Failed to load booking logs');
        setBookingLogs([]);
      })
      .finally(() => {
        bookingInFlightRef.current = null;
        setLoading(false);
      });
    
    bookingInFlightRef.current = promise;
    await promise;
  }, [bookingLoaded]);

  const value = React.useMemo(() => ({
    roomLogs,
    fetchRoomLogs,
    bookingLogs,
    fetchBookingLogs,
    loading,
    error,
  }), [roomLogs, bookingLogs, fetchRoomLogs, fetchBookingLogs, loading, error]);

  return (
    <LogsContext.Provider value={value}>
      {children}
    </LogsContext.Provider>
  );
};

export const useLogs = () => {
  const context = useContext(LogsContext);
  
  if (!context) {
    throw new Error('useLogs must be used within a LogsProvider');
  }
  
  return context;
};