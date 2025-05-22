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

// Get booking by ID
export const getBookingById = async (req: Request, res: Response) => {
  const db = getDB();
  await db.read();

  const bookingId = Number(req.params.id);
  const booking = db.data?.bookings.find(b => b.id === bookingId);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  res.json(booking);
};

// Update booking by ID
export const updateBooking = async (req: Request, res: Response) => {
  const db = getDB();
  await db.read();

  const bookingId = Number(req.params.id);
  const bookingIndex = db.data?.bookings.findIndex(b => b.id === bookingId);

  if (bookingIndex === undefined || bookingIndex < 0) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  const updatedData = req.body;
  // Optional: validate fields here

  db.data!.bookings[bookingIndex] = {
    ...db.data!.bookings[bookingIndex],
    ...updatedData,
    updatedAt: new Date(),
  };

  await db.write();

  res.json(db.data!.bookings[bookingIndex]);
};

