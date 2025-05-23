import { Request, Response } from 'express';
import { getDB } from '../services/db.service';
import { nanoid } from 'nanoid';
// import { AuthRequest } from '../types';

export const getRooms = async (_req: Request, res: Response) => {
    const db = getDB();
    await db.read();
    console.log('rooms: ' + db.data?.rooms[1]);
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

    await db.read();
    const room = {
        id: nanoid(),
        name,
        code,
        seats,
        location,
        level,
        size,
        status,
        operatingHours,
        amenities,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    db.data?.rooms.push(room);
    await db.write();
    res.status(201).json({ message: 'Room created successfully', room });
};

export const updateRoom = async (req: Request, res: Response) => {
    const db = getDB();
    await db.read();
    const roomId = req.params.id;
    const room = db.data?.rooms.find((room) => room.id === roomId);
    if (!room) {
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
    } = req.body;

    room.name = name;
    room.code = code;
    room.seats = seats;
    room.location = location;
    room.level = level;
    room.size = size;
    room.status = status;
    room.operatingHours = operatingHours;
    room.amenities = amenities;
    room.updatedAt = new Date();

    db.data?.rooms.push(room);
    await db.write();
    res.status(201).json({ message: 'Room updated successfully', room });
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