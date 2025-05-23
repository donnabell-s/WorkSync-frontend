import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../../server/types';
import { adminsApi } from '../api/client';
import { useAuth } from './AuthContext';

interface AdminContextType {
  admins: User[];
  currentAdmin: User | null;
  isLoading: boolean;
  error: string | null;
  fetchAdmins: () => Promise<void>;
  getAdminById: (id: string) => Promise<void>;
  addAdmin: (admin: Omit<User, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateAdmin: (id: string, admin: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteAdmin: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [admins, setAdmins] = useState<User[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const response = await adminsApi.getAll();
      setAdmins(response.data);
    } catch (err) {
      setError('Failed to fetch admins');
    } finally {
      setIsLoading(false);
    }
  };

  const getAdminById = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await adminsApi.getById(id);
      setCurrentAdmin(response.data);
    } catch (err) {
      setError('Admin not found');
    } finally {
      setIsLoading(false);
    }
  };

  const addAdmin = async (admin: Omit<User, "id" | "createdAt" | "updatedAt">) => {
    setIsLoading(true);
    try {
      const response = await adminsApi.create({ room: admin });
      if (response.data) {
        setAdmins(prev => [...prev, response.data]);
      }
    } catch (err) {
      setError('Failed to add admin');
    } finally {
      setIsLoading(false);
    }
  };

  const updateAdmin = async (id: string, admin: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const response = await adminsApi.update(id, { room: admin });
      if (response.data) {
        setAdmins(prev => prev.map(a => (a.id === id ? response.data : a)));
        setCurrentAdmin(response.data);
      }
    } catch (err) {
      setError('Failed to update admin');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAdmin = async (id: string) => {
    setIsLoading(true);
    try {
      await adminsApi.delete(id);
      setAdmins(prev => prev.filter(a => a.id !== id));
      setCurrentAdmin(null);
    } catch (err) {
      setError('Failed to delete admin');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'superadmin')) {
      fetchAdmins();
    }
  }, [user]);

  return (
    <AdminContext.Provider value={{
      admins,
      currentAdmin,
      isLoading,
      error,
      fetchAdmins,
      getAdminById,
      addAdmin,
      updateAdmin,
      deleteAdmin
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmins = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmins must be used within an AdminProvider');
  }
  return context;
};