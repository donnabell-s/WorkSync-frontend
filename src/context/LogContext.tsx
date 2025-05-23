import React, { createContext, useContext, useState, useEffect } from 'react';
import { Log } from '../../server/types';
import { LogsApi } from '../api';

interface LogsContextType {
  logs: Log[];
  fetchRoomLogs: () => Promise<void>;
  addLog: (log: Omit<Log, 'id' | 'timestamp'>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const LogsContext = createContext<LogsContextType | undefined>(undefined);

export const LogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoomLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await LogsApi.getAllRoomLogs();
      console.log('Fetched Room Logs:', response.data);
      setLogs(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  const addLog = async (logData: Omit<Log, 'id' | 'timestamp'>) => {
    setError(null);
    try {
      await LogsApi.create(logData);
      await fetchRoomLogs();
    } catch (err: any) {
      setError(err.message || 'Failed to create log');
    }
  };

  useEffect(() => {
    fetchRoomLogs();
  }, []);

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
