import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking } from '../../server/types';
import { bookingsApi } from '../api/client';
import { useCallback } from "react";

interface BookingContextType {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  getBookingById: (id: string) => Promise<void>;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateBooking: (id: string, booking: Partial<Booking>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const fetchBookings = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await bookingsApi.getAll();
  //     console.log('Fetched bookings:', response.data);
  //     setBookings(response.data);
  //   } catch {
  //     setError('Failed to fetch bookings');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Inside your context component
  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bookingsApi.getAll();
      console.log('Fetched bookings:', response.data);
      setBookings(response.data);
    } catch {
      setError('Failed to fetch bookings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // const getBookingById = async (id: string) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await bookingsApi.getById(Number(id));
  //     setCurrentBooking(response.data);
  //   } catch {
  //     setError('Booking not found');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Inside your BookingContext component
  const getBookingById = useCallback(async (id: string) => {
    setIsLoading(true);
    // setError(null);
    try {
      const response = await bookingsApi.getById(Number(id));
      setCurrentBooking(response.data);
    } catch {
      setError("Booking not found");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addBooking = async (booking: Omit<Booking,  'createdAt' | 'id'  | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bookingsApi.create(booking);
      setBookings(prev => [...prev, response.data]);
    } catch {
      setError('Failed to add booking');
    } finally {
      setIsLoading(false);
    }
  };

  const updateBooking = async (id: string, booking: Partial<Booking>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bookingsApi.update(Number(id), booking);
      setBookings(prev => prev.map(b => String(b.id) === String(id) ? response.data : b));
      setCurrentBooking(response.data);
    } catch {
      setError('Failed to update booking');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBooking = async (id: string) => {
    setIsLoading(true);
    try {
      await bookingsApi.delete(id);
      setBookings(prev => prev.filter(b => String(b.id) !== String(id)));
      setCurrentBooking(null);
    } catch (err) {
      setError('Failed to delete bookling');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider value={{
      bookings,
      currentBooking,
      isLoading,
      error,
      fetchBookings,
      getBookingById,
      addBooking,
      updateBooking,
      deleteBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
