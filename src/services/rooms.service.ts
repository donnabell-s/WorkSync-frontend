/* eslint-disable */
import { http } from '../api/http';
import { API } from '../api/endpoints';
import type { Room } from '../types';

type Payload = {
  name?: string;
  code?: string;
  location?: string;
  level?: string;
  seats?: number;
  sizeLabel?: string;
  status?: string;
  amenities: string[];
  operatingHours?: unknown;
  imageUrl?: string;
};

export const roomsService = {
  async getAll() {
    const { data } = await http.get<Room[]>(API.ROOMS.GET);
    return data;
  },
  async getById(id: string) {
    const { data } = await http.get<Room>(API.ROOMS.GET_BY_ID(id));
    return data;
  },
  async create(room: Omit<Room, 'roomId' | 'createdAt' | 'updatedAt'>, file?: File) {
    console.log('[roomsService.create] raw form:', room, file ? '(with file)' : '(no file)');
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

    const normalizeOperatingHours = (raw: unknown): unknown => {
      if (!raw) return undefined;
      if (typeof raw === 'object') return raw;
      if (typeof raw === 'string') {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') return parsed;
        } catch (e) {
          // ignore
        }
        return undefined;
      }
      return undefined;
    };

    const payload: Payload = {
      name: room.name,
      code: room.code,
      location: room.location,
      level: room.level !== undefined && room.level !== null ? String(room.level) : undefined,
      seats: toInt((room as unknown as any).seats),
      sizeLabel: (room as any).sizeLabel ?? (room as any).size,
      status: statusMap((room as any).status),
      amenities: room.amenities ?? [],
      operatingHours: normalizeOperatingHours((room as unknown as any).operatingHours),
      imageUrl: room.imageUrl,
    };

    const fd = new FormData();
    if (payload.name !== undefined) fd.append('Name', String(payload.name));
    if (payload.code !== undefined) fd.append('Code', String(payload.code));
    if (payload.location !== undefined) fd.append('Location', String(payload.location));
    if (payload.level !== undefined) fd.append('Level', String(payload.level));
    if (payload.sizeLabel !== undefined) fd.append('SizeLabel', String(payload.sizeLabel));
    if (payload.status !== undefined) fd.append('Status', String(payload.status));
    if (payload.seats !== undefined) fd.append('Seats', String(payload.seats));
    if (payload.operatingHours !== undefined) fd.append('OperatingHours', JSON.stringify(payload.operatingHours));
    payload.amenities.forEach(a => fd.append('Amenities', a));
    if (file) fd.append('Image', file);
    if (payload.imageUrl) fd.append('ImageUrl', String(payload.imageUrl));
    console.log('[roomsService.create] form-data entries:', [...fd.entries()]);
    const { data } = await http.post<Room>(API.ROOMS.POST, fd);
    return data;
  },
  async update(id: string, room: Partial<Omit<Room, 'roomId'>>, file?: File) {
    console.log('[roomsService.update] raw form:', { id, room }, file ? '(with file)' : '(no file)');
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
      return s;
    };

    const normalizeOperatingHours = (raw: unknown): unknown => {
      if (!raw) return undefined;
      if (typeof raw === 'object') return raw;
      if (typeof raw === 'string') {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') return parsed;
        } catch (e) {
          // ignore
        }
        return undefined;
      }
      return undefined;
    };

    const opHours = normalizeOperatingHours((room as unknown as any).operatingHours);

    const payload: Payload = {
      name: room.name as string | undefined,
      code: room.code as string | undefined,
      location: room.location as string | undefined,
      level: room.level !== undefined && (room as any).level !== null ? String((room as any).level) : undefined,
      seats: toInt((room as unknown as any).seats),
      sizeLabel: (room as any).sizeLabel ?? (room as any).size,
      status: statusMap((room as any).status),
      amenities: room.amenities ?? [],
      operatingHours: opHours,
      imageUrl: room.imageUrl as string | undefined,
    };

    console.log('[roomsService.update] payload:', payload);
    const fd = new FormData();
    if (payload.name !== undefined) fd.append('Name', String(payload.name));
    if (payload.code !== undefined) fd.append('Code', String(payload.code));
    if (payload.location !== undefined) fd.append('Location', String(payload.location));
    if (payload.level !== undefined) fd.append('Level', String(payload.level));
    if (payload.sizeLabel !== undefined) fd.append('SizeLabel', String(payload.sizeLabel));
    if (payload.status !== undefined) fd.append('Status', String(payload.status));
    if (payload.seats !== undefined) fd.append('Seats', String(payload.seats));
    if (opHours !== undefined) fd.append('OperatingHours', JSON.stringify(opHours));
    payload.amenities.forEach(a => fd.append('Amenities', a));
    if (file) fd.append('Image', file);
    if (payload.imageUrl) fd.append('ImageUrl', String(payload.imageUrl));
    console.log('[roomsService.update] form-data entries:', [...fd.entries()]);
    await http.put(API.ROOMS.PUT(id), fd);
    const refreshed = await roomsService.getById(id);
    return refreshed;
  },
  async remove(id: string) {
    await http.delete(API.ROOMS.DELETE(id));
  },
};
