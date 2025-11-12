import type { ChartSeries, DailyOccupancyData } from '../types';

// These utilities are no longer used since we switched to real API data
// Keeping them here for reference or potential future use

export const generateSeriesData = (
  currentRooms: string[], // Array of room names to display
  dataSource: DailyOccupancyData // Daily occupancy data source
): ChartSeries[] => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return currentRooms.map(room => ({
    name: room,
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
  // Since we no longer have static room data, return the room number as is
  return roomNumber;
};