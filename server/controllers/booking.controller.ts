import { Request, Response } from 'express';
import { getDB } from '../services/db.service';
import { nanoid } from 'nanoid';
import { Booking } from '../types';

export const getBookings = async (_req: Request, res: Response) => {
    const db = getDB();
    await db.read();
    console.log('bookings: ' + db.data?.bookings[1]);
    if (!db.data?.bookings) {
        return res.status(404).json({ message: 'No bookings found' });
    }
    res.json(db.data.bookings);
};

export const createBooking = async (req: Request, res: Response) => {
  const db = getDB();
  await db.read();

  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized: missing user ID' });
  }

  const {
    userId: bodyUserId,
    roomId,
    title,
    description,
    startDateTime,
    endDateTime,
    isRecurring,
    pattern,
    interval,
    daysOfWeek,
    dates,
    endDate,
    status
  } = req.body;

  // Prefer authenticated userId, fallback to body userId if any (convert to number)
  const userId = req.userId ? Number(req.userId) : Number(bodyUserId);

  // Generate next numeric booking id
  const nextId =
    db.data!.bookings.length > 0
      ? Math.max(...db.data!.bookings.map((b: any) => Number(b.id))) + 1
      : 1;

  const booking: Booking = {
    id: nextId,
    userId,
    roomId,
    title,
    description,
    startDateTime: new Date(startDateTime),
    endDateTime: new Date(endDateTime),
    recurrence: {
      isRecurring,
      pattern,
      interval,
      daysOfWeek,
      dates: dates?.map((d: string) => new Date(d)),
      endDate: endDate ? new Date(endDate) : undefined,
    },
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.data!.bookings.push(booking);
  await db.write();

  res.status(201).json({ message: 'Booking created successfully', booking });
};


export const getBookingById = async (req: Request, res: Response) => {
    const db = getDB();
    const bookingId = req.params.id;
    await db.read();
    const booking = db.data?.bookings.find((booking) => String(booking.id) === bookingId);
    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
};

export const updateBooking = async (req: Request, res: Response) => {
    const db = getDB();
    await db.read();
    const bookingId = req.params.id;
    const booking = db.data?.bookings.find((booking) => String(booking.id) === bookingId);
    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }
    const {
        title,
        roomId,
        description,
        startDateTime,
        endDateTime,
        isRecurring,
        pattern,
        interval,
        daysOfWeek,
        dates,
        endDate,
        status
    } = req.body;

    booking.title = title;
    booking.roomId = roomId;
    booking.description = description;
    booking.startDateTime = startDateTime;
    booking.endDateTime = endDateTime;
    booking.recurrence.isRecurring = isRecurring;
    booking.recurrence.pattern = pattern;
    booking.recurrence.interval = interval;
    booking.recurrence.daysOfWeek = daysOfWeek;
    booking.recurrence.dates = dates;
    booking.recurrence.endDate = endDate;
    booking.status = status;

    db.data?.bookings.push(booking);
    await db.write();
    res.status(201).json({ message: 'Booking updated successfully', booking });
};

export const deleteBooking = async (req: Request, res: Response) => {
    const db = getDB();
    await db.read();
    const bookingId = req.params.id;
    const bookingIndex = db.data?.bookings.findIndex((booking) => String(booking.id) === bookingId);
    if (bookingIndex === undefined || bookingIndex === -1) {
        return res.status(404).json({ message: 'Booking not found' });
    }
    db.data?.bookings.splice(bookingIndex, 1);
    await db.write();
    res.status(200).json({ message: 'Booking deleted successfully' });
};
