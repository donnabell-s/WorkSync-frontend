import { Request, Response } from 'express';
import { getDB } from '../services/db.service';
import { nanoid } from 'nanoid';
import { Room } from '../types';

export const getRooms = async (_req: Request, res: Response) => {
    const db = getDB();
    await db.read();    
    if (!db.data?.rooms) {
        return res.status(404).json({ message: 'No rooms found' });
    }
    res.json(db.data.rooms);
};

export const getRoomById = async (req: Request, res: Response) => {
    console.log("GetRoomsByID Controller");
    const db = getDB();
    const roomId = req.params.id;
    await db.read();
    const room = db.data?.rooms.find((room) => room.id === roomId);
    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
}

export const createRoom = async (req: Request, res: Response) => {
    try {

        if (!req.body) {
            return res.status(400).json({ message: 'Request body is required' });
        }

        const db = getDB();

        const {
            name,
            code,
            seats,
            location,
            level,
            size,
            status,
            operatingHours,
            amenities
        } = req.body.room;

        if (name === '' || code === '') {
            return res.status(400).json({ message: 'Name and code are required' });
        }

        await db.read();

        if (!db.data?.rooms) {
            db.data = { ...db.data, rooms: [] };
        }

        const room: Room = {
            id: nanoid(),
            name: name,
            code: code,
            seats: seats,
            location: location,
            level: level,
            size: size,
            status: status,
            operatingHours: operatingHours,
            amenities: amenities,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        db.data.rooms.push(room);
        await db.write().catch(err => {
            console.error('DB write error:', err);
            throw err; // This will be caught by your try-catch
        });
        res.status(201).json({ message: 'Room created successfully', room: room });
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateRoom = async (req: Request, res: Response) => {
    const db = getDB();
    await db.read();
    const roomId = req.params.id;
    const roomIndex = db.data?.rooms.findIndex((room) => room.id === roomId);
    if (roomIndex === undefined || roomIndex === -1) {
        return res.status(404).json({ message: 'Room not found' });
    }
    const {
        name,
        code,
        seats,
        location,
        level,
        size,
        status,
        operatingHours,
        amenities
    } = req.body.room;

    const updatedRoom = {
        ...db.data.rooms[roomIndex],
        name,
        code,
        seats,
        location,
        level,
        size,
        status,
        operatingHours,
        amenities,
        updatedAt: new Date(),
    };

    db.data.rooms[roomIndex] = updatedRoom;
    await db.write();
    res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
};

export const deleteRoom = async (req: Request, res: Response) => {
    const db = getDB();
    await db.read();
    const roomId = req.params.id;

    const roomIndex = db.data?.rooms.findIndex((room) => room.id === roomId);
    if (roomIndex === undefined || roomIndex === -1) {
        return res.status(404).json({ message: 'Room not found' });
    }
    
    db.data?.rooms.splice(roomIndex, 1);
    await db.write();
    res.status(200).json({ message: 'Room deleted successfully' });
}