import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authApi } from '../api/client';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (fname: string, lname: string, email: string, password: string) => Promise<User | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

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
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
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