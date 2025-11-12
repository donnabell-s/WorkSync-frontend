import { http } from '../api/http';
import { API } from '../api/endpoints';
import type { Room } from '../types';

export const roomsService = {
  async getAll() {
    const { data } = await http.get<Room[]>(API.ROOMS.GET);
    return data;
  },
  async getById(id: string) {
    const { data } = await http.get<Room>(API.ROOMS.GET_BY_ID(id));
    return data;
  },
  async create(room: Omit<Room, 'roomId' | 'createdAt' | 'updatedAt'>) {
    const toInt = (v: unknown): number | undefined => {
      if (v === undefined || v === null) return undefined;
      const n = typeof v === 'string' ? parseInt(v, 10) : (v as number);
      return Number.isFinite(n) ? n : undefined;
    };

    const statusMap = (s?: string): string | undefined => {
      if (!s) return undefined;
      const t = s.toLowerCase();
      if (t === 'active') return 'Available';
      if (t === 'available') return 'Available';
      if (t === 'inactive') return 'Inactive';
      if (t === 'under maintenance') return 'Under Maintenance';
      if (t === 'occupied') return 'Occupied';
      return s;
    };

    const normalizeOperatingHours = (raw: unknown): any => {
      if (!raw) return undefined;
      if (typeof raw === 'object') return raw as any;
      if (typeof raw === 'string') {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') return parsed;
        } catch {}
        return undefined;
      }
      return undefined;
    };

    const payload: any = {
      name: room.name,
      code: room.code,
      location: room.location,
      level: (room as any).level !== undefined && (room as any).level !== null ? String((room as any).level) : undefined,
      seats: toInt((room as any).seats),
      sizeLabel: (room as any).sizeLabel ?? (room as any).size,
      status: statusMap((room as any).status),
      amenities: room.amenities ?? [],
      operatingHours: normalizeOperatingHours((room as any).operatingHours),
      imageUrl: room.imageUrl,
    };

    const { data } = await http.post<Room>(API.ROOMS.POST, payload);
    return data;
  },
  async update(id: string, room: Partial<Omit<Room, 'roomId'>>) {
    // Normalize payload to align with backend expectations
    const toInt = (v: unknown): number | undefined => {
      if (v === undefined || v === null) return undefined;
      const n = typeof v === 'string' ? parseInt(v, 10) : (v as number);
      return Number.isFinite(n) ? n : undefined;
    };

    const statusMap = (s?: string): string | undefined => {
      if (!s) return undefined;
      const t = s.toLowerCase();
      if (t === 'active') return 'Available';
      if (t === 'inactive') return 'Inactive';
      if (t === 'under maintenance') return 'Under Maintenance';
      if (t === 'occupied') return 'Occupied';
      return s; // pass-through for already-correct values
    };

    // Normalize operating hours: accept JSON string or object matching OperatingHoursDto
    const normalizeOperatingHours = (raw: unknown): any => {
      if (!raw) return undefined;
      if (typeof raw === 'object') return raw as any;
      if (typeof raw === 'string') {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') return parsed;
        } catch {}
        return undefined;
      }
      return undefined;
    };

    const opHours = normalizeOperatingHours((room as any).operatingHours);

    const payload: any = {
      roomId: id,
      name: room.name,
      code: room.code,
      location: room.location,
      // Backend expects string for Level
      level: (room as any).level !== undefined && (room as any).level !== null ? String((room as any).level) : undefined,
      seats: toInt((room as any).seats),
      sizeLabel: (room as any).sizeLabel ?? (room as any).size, // accept either
      status: statusMap((room as any).status),
      amenities: room.amenities ?? [],
      operatingHours: opHours,
      imageUrl: room.imageUrl,
    };

    await http.put(API.ROOMS.PUT(id), payload);
    // Backend returns NoContent; caller should refetch or merge locally
    return { roomId: id, ...payload } as Room;
  },
  async remove(id: string) {
    await http.delete(API.ROOMS.DELETE(id));
  },
};
