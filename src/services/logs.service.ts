import { http } from '../api/http';
import { API } from '../api/endpoints';
import type { RoomLog, BookingLog } from '../types';

export const logsService = {
  //ROOM LOGS
  async getRoomLogs(): Promise<RoomLog[]> {
    const { data } = await http.get<RoomLog[]>(API.LOGS.ROOM_LOGS.GET);
    return data;
  },
  
  async getRoomLogById(id: number): Promise<RoomLog> {
    const { data } = await http.get<RoomLog>(API.LOGS.ROOM_LOGS.GET_BY_ID(id));
    return data;
  },
  
  async getRoomLogsByRoom(roomId: string): Promise<RoomLog[]> {
    const { data } = await http.get<RoomLog[]>(API.LOGS.ROOM_LOGS.GET_BY_ROOM(roomId));
    return data;
  },
  

  async deleteRoomLog(id: number): Promise<void> {
    await http.delete(API.LOGS.ROOM_LOGS.DELETE(id));
  },

  //BOOKING LOGS 
  async getBookingLogs(): Promise<BookingLog[]> {
    const { data } = await http.get<BookingLog[]>(API.LOGS.BOOKING_LOGS.GET);
    return data;
  },
  
  async getBookingLogById(id: number): Promise<BookingLog> {
    const { data } = await http.get<BookingLog>(API.LOGS.BOOKING_LOGS.GET_BY_ID(id));
    return data;
  },
  
  async getBookingLogsByBooking(bookingId: number): Promise<BookingLog[]> {
    const { data } = await http.get<BookingLog[]>(API.LOGS.BOOKING_LOGS.GET_BY_BOOKING(bookingId));
    return data;
  },
  
  
  async deleteBookingLog(id: number): Promise<void> {
    await http.delete(API.LOGS.BOOKING_LOGS.DELETE(id));
  },
};