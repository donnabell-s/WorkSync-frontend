import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { Data } from '../types';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const adapter = new JSONFile<Data>(path.join(__dirname, '../db.json'));
const db = new Low(adapter, { users: [], rooms: [], bookings: [], preferences: [], logs: {bookingLogs: [], roomLogs: []}, sessions: [] });

export const initializeDB = async () => {
  await db.read();
  if (!db.data) {
    db.data = { users: [], rooms: [], bookings: [], preferences: [], logs: {bookingLogs: [], roomLogs: []}, sessions: [] };
    await db.write();
  }
  return db;
};

export const getDB = () => db;