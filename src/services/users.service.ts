import { http } from '../api/http';
import { API } from '../api/endpoints';
import type { User } from '../types';

export const usersService = {
  async getAll() {
    const { data } = await http.get<User[]>(API.ACCOUNT.GET_USERS);
    return data;
  },
  // Backend does not expose GetUserById; fetch list or add endpoint as needed
  async update(id: string, user: Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'role' | 'isActive'>> & { password?: string }) {
    const payload: any = {};
    if (user.firstName !== undefined) payload.firstName = user.firstName;
    if (user.lastName !== undefined) payload.lastName = user.lastName;
    if (user.email !== undefined) payload.email = user.email;
    if (user.role !== undefined) payload.role = user.role;
    if (user.isActive !== undefined) payload.isActive = user.isActive;
    if ((user as any).password !== undefined) payload.password = (user as any).password;
    await http.put(API.ACCOUNT.UPDATE_USER(id), payload);
    // After update, caller can refresh list or return merged object
    return { id, ...user } as unknown as User;
  },
  async remove(id: string) {
    await http.delete(API.ACCOUNT.DELETE_USER(id));
  },
  async create(user: { firstName: string; lastName: string; email: string; password: string; role?: string; isActive?: boolean }) {
    const { data } = await http.post<User>(API.ACCOUNT.CREATE_USER, user);
    return data;
  },
};
