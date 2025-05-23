import { Request, Response, NextFunction  } from 'express';
import { getDB } from '../services/db.service';
import { nanoid } from 'nanoid';

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  const db = getDB();
  await db.read();
  if (!db.data?.users) {
    return res.status(404).json({ message: 'No user found' });
  }
  // Filter only users with role 'user'
  const users = db.data.users.filter(user => user.role === 'user');
  res.json(users);
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = getDB();
    await db.read();

    const user = db.data?.users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = getDB();
    await db.read();

    const userIndex = db.data?.users.findIndex(u => u.id === req.params.id);
    if (userIndex === undefined || userIndex < 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedFields = req.body;

    db.data!.users[userIndex] = {
      ...db.data!.users[userIndex],
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };

    await db.write();

    res.json(db.data!.users[userIndex]);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = getDB();
    await db.read();

    const userIndex = db.data?.users.findIndex(u => u.id === req.params.id);
    if (userIndex === undefined || userIndex < 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = db.data!.users.splice(userIndex, 1)[0];
    await db.write();

    res.json({ message: 'User deleted', user: deletedUser });
  } catch (error) {
    next(error);
  }
};