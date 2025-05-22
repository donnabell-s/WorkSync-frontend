import { Request, Response } from 'express';
import { getDB } from '../services/db.service';
import { nanoid } from 'nanoid';


export const getBooking = async (req: Request, res: Response) => {
  const db = getDB();
  await db.read();
  res.json(db.data?.bookings ?? []);
};

export const createBooking = async (req: Request, res: Response) => {
  const db = getDB();
  const { title, roomId, description, startDateTime, endDateTime, isRecurring, pattern, interval, daysOfWeek, dates, endDate, status} = req.body;
  
  await db.read();
  const booking = {
    id: parseInt(nanoid()),
    userId: parseInt(req.userId!),
    roomId, 
    title,
    description,
    startDateTime,
    endDateTime,
    recurrence: {
        isRecurring,
        pattern,
        interval,
        daysOfWeek,
        dates,
        endDate
    },
    status,
    createdAt: new Date(),
    updatedAt: new Date(),

  };
// 
  db.data?.bookings.push(booking);
  await db.write();
  res.status(201).json(booking);
};