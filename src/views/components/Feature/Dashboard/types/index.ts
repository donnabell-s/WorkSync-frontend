// Types for dashboard components
export interface RoomData {
  number: string;
  name: string;
}

export interface RoomOccupancyData {
  [hour: number]: number;
}

export interface DailyOccupancyData {
  [room: string]: RoomOccupancyData;
}

export interface SampleDailyData {
  [dateKey: string]: DailyOccupancyData;
}

export interface WeeklyBookingData {
  day: string;
  bookings: number;
  utilization: number;
}

export interface SampleWeeklyData {
  [weekKey: string]: WeeklyBookingData[];
}

export interface RoomDataMap {
  [roomName: string]: RoomData;
}

// Chart configuration types
export interface ChartSeries {
  name: string;
  data: Array<{
    x: string;
    y: number;
  }>;
}

export interface TooltipStyleConfig {
  backgroundColor: string;
  border: string;
  borderRadius: string;
  boxShadow: string;
  padding: string;
  fontSize: string;
  color: string;
}