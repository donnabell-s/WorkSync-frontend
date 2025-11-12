import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/auth.service';
import { usersService } from '../services/users.service';

type AuthContextType = {
  user: User | null;
  users: User[];
  token: string | null;
  error: string | null;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<User | null>;
  logout: () => void;
  getAllUsers: () => Promise<User[]>;
  getUserById: (id: string) => Promise<void>;
  updateUser: (id: string, user: Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'role' | 'isActive'>> & { password?: string }) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const data = await usersService.getAll();
      setUsers(data);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id: string, payload: Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'role' | 'isActive'>> & { password?: string }) => {
    const updated = await usersService.update(id, payload);
    setUsers(prev => prev.map(u => (String(u.id) === String(updated.id) ? updated : u)));
    if (user && String(user.id) === String(updated.id)) {
      const merged = { ...user, ...updated } as User;
      setUser(merged);
      localStorage.setItem('user', JSON.stringify(merged));
    }
    return updated;
  };

  const getUserById = async (_id: string) => {
    // Backend has no GetUserById; use current user if present
    setCurrentUser(user);
  };

  const deleteUser = async (id: string) => {
    await usersService.remove(id);
    setUsers(prev => prev.filter(u => String(u.id) !== String(id)));
    if (user && String(user.id) === String(id)) {
      await logout();
    }
  };

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user as User);
    return data.user as User;
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    await authService.signup({ firstName, lastName, email, password });
    // Optional: auto-login after register if backend supports; for now, return null and let UI redirect to login
    return null;
  };

  const logout = async () => {
    try { await authService.logout(); } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, users, currentUser, token, error, login, signup, logout, getAllUsers, getUserById, updateUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};