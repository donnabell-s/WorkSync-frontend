import React, { createContext, useContext, useState, useEffect } from 'react';
import { dashboardService, DashboardSummary } from '../services/dashboard.service';
import { useAuth } from './AuthContext';

interface AdminDashboardContextType {
  dashboardSummary: DashboardSummary | null;
  isLoading: boolean;
  error: string | null;
  fetchDashboardSummary: (date?: string) => Promise<void>;
  refreshDashboard: () => Promise<void>;
}

const AdminDashboardContext = createContext<AdminDashboardContextType | undefined>(undefined);

export const AdminDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const refreshDashboard = async () => {
    await fetchDashboardSummary();
  };

  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'superadmin' || user.role === 'Admin' || user.role === 'SuperAdmin')) {
      fetchDashboardSummary();
    }
  }, [user]);

  return (
    <AdminDashboardContext.Provider value={{
      dashboardSummary,
      isLoading,
      error,
      fetchDashboardSummary,
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
