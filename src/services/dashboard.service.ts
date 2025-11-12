import { http } from '../api/http';
import { API } from '../api/endpoints';

// Dashboard summary types
export interface DashboardSummary {
    availableRooms: number;
    roomsUnderMaintenance: number;
    todaysBookings: number;
    ongoingBookings: number;
    bookingsCompletedToday: number;
    utilizationRateToday: number;
}

// Booking trend types
export interface BookingTrendItem {
    date: string; // yyyy-MM-dd format
    bookingsCount: number;
    utilizationPercentage: number;
}

export interface BookingTrendRequest {
    startDate: string; // yyyy-MM-dd format
    endDate: string; // yyyy-MM-dd format
}

// Peak usage types
export interface PeakUsageItem {
    roomName: string;
    hour: number; // 0-23
    occupancyRate: number; // 0-100
}

export interface PeakUsageRequest {
    date: string; // yyyy-MM-dd format
}

export const dashboardService = {
    /**
     * Get dashboard summary (KPI cards)
     * @param date Optional date in yyyy-MM-dd format (defaults to today)
     */
    async getSummary(date?: string): Promise<DashboardSummary> {
        const params = date ? { date } : {};
        const { data } = await http.get<DashboardSummary>(API.DASHBOARD.SUMMARY, { params });
        return data;
    },

    /**
     * Get booking trends over a date range (GET method)
     * @param startDate Start date in yyyy-MM-dd format
     * @param endDate End date in yyyy-MM-dd format
     */
    async getBookingsTrend(startDate: string, endDate: string): Promise<BookingTrendItem[]> {
        const params = { startDate, endDate };
        const { data } = await http.get<BookingTrendItem[]>(API.DASHBOARD.BOOKINGS_TREND, { params });
        return data;
    },

    /**
     * Get booking trends over a date range (POST method)
     * @param request Object containing startDate and endDate
     */
    async postBookingsTrend(request: BookingTrendRequest): Promise<BookingTrendItem[]> {
        const { data } = await http.post<BookingTrendItem[]>(API.DASHBOARD.BOOKINGS_TREND_POST, request);
        return data;
    },

    /**
     * Get peak usage heatmap data for a specific date (GET method)
     * @param date Date in yyyy-MM-dd format (defaults to today)
     */
    async getPeakUsage(date?: string): Promise<PeakUsageItem[]> {
        const params = date ? { date } : {};
        const { data } = await http.get<PeakUsageItem[]>(API.DASHBOARD.PEAK_USAGE, { params });
        return data;
    },

    /**
     * Get peak usage heatmap data for a specific date (POST method)
     * @param request Object containing date
     */
    async postPeakUsage(request: PeakUsageRequest): Promise<PeakUsageItem[]> {
        const { data } = await http.post<PeakUsageItem[]>(API.DASHBOARD.PEAK_USAGE_POST, request);
        return data;
    },
};