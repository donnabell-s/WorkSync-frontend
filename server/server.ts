import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { initializeDB, getDB } from './services/db.service';
import { signup, login, logout } from './controllers/auth.controller';
// import { getRooms, createRoom } from './controllers/room.controller';
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

const signupHandler: RequestHandler = (req, res, next) => {
  console.log(req.body);
  signup(req, res, next).catch(next);
};
// Wrapper function for login
const loginHandler: RequestHandler = (req, res, next) => {
  console.log(req.body);
  login(req, res, next).catch(next);
};

const logoutHandler: RequestHandler = (req, res, next) => {
  console.log(req.body);
  logout(req, res, next).catch(next);
};

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
// app.get('/rooms', (getRooms as any) as express.RequestHandler);
// app.post('/rooms', (createRoom as any) as express.RequestHandler);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});