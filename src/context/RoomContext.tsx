import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room } from '../types';
import { roomsService } from '../services/rooms.service';
import { useAuth } from './AuthContext';
import { useCallback } from "react";

interface RoomContextType {
  rooms: Room[];
  currentRoom: Room | null;
  isLoading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
  getRoomById: (id: string) => Promise<void>;
  addRoom: (room: Omit<Room, "roomId" | "createdAt" | "updatedAt">, file?: File | null) => Promise<void>;
  updateRoom: (id: string, room: Omit<Room, 'roomId' | 'createdAt' | 'updatedAt'>, file?: File | null) => Promise<void>;
  deleteRoom: (id: string) => Promise<void>;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // const fetchRooms = async () => {
  //   setIsLoading(true);
  //   try {
  //     console.log("Tesxt")
  //     const response = await roomsApi.getAll();
  //     console.log('Fetched rooms:', response.data);
  //     setRooms(response.data);
  //     console.log('Fetched rooms:', rooms);
  //   } catch (err) {
  //     setError('Failed to fetch rooms');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const getRoomById = async (id: string) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await roomsApi.getById(id);
  //     console.log('Fetched room by ID:', response.data);
  //     setCurrentRoom(response.data);
  //     console.log("room id",response.data.id)
  //   } catch (err) {
  //     setError('Room not found');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

// Inside your context or component
  const fetchRooms = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await roomsService.getAll();
      setRooms(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRoomById = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const data = await roomsService.getById(id);
      setCurrentRoom(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addRoom = async (room: Omit<Room, "roomId" | "createdAt" | "updatedAt">, file?: File | null) => {
    setIsLoading(true);
    try {
      const created = await roomsService.create(room, file ?? undefined);
      setRooms(prev => [...prev, created]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRoom = async (id: string, room: Omit<Room, 'roomId' | 'createdAt' | 'updatedAt'>, file?: File | null) => {
    setIsLoading(true);
    try {
      const updated = await roomsService.update(id, room as any, file ?? undefined);
  setRooms(prev => prev.map(r => (String(r.roomId) === String(id) ? updated : r)));
      setCurrentRoom(updated);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRoom = async (id: string) => {
    setIsLoading(true);
    try {
      await roomsService.remove(id);
  setRooms(prev => prev.filter(r => String(r.roomId) !== String(id)));
      setCurrentRoom(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

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