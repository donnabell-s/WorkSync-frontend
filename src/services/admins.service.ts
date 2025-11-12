import { http } from '../api/http';
import { API } from '../api/endpoints';
import type { User } from '../types';

export const adminsService = {
  async getAll() {
    const { data } = await http.get<User[]>(API.ACCOUNT.GET_ADMINS);
    return data;
  },
  // No dedicated GetAdminById endpoint; fetch list and filter if needed
  async create(admin: { firstName: string; lastName: string; email: string; password: string; isActive?: boolean }) {
    // Ensure role is Admin when creating via account endpoint
    const payload = { ...admin, role: 'Admin' };
    const { data } = await http.post<User>(API.ACCOUNT.CREATE_USER, payload);
    return data;
  },
  async update(id: string, admin: Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'role' | 'isActive'>> & { password?: string }) {
    const payload: any = {};
    if (admin.firstName !== undefined) payload.firstName = admin.firstName;
    if (admin.lastName !== undefined) payload.lastName = admin.lastName;
    if (admin.email !== undefined) payload.email = admin.email;
    if (admin.role !== undefined) payload.role = admin.role;
    if (admin.isActive !== undefined) payload.isActive = admin.isActive;
    if ((admin as any).password !== undefined) payload.password = (admin as any).password;
    await http.put(API.ACCOUNT.UPDATE_USER(id), payload);
    return { id, ...admin } as unknown as User;
  },
  async remove(id: string) {
    await http.delete(API.ACCOUNT.DELETE_USER(id));
  },
};
