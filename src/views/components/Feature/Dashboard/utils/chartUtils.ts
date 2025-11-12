import type { ChartSeries, DailyOccupancyData } from '../types';
import { roomData, hours } from '../data';

export const generateSeriesData = (
  currentRooms: string[], // Array of room names to display
  dataSource: DailyOccupancyData // Daily occupancy data source
): ChartSeries[] => {
  return currentRooms.map(room => ({
    name: roomData[room]?.number || room,
    data: hours.map((hour) => ({
      x: `${hour}:00`,
      y: dataSource[room]?.[hour] || 0
    }))
  }));
};

export const getPaginatedRooms = (
  rooms: string[], // All available rooms
  currentPage: number, // Current page number (0-indexed)
  roomsPerPage: number // Number of rooms per page
) => {
  const totalPages = Math.ceil(rooms.length / roomsPerPage);
  const startIndex = currentPage * roomsPerPage;
  const endIndex = startIndex + roomsPerPage;
  const currentRooms = rooms.slice(startIndex, endIndex);

  return {
    currentRooms,
    totalPages,
    startIndex,
    endIndex
  };
};

export const findRoomNameByNumber = (
    roomNumber: string // Room number to lookup
): string => {
  const roomEntry = Object.entries(roomData).find(([, data]) => data.number === roomNumber);
  return roomEntry ? roomEntry[1].name : roomNumber;
};