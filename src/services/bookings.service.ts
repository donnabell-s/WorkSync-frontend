import { http } from '../api/http';
import { API } from '../api/endpoints';
import type { Booking } from '../types';

export type CreateBookingPayload = {
  roomId: string;
  title: string;
  description: string;
  startDatetime: string;
  endDatetime: string;
  recurrence?: any; // send object; backend serializes
  userRefId?: number;
  expectedAttendees?: number;
};

export const bookingsService = {
  async getAll() {
    const { data } = await http.get<Booking[]>(API.BOOKINGS.GET);
    return data;
  },
  async getById(id: string | number) {
    const { data } = await http.get<Booking>(API.BOOKINGS.GET_BY_ID(id));
    return data;
  },
  async create(booking: CreateBookingPayload) {
    // Debug: log payload being sent to backend
    // Note: Remove or guard this in production if needed
    try { console.debug('[bookingsService] POST', API.BOOKINGS.POST, booking); } catch {}
    const { data } = await http.post<Booking>(API.BOOKINGS.POST, booking);
    return data;
  },
  async update(id: string | number, booking: CreateBookingPayload) {
    try { console.debug('[bookingsService] PUT', API.BOOKINGS.PUT(id), booking); } catch {}
    await http.put(API.BOOKINGS.PUT(id), booking);
    // No content expected; caller should refetch if needed
    return { bookingId: Number(id), ...(booking as any) } as Booking;
  },
  async approve(id: string | number) {
    try { console.debug('[bookingsService] POST', API.BOOKINGS.APPROVE(id)); } catch {}
    const { data } = await http.post<Booking | void>(API.BOOKINGS.APPROVE(id));
    return data as Booking | void;
  },
  async decline(id: string | number) {
    try { console.debug('[bookingsService] POST', API.BOOKINGS.DECLINE(id)); } catch {}
    const { data } = await http.post<Booking | void>(API.BOOKINGS.DECLINE(id));
    return data as Booking | void;
  },
  async remove(id: string | number) {
    await http.delete(API.BOOKINGS.DELETE(id));
  },
};
