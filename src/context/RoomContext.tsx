import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room } from '../../server/types';
import { roomsApi } from '../api/client';

interface RoomContextType {
  rooms: Room[];
  currentRoom: Room | null;
  isLoading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
  getRoomById: (id: string) => Promise<void>;
  addRoom: (room: Omit<Room, 'id'>) => Promise<void>;
  updateRoom: (id: string, room: Partial<Room>) => Promise<void>;
  deleteRoom: (id: string) => Promise<void>;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const response = await roomsApi.getAll();
      console.log('Fetched rooms:', response.data);
      setRooms(response.data);
    } catch (err) {
      setError('Failed to fetch rooms');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoomById = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await roomsApi.getById(id);
      setCurrentRoom(response.data);
      console.log("room id",response.data.id)
    } catch (err) {
      setError('Room not found');
    } finally {
      setIsLoading(false);
    }
  };

  const addRoom = async (room: Omit<Room, 'id'>) => {
    setIsLoading(true);
    try {
      const response = await roomsApi.create({ room });
      setRooms(prev => [...prev, response.data]);
    } catch (err) {
      setError('Failed to add room');
    } finally {
      setIsLoading(false);
    }
  };

  const updateRoom = async (id: string, room: Partial<Room>) => {
    setIsLoading(true);
    try {
      const response = await roomsApi.update(id, { room });
      setRooms(prev => prev.map(r => r.id === id ? response.data : r));
      setCurrentRoom(response.data);
    } catch (err) {
      setError('Failed to update room');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRoom = async (id: string) => {
    setIsLoading(true);
    try {
      await roomsApi.delete(id);
      setRooms(prev => prev.filter(r => r.id !== id));
      setCurrentRoom(null);
    } catch (err) {
      setError('Failed to delete room');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <RoomContext.Provider value={{
      rooms,
      currentRoom,
      isLoading,
      error,
      fetchRooms,
      getRoomById,
      addRoom,
      updateRoom,
      deleteRoom
    }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRooms = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRooms must be used within a RoomProvider');
  }
  return context;
};