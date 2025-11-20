import { http } from '../api/http';
import { API } from '../api/endpoints';

// API Response wrapper
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

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

// Peak usage types
export interface PeakUsageItem {
    roomName: string;
    hour: number; // 0-23
    occupancyRate: number; // 0-100
}

// Complete dashboard data from optimized endpoint
export interface DashboardData {
    summary: DashboardSummary;
    trends: BookingTrendItem[];
    peakUsage: PeakUsageItem[];
    lastComputedAt: string;
    fromCache: boolean;
}

// Trend data response
export interface TrendData {
    trends: BookingTrendItem[];
    lastComputedAt: string;
    fromCache: boolean;
}

// Peak usage data response
export interface PeakUsageData {
    peakUsage: PeakUsageItem[];
    lastComputedAt: string;
    fromCache: boolean;
}

export const dashboardService = {
    /**
     * Get complete optimized dashboard data (summary + trends + peak usage)
     * Recommended: Use this for the main dashboard page to get all data in one request
     * @param date Optional date in yyyy-MM-dd format (defaults to today)
     */
    async getOptimizedDashboard(date?: string): Promise<DashboardData> {
        const params = date ? { date } : {};
        const { data } = await http.get<ApiResponse<DashboardData>>(API.DASHBOARD.OPTIMIZED_DASHBOARD, { params });
        return data.data; // Unwrap the ApiResponse wrapper
    },

    /**
     * Get dashboard summary only (KPI cards)
     * Use this if you only need summary metrics
     * @param date Optional date in yyyy-MM-dd format (defaults to today)
     */
    async getSummary(date?: string): Promise<DashboardSummary> {
        const dashboardData = await this.getOptimizedDashboard(date);
        return dashboardData.summary;
    },

    /**
     * Get booking trends over a date range
     * Optimized with caching for better performance
     * @param startDate Start date in yyyy-MM-dd format
     * @param endDate End date in yyyy-MM-dd format
     */
    async getBookingsTrend(startDate: string, endDate: string): Promise<BookingTrendItem[]> {
        const params = { startDate, endDate };
        const { data } = await http.get<ApiResponse<TrendData>>(API.DASHBOARD.OPTIMIZED_TREND, { params });
        return data.data.trends; // Unwrap and extract trends array
    },

    /**
     * Get booking trends with metadata (includes cache info)
     * @param startDate Start date in yyyy-MM-dd format
     * @param endDate End date in yyyy-MM-dd format
     */
    async getBookingsTrendWithMetadata(startDate: string, endDate: string): Promise<TrendData> {
        const params = { startDate, endDate };
        const { data } = await http.get<ApiResponse<TrendData>>(API.DASHBOARD.OPTIMIZED_TREND, { params });
        return data.data;
    },

    /**
     * Get peak usage heatmap data for a specific date
     * Optimized with caching for better performance
     * @param date Date in yyyy-MM-dd format (defaults to today)
     */
    async getPeakUsage(date?: string): Promise<PeakUsageItem[]> {
        const params = date ? { date } : {};
        const { data } = await http.get<ApiResponse<PeakUsageData>>(API.DASHBOARD.OPTIMIZED_PEAK_USAGE, { params });
        return data.data.peakUsage; // Unwrap and extract peakUsage array
    },

    /**
     * Get peak usage data with metadata (includes cache info)
     * @param date Date in yyyy-MM-dd format (defaults to today)
     */
    async getPeakUsageWithMetadata(date?: string): Promise<PeakUsageData> {
        const params = date ? { date } : {};
        const { data } = await http.get<ApiResponse<PeakUsageData>>(API.DASHBOARD.OPTIMIZED_PEAK_USAGE, { params });
        return data.data;
    },

    /**
     * Force recompute metrics for a specific date (SuperAdmin only)
     * @param date Date in yyyy-MM-dd format
     */
    async recomputeMetrics(date: string): Promise<void> {
        await http.post<ApiResponse<null>>(API.DASHBOARD.RECOMPUTE_METRICS, { date });
    },

    /**
     * Backfill historical metrics (SuperAdmin only)
     * @param startDate Start date in yyyy-MM-dd format
     * @param endDate End date in yyyy-MM-dd format
     */
    async backfillMetrics(startDate: string, endDate: string): Promise<void> {
        await http.post<ApiResponse<null>>(API.DASHBOARD.BACKFILL_METRICS, { startDate, endDate });
    },
};