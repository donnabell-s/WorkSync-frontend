import { Request, Response } from 'express';
import { getDB } from '../services/db.service';
import { nanoid } from 'nanoid';
import { Room, User } from '../types';

export const getAdmins = async (_req: Request, res: Response) => {
    const db = getDB();
    await db.read();
    if (!db.data?.users) {
        return res.status(404).json({ message: 'No users found' });
    }
    const admins = db.data.users.filter((user: any) => user.role === 'admin');
    res.json(admins);
};

export const getAdminById = async (req: Request, res: Response) => {
    const db = getDB();
    const adminId = req.params.id;
    await db.read();
    const admin = db.data?.users.find((user: any) => user.id === adminId && user.role === 'admin');
    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
};

export const addAdmin = async (req: Request, res: Response) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Request body is required' });
        }

        const db = getDB();
        const { fname, lname, email, password } = req.body;

        if (!fname || !lname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        await db.read();

        if (!db.data?.users) {
            db.data = { ...db.data, users: [] };
        }

        const existingUser = db.data.users.find((user: any) => user.email === email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const now = new Date();
        const admin: User = {
            id: nanoid(),
            fname,
            lname,
            email,
            password,
            role: 'admin',
            isActive: true,
            createdAt: now,
            updatedAt: now,
        };

        db.data.users.push(admin);
        await db.write();
        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
        console.error('Error adding admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateAdmin = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        await db.read();
        const adminId = req.params.id;
        const adminIndex = db.data?.users.findIndex((user: any) => user.id === adminId && user.role === 'admin');
        if (adminIndex === undefined || adminIndex === -1) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const { fname, lname, email, password, isActive } = req.body;

        // Prevent updating email to one that already exists
        if (email && db.data.users.some((user: any, idx: number) => user.email === email && idx !== adminIndex)) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const updatedAdmin = {
            ...db.data.users[adminIndex],
            fname: fname ?? db.data.users[adminIndex].fname,
            lname: lname ?? db.data.users[adminIndex].lname,
            email: email ?? db.data.users[adminIndex].email,
            password: password ?? db.data.users[adminIndex].password,
            isActive: typeof isActive === 'boolean' ? isActive : db.data.users[adminIndex].isActive,
            updatedAt: new Date(),
        };

        db.data.users[adminIndex] = updatedAdmin;
        await db.write();
        res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        await db.read();
        const adminId = req.params.id;

        const adminIndex = db.data?.users.findIndex((user: any) => user.id === adminId && user.role === 'admin');
        if (adminIndex === undefined || adminIndex === -1) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        db.data?.users.splice(adminIndex, 1);
        await db.write();
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};