// import { Request, Response } from 'express';
// import { getDB } from '../services/db.service';
// import { AuthRequest } from '../types';

// export const getRooms = async (req: AuthRequest, res: Response) => {
//   const db = getDB();
//   await db.read();
//   res.json(db.data?.rooms ?? []);
// };

// export const createRoom = async (req: AuthRequest, res: Response) => {
//   const db = getDB();
//   const { title } = req.body;
  
//   await db.read();
//   const room = {
//     id: nanoid(),
//     title,
//     userId: req.userId!,
//     createdAt: new Date().toISOString()
//   };
// // 
//   db.data?.rooms.push(room);
//   await db.write();
//   res.status(201).json(room);
// };