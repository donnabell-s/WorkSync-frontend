import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { initializeDB, getDB } from './services/db.service';
import { signup, login, logout } from './controllers/auth.controller';
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } from './controllers/room.controller';
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking} from './controllers/booking.controller';
import { getRoomLog } from './controllers/log.controller';
import { getAdmins, getAdminById, addAdmin, updateAdmin, deleteAdmin } from './controllers/admin.controller';
import { getUserById, getUsers } from './controllers/user.controller';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

declare global {
  namespace Express {
    interface Request {
      user: string;
      userId?: string;
    }
  }
}

// Initialize database
initializeDB();

// Wrapper function for async controllers
function makeHandler(controller: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler {
  return async (req, res, next) => {
    try {
      console.log('Request:', req.method, req.path, req.body);
      await controller(req, res, next);
    } catch (err) {
      console.error('Handler Error:', err);
      next(err);
    }
  };
}

// Auth routes (unprotected)
app.post('/auth/signup', makeHandler(signup));
app.post('/auth/login', makeHandler(login));
app.post('/auth/logout', makeHandler(logout));

// Auth middleware
const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }

  const db = getDB();
  await db.read();
  const session = db.data?.sessions.find(s => s.id === token);
  if (!session) {
    res.status(401).send('Invalid token');
    return;
  }

  req.userId = session.userId;
  next();
};

// Apply auth middleware to all following routes
app.use(authMiddleware);



// Protected routes
app.post('/auth/logout', makeHandler(logout));
app.get('/users', makeHandler(getUsers));
app.get('/user/id',  makeHandler(getUserById));

app.get('/rooms', makeHandler(getRooms));
app.post('/rooms', makeHandler(createRoom));
app.get('/rooms/:id', makeHandler(getRoomById));
app.put('/rooms/:id', makeHandler(updateRoom));
app.delete('/rooms/:id', makeHandler(deleteRoom));

app.get('/admins', makeHandler(getAdmins));
app.post('/admins', makeHandler(addAdmin));
app.get('/admins/:id', makeHandler(getAdminById));
app.put('/admins/:id', makeHandler(updateAdmin));
app.delete('/admins/:id', makeHandler(deleteAdmin));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.get('/bookings', makeHandler(getBookings));
app.get('/bookings/id', makeHandler(getBookingById));
app.post('/bookings', makeHandler(createBooking));
app.put('/bookings/id', makeHandler(updateBooking));
app.delete('/bookings/id', makeHandler(deleteBooking));

app.get('/logs/room', makeHandler(getRoomLog))

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});