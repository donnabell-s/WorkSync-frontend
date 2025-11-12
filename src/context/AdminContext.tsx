import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { adminService } from '../services/admin.service';
import { useAuth } from './AuthContext';

interface AdminContextType {
  admins: User[];
  currentAdmin: User | null;
  isLoading: boolean;
  error: string | null;
  fetchAdmins: () => Promise<void>;
  getAdminById: (id: string) => Promise<void>;
  addAdmin: (admin: { fname: string; lname: string; email: string; password: string; phone: string; isActive?: boolean }) => Promise<void>;
  updateAdmin: (id: string, admin: Partial<Pick<User, 'fname' | 'lname' | 'email' | 'phone' | 'role' | 'isActive'>> & { password?: string }) => Promise<void>;
  deleteAdmin: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admins, setAdmins] = useState<User[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getAll();
      setAdmins(data);
    } finally {
      setIsLoading(false);
    }
  };

  const getAdminById = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await adminService.getById(id);
      setCurrentAdmin(data);
    } finally {
      setIsLoading(false);
    }
  };

  const addAdmin = async (admin: { fname: string; lname: string; email: string; password: string; phone: string; isActive?: boolean }) => {
    setIsLoading(true);
    try {
      const created = await adminService.create(admin);
      setAdmins(prev => [...prev, created]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAdmin = async (id: string, admin: Partial<Pick<User, 'fname' | 'lname' | 'email' | 'phone' | 'role' | 'isActive'>> & { password?: string }) => {
    setIsLoading(true);
    try {
      const updated = await adminService.update(id, admin);
      setAdmins(prev => prev.map(a => (String(a.id) === String(id) ? updated : a)));
      setCurrentAdmin(updated);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAdmin = async (id: string) => {
    setIsLoading(true);
    try {
      await adminService.remove(id);
      setAdmins(prev => prev.filter(a => String(a.id) !== String(id)));
      setCurrentAdmin(null);
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