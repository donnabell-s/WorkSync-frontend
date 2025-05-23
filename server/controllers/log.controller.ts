import { Request, Response } from 'express';
import { getDB } from '../services/db.service';
import { nanoid } from 'nanoid';
// import { AuthRequest } from '../types';


export const getRoomLog = async (_req: Request, res: Response) => {
  const db = getDB();
  await db.read();

  if (!db.data?.logs?.roomLogs || db.data.logs.roomLogs.length === 0) {
    return res.status(404).json({ message: 'No Room Log found' });
  }

  res.json(db.data.logs.roomLogs);
};

export const createRoomLog = async (req: Request, res: Response) => {
  const db = getDB();
  await db.read();

  const {
    userId,
    roomId,
    bookingId,
    eventType,
    currentStatus,
  } = req.body;

  const nextId =
    db.data?.logs?.roomLogs?.length > 0
      ? Math.max(...db.data.logs.roomLogs.map((b: any) => Number(b.id))) + 1
      : 1;

  const roomLog = {
    id: nextId,
    bookingId,
    eventType,
    currentStatus,
    timestamp: new Date(),
    roomId,
    userId,
  };

  db.data.logs.roomLogs.push(roomLog);
  await db.write();

  res.status(201).json({ message: 'Room log created successfully', roomLog });
};
