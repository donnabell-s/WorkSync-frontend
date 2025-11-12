import { http } from '../api/http';
import { API } from '../api/endpoints';
import type { User } from '../types';

export const adminService = {
    async getAll() {
        const { data } = await http.get<User[]>(API.ACCOUNT.GET_ADMINS);
        return data;
    },
    async getById(id: string) {
        // No dedicated GetAdminById endpoint; fetch list and filter
        const admins = await this.getAll();
        const admin = admins.find(admin => String(admin.id) === String(id));
        if (!admin) {
            throw new Error(`Admin with id ${id} not found`);
        }
        return admin;
    },
    async create(admin: { fname: string; lname: string; email: string; password: string; phone: string; isActive?: boolean }) {
        // Ensure role is Admin when creating via account endpoint
        const payload = { ...admin, role: 'Admin' };
        const { data } = await http.post<User>(API.ACCOUNT.CREATE_USER, payload);
        return data;
    },
    async update(id: string, admin: Partial<Pick<User, 'fname' | 'lname' | 'email' | 'phone' | 'role' | 'isActive'>> & { password?: string }) {
        const payload: any = {};
        if (admin.fname !== undefined) payload.fname = admin.fname;
        if (admin.lname !== undefined) payload.lname = admin.lname;
        if (admin.email !== undefined) payload.email = admin.email;
        if (admin.phone !== undefined) payload.phone = admin.phone;
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