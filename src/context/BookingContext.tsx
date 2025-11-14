import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking } from '../types';
import { bookingsService, type CreateBookingPayload } from '../services/bookings.service';
import { useCallback } from "react";
import { useAuth } from './AuthContext';

interface BookingContextType {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
  fetchBookings: (options?: { force?: boolean }) => Promise<void>;
  getBookingById: (id: number, options?: { force?: boolean }) => Promise<void>;
  addBooking: (booking: CreateBookingPayload) => Promise<void>;
  updateBooking: (id: string, booking: Partial<CreateBookingPayload>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  approveBooking: (id: string | number) => Promise<void>;
  declineBooking: (id: string | number) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const inFlightListRef = React.useRef<Promise<Booking[]> | null>(null);
  const inFlightByIdRef = React.useRef<Map<number, Promise<Booking>>>(new Map());
  const { token } = useAuth();

  const fetchBookings = useCallback(async (options?: { force?: boolean }) => {
    if (inFlightListRef.current) {
      await inFlightListRef.current;
      return;
    }
    if (loaded && !options?.force) return;
    setIsLoading(true);
    const p = bookingsService.getAll()
      .then((data) => {
        setBookings(data);
        setLoaded(true);
        return data;
      })
      .finally(() => {
        inFlightListRef.current = null;
        setIsLoading(false);
      });
    inFlightListRef.current = p;
    await p;
  }, [loaded]);


  const getBookingById = useCallback(async (id: number, options?: { force?: boolean }) => {
    if (currentBooking && Number(currentBooking.bookingId) === Number(id) && !options?.force) {
      return;
    }
    const map = inFlightByIdRef.current;
    if (map.has(id)) {
      await map.get(id)!;
      return;
    }
    setIsLoading(true);
    const p = bookingsService.getById(id)
      .then((data) => {
        setCurrentBooking(data);
        return data;
      })
      .finally(() => {
        map.delete(id);
        setIsLoading(false);
      });
    map.set(id, p);
    await p;
  }, [currentBooking]);

  const addBooking = async (booking: CreateBookingPayload) => {
    setIsLoading(true);
    try {
  const created = await bookingsService.create(booking);
      setBookings(prev => [...prev, created]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBooking = async (id: string, patch: Partial<CreateBookingPayload>) => {
    setIsLoading(true);
    try {
      // Get existing booking to construct full update payload
      let existing: Booking | null = null;
      if (currentBooking && String(currentBooking.bookingId) === String(id)) {
        existing = currentBooking;
      } else {
        const inList = bookings.find(b => String(b.bookingId) === String(id));
        if (inList) existing = inList;
        else {
          existing = await bookingsService.getById(id);
        }
      }
      if (!existing) throw new Error('Booking not found for update');

      // Recurrence precedence: use patch if provided; otherwise preserve existing
      let recurrence: any = undefined;
      if (patch.recurrence !== undefined) {
        recurrence = patch.recurrence;
      } else if (typeof existing.recurrence === 'string') {
        try { recurrence = JSON.parse(existing.recurrence); } catch { recurrence = null; }
      } else if (existing.recurrence) {
        recurrence = existing.recurrence as any;
      } else {
        recurrence = null;
      }

      const fullPayload: CreateBookingPayload = {
        roomId: patch.roomId ?? existing.roomId,
        title: patch.title ?? existing.title,
        description: patch.description ?? existing.description ?? '',
        startDatetime: patch.startDatetime ?? existing.startDatetime,
        endDatetime: patch.endDatetime ?? existing.endDatetime,
        recurrence,
        userRefId: patch.userRefId ?? existing.userRefId,
        expectedAttendees: patch.expectedAttendees ?? existing.expectedAttendees,
      };

      // Debug log
      try { console.debug('[BookingContext] PUT composed payload', id, fullPayload); } catch {}

      await bookingsService.update(id, fullPayload);
      // Refetch to ensure we have what DB saved
      const refreshed = await bookingsService.getById(id);
      setBookings(prev => {
        const exists = prev.some(b => String(b.bookingId) === String(id));
        return exists ? prev.map(b => (String(b.bookingId) === String(id) ? refreshed : b)) : [...prev, refreshed];
      });
      setCurrentBooking(refreshed);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBooking = async (id: string) => {
    setIsLoading(true);
    try {
  await bookingsService.remove(id);
  setBookings(prev => prev.filter(b => String(b.bookingId) !== String(id)));
      setCurrentBooking(null);
    } finally {
      setIsLoading(false);
    }
  };

  const approveBooking = async (id: string | number) => {
    setIsLoading(true);
    try {
      await bookingsService.approve(id);
      setBookings(prev => prev.map(b => (String(b.bookingId) === String(id) ? { ...b, status: 'Approved' } as Booking : b)));
      setCurrentBooking(prev => (prev && String(prev.bookingId) === String(id) ? { ...prev, status: 'Approved' } : prev));
    } finally {
      setIsLoading(false);
    }
  };

  const declineBooking = async (id: string | number) => {
    setIsLoading(true);
    try {
      await bookingsService.decline(id);
      setBookings(prev => prev.map(b => (String(b.bookingId) === String(id) ? { ...b, status: 'Declined' } as Booking : b)));
      setCurrentBooking(prev => (prev && String(prev.bookingId) === String(id) ? { ...prev, status: 'Declined' } : prev));
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    // Avoid prefetching protected resources before login/token is set to prevent 401+CORS noise
    if (token) {
      fetchBookings();
    }
  }, [fetchBookings, token]);

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
      , approveBooking, declineBooking
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
