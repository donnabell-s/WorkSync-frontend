import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authApi } from '../api/client';
import { User } from '../../server/types';

type AuthContextType = {
  user: User | null;
  users: User[];
  token: string | null;
  error: string | null;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (fname: string, lname: string, email: string, password: string) => Promise<User | null>;
  logout: () => void;
  getAllUsers: () => Promise<User[]>;
  getUserById: (id: string) => Promise<void>;
  updateUser: (id: string, user: Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
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
    try {
      const { data } = await authApi.getAllUsers();

      setUsers(data);

      return data;
    } catch (error) {
      console.error('Fetching users failed:', error);
      throw error;
    }
  };

  const updateUser = async (id: string, user: Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data } = await authApi.update(id, { user });

      if (!data) {
        throw new Error('Update user failed: No data returned');
      }

      setUsers(prev =>
        prev.map(u => (u.id === data.id ? data : u))
      );
      return data;
    } catch (error) {
      console.error('Update user failed:', error);
      throw error;
    }
  };

  const getUserById = async (id: string) => {
      setIsLoading(true);
      try {
        const response = await authApi.getUserById(id);
        setCurrentUser(response.data);
      } catch (err) {
        setError('Admin not found');
      } finally {
        setIsLoading(false);
      }
    };

  const deleteUser = async (userId: string) => {
    try {
      await authApi.delete(userId);
      // Remove from users list
      setUsers(prev => prev.filter(u => u.id !== userId));
      // If the deleted user is the current user, log out
      if (user && user.id === userId) {
        await logout();
      }
    } catch (error) {
      console.error('Delete user failed:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await authApi.login({ email, password });
      
      // Store both token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update state
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw for component to handle
    }
  };

  const signup = async (fname: string, lname: string, email: string, password: string) => {
    try {
      const { data } = await authApi.signup({ fname, lname, email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
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