import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { initializeDB, getDB } from './services/db.service';
import { signup, login, logout } from './controllers/auth.controller';
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } from './controllers/room.controller';
import { getUserById, getUsers } from './controllers/user.controller';
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking} from './controllers/booking.controller';
import { getRoomLog } from './controllers/log.controller';
// import { getPosts, createPost } from './controllers/posts.controller';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend origin
  credentials: true // If using cookies/sessions
}));

declare global {
  namespace Express {
    interface Request {
      user: string; // make user required to match expected type
      userId?: string; // add userId if you use it elsewhere
    }
  }
}

// Initialize database
initializeDB();

// Wrapper function for login
function makeHandler(controller: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler {
  return (req, res, next) => {
    console.log('req body: ' + req.body);
    controller(req, res, next).catch(next);
  };
}

const loginHandler = makeHandler(login);
const signupHandler = makeHandler(signup);
const logoutHandler = makeHandler(logout);

// Auth routes
app.post('/auth/signup', signupHandler);
app.post('/auth/login', loginHandler);

// Auth middleware
const authMiddleware: RequestHandler = async (req, res, next) => {
  console.log(req.body);
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

  (req as any).userId = session.userId;
  next();
};

app.use(authMiddleware);



// Protected routes
app.post('/auth/logout', logoutHandler);
app.get('/users', makeHandler(getUsers));
app.get('/user/id',  makeHandler(getUserById));

app.get('/rooms', makeHandler(getRooms));
app.get('/rooms/:id', makeHandler(getRoomById));
app.post('/rooms', makeHandler(createRoom));
app.put('/rooms/id', makeHandler(updateRoom));
app.delete('/rooms/id', makeHandler(deleteRoom));

app.get('/bookings', makeHandler(getBookings));
app.get('/bookings/id', makeHandler(getBookingById));
app.post('/bookings', makeHandler(createBooking));
app.put('/bookings/id', makeHandler(updateBooking));
app.delete('/bookings/id', makeHandler(deleteBooking));

app.get('/logs/room', makeHandler(getRoomLog))

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});