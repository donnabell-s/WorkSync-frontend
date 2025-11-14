import React, { createContext, useContext, useState, useCallback } from 'react';
import { Log } from '../types';
import { logsService } from '../services/logs.service';

interface LogsContextType {
  logs: Log[];
  fetchRoomLogs: (options?: { force?: boolean }) => Promise<void>;
  addLog: (log: Omit<Log, 'id' | 'timestamp'>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const LogsContext = createContext<LogsContextType | undefined>(undefined);

export const LogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const inFlightRef = React.useRef<Promise<Log[]> | null>(null);

  const fetchRoomLogs = useCallback(async (options?: { force?: boolean }) => {
    if (inFlightRef.current) {
      await inFlightRef.current;
      return;
    }
    if (loaded && !options?.force) return;
    setLoading(true);
    setError(null);
    const p = logsService.getRoomLogs()
      .then((data) => {
        setLogs(Array.isArray(data) ? data : []);
        setLoaded(true);
        return Array.isArray(data) ? data : [];
      })
      .catch((e: any) => {
        setError(e?.message ?? 'Failed to load logs');
        setLogs([]);
        return [] as Log[];
      })
      .finally(() => {
        inFlightRef.current = null;
        setLoading(false);
      });
    inFlightRef.current = p;
    await p;
  }, [loaded]);

  const addLog = async (logData: Omit<Log, 'id' | 'timestamp'>) => {
    try {
      await logsService.createRoomLog(logData);
      await fetchRoomLogs({ force: true });
    } catch (e: any) {
      setError(e?.message ?? 'Failed to add log');
    }
  };

  // Do not auto-fetch on mount; pages should call fetchRoomLogs() on demand

  return (
    <LogsContext.Provider value={{ logs, fetchRoomLogs, addLog, loading, error }}>
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
