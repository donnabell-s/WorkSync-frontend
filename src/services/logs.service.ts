import { http } from '../api/http';
import { API } from '../api/endpoints';
import type { Log } from '../types';

export const logsService = {
  async getRoomLogs() {
    const { data } = await http.get<Log[]>(API.LOGS.BOOKING_LOGS.GET);
    return data;
  },
  async createRoomLog(log: Omit<Log, 'bookingLogId' | 'timestamp'>) {
    const { data } = await http.post<Log>(API.LOGS.BOOKING_LOGS.POST, log);
    return data;
  },
};
