import React, { createContext, useContext, useState, useEffect } from 'react';
import { dashboardService, DashboardSummary, DashboardData } from '../services/dashboard.service';
import { useAuth } from './AuthContext';

interface AdminDashboardContextType {
  dashboardSummary: DashboardSummary | null;
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  fromCache: boolean;
  lastComputedAt: string | null;
  fetchDashboardSummary: (date?: string) => Promise<void>;
  fetchOptimizedDashboard: (date?: string) => Promise<void>;
  refreshDashboard: () => Promise<void>;
}

const AdminDashboardContext = createContext<AdminDashboardContextType | undefined>(undefined);

export const AdminDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [lastComputedAt, setLastComputedAt] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchDashboardSummary = async (date?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const summary = await dashboardService.getSummary(date);
      setDashboardSummary(summary);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard summary';
      setError(errorMessage);
      console.error('Dashboard summary fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOptimizedDashboard = async (date?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getOptimizedDashboard(date);
      setDashboardData(data);
      setDashboardSummary(data.summary);
      setFromCache(data.fromCache);
      setLastComputedAt(data.lastComputedAt);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
      setError(errorMessage);
      console.error('Dashboard fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshDashboard = async () => {
    await fetchOptimizedDashboard();
  };

  // Initial fetch when user is authenticated
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'superadmin' || user.role === 'Admin' || user.role === 'SuperAdmin')) {
      fetchOptimizedDashboard();
    }
  }, [user]);

  // Automatic polling every 30 seconds to match backend computation cycle
  useEffect(() => {
    if (!user || !(user.role === 'admin' || user.role === 'superadmin' || user.role === 'Admin' || user.role === 'SuperAdmin')) {
      return;
    }

    const intervalId = setInterval(() => {
      console.log('[DASHBOARD POLLING] Refreshing dashboard data...');
      fetchOptimizedDashboard();
    }, 10000); // 10 seconds

    return () => {
      console.log('[DASHBOARD POLLING] Cleanup interval');
      clearInterval(intervalId);
    };
  }, [user]);

  return (
    <AdminDashboardContext.Provider value={{
      dashboardSummary,
      dashboardData,
      isLoading,
      error,
      fromCache,
      lastComputedAt,
      fetchDashboardSummary,
      fetchOptimizedDashboard,
      refreshDashboard
    }}>
      {children}
    </AdminDashboardContext.Provider>
  );
};

export const useAdminDashboard = () => {
  const context = useContext(AdminDashboardContext);
  if (!context) {
    throw new Error('useAdminDashboard must be used within an AdminDashboardProvider');
  }
  return context;
};
