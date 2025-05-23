import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { getDB } from '../services/db.service';
import { Data, User } from '../types';


const getUsers = async (_req: Request, res: Response) => {
    const db = getDB();
    await db.read();
    console.log('user: ' + db.data?.users[1]);
    if (!db.data?.users) {
        return res.status(404).json({ message: 'No user found' });
    }
    res.json(db.data.users);
};

export const getUserById = async (req: Request, res: Response) => {
    console.log("getUserById Controller")
    const db = getDB();
    const id = req.params.id;
    await db.read();
    const user = db.data?.users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
}

const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const db = getDB();
    const { fname, lname, email, password } = req.body;

    await db.read();
    console.log(db.data);
    if (db.data?.users.some(u => u.email === email)) {
      res.status(400).json({ error: 'Email exists' });
      return;
    }

    const user: User = {
      id: nanoid(),
      email,
      password: await bcrypt.hash(password, 10),
      fname,
      lname,
      role: 'user',
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const session = {
      id: nanoid(),
      userId: user.id,
      createdAt: new Date()
    };

    db.data?.sessions.push(session);
    db.data?.users.push(user);
    await db.write();
    
    res.status(201).json({ 
      token: session.id,
      user: {
        id: user.id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    next(error); // Pass the error to the next error-handling middleware
  }
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const db = getDB();
    const { email, password } = req.body;

    await db.read();
    const user = db.data?.users.find(u => u.email === email);
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const session = {
      id: nanoid(),
      userId: user.id,
      createdAt: new Date()
    };

    db.data?.sessions.push(session);
    await db.write();
    
    res.json({ 
      token: session.id,
      user: {
        id: user.id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    next(error); // Pass the error to the next error-handling middleware
  }
};

const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const db = getDB();
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(400).json({ error: 'No token provided' });
      return;
    }

    await db.read();
    const sessionIndex = db.data?.sessions.findIndex(s => s.id === token);

    if (sessionIndex === undefined || sessionIndex === -1) {
      res.status(401).json({ error: 'Invalid session' });
      return;
    }

    db.data?.sessions.splice(sessionIndex, 1);
    await db.write();
    console.log('Session deleted:', token);

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export { signup, login, logout, getUsers };