import { http } from '../api/http';
import { API } from '../api/endpoints';
import type { Log } from '../types';

export const logsService = {
  async getBookingLogs() {
    const { data } = await http.get<Log[]>(API.LOGS.BOOKING_LOGS.GET);
    return data;
  },
  async getRoomLogs() {
    const { data } = await http.get<Log[]>('/api/RoomLogs/Get');
    return data;
  },
  async createBookingLog(log: Omit<Log, 'bookingLogId' | 'timestamp'>) {
    const { data } = await http.post<Log>(API.LOGS.BOOKING_LOGS.POST, log);
    return data;
  },
  async createRoomLog(log: Omit<Log, 'roomLogId' | 'timestamp'>) {
    const { data } = await http.post('/api/RoomLogs/Post', log);
    return data as Log;
  },
};
