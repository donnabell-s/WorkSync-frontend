import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { User, Room, Booking, Preference, Log } from '../../server/types';
import { get } from 'http';
import { config } from 'process';

// Create axios instance with auth handling
const createApiClient = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: 'http://localhost:3001',
    });

    // Add request interceptor for auth token
    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token &&
            config.url &&
            !config.url.endsWith('/auth/login') &&
            !config.url.endsWith('/auth/signup')) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Add response interceptor for error handling
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401 &&
                window.location.pathname !== '/login' &&
                window.location.pathname !== '/signup') {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export const api = createApiClient();

// API Paths
export const API_PATHS = {
    AUTH: {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup',
        LOGOUT: '/auth/logout',
    },
    ROOMS: '/rooms',
    USERS: '/users/me',
    ADMINS: '/admins',
    USERS_LIST: '/users', 
    BOOKINGS: '/bookings',
    LOGS: {
        ROOM: '/logs/room',
        BOOKING: '/logs/booking'
    }

};

// Auth API
export const authApi = {
    login: (credentials: { email: string; password: string }) =>
        api.post<{
            token: string;
            user: User
        }>(API_PATHS.AUTH.LOGIN, credentials),

    signup: (userData: {
        fname: string;
        lname: string;
        email: string;
        password: string
    }) => api.post<{
        token: string;
        user: User
    }>(API_PATHS.AUTH.SIGNUP, userData),

    logout: () => {
        const token = localStorage.getItem('token');
        return api.post(
            API_PATHS.AUTH.LOGOUT,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
    },

    getCurrent: (): Promise<AxiosResponse<User>> =>
        api.get(API_PATHS.USERS)
};

// Rooms API
export const roomsApi = {
    getAll: async (config?: AxiosRequestConfig) => {
        try {
            const response = await api.get<Room[]>(API_PATHS.ROOMS, config);
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.error('Rooms not found:', error);
                return { data: [], status: 404, statusText: 'Not Found', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    },

    getById: async (id: string, config?: AxiosRequestConfig) => {
        try {
            const response = await api.get<Room>(`${API_PATHS.ROOMS}/${id}`, config);
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.error('Room not found:', error);
                return { data: null, status: 404, statusText: 'Not Found', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    },

    create: async (data: { room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'> }, config?: AxiosRequestConfig) => {
        try {
            const response = await api.post<Room>(API_PATHS.ROOMS, data, config);
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                console.error('Bad request:', error);
                return { data: null, status: 400, statusText: 'Bad Request', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    },

    update: async (id: string, data: { room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'> }, config?: AxiosRequestConfig) => {
        try {
            const response = await api.put<Room>(`${API_PATHS.ROOMS}/${id}`, data, config);
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                console.error('Bad request:', error);
                return { data: null, status: 400, statusText: 'Bad Request', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    },

    delete: async (id: string, config?: AxiosRequestConfig) => {
        try {
            const response = await api.delete(`${API_PATHS.ROOMS}/${id}`, config)
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.error('Room not found:', error);
                return { data: null, status: 404, statusText: 'Not Found', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    }
};

export const adminsApi = {
    getAll: async (config?: AxiosRequestConfig) => {
        try {
            const response = await api.get<User[]>(API_PATHS.ADMINS, config);
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.error('Admins not found:', error);
                return { data: [], status: 404, statusText: 'Not Found', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    },

    getById: async (id: string, config?: AxiosRequestConfig) => {
        try {
            const response = await api.get<User>(`${API_PATHS.ADMINS}/${id}`, config);
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.error('Admins not found:', error);
                return { data: null, status: 404, statusText: 'Not Found', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    },

    create: async (data: { admin: Omit<User, 'id' | 'createdAt' | 'updatedAt'> }, config?: AxiosRequestConfig) => {
        try {
            const response = await api.post<User>(API_PATHS.ADMINS, data, config);
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                console.error('Bad request:', error);
                return { data: null, status: 400, statusText: 'Bad Request', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    },

    update: async (id: string, data: { admin: Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'> }, config?: AxiosRequestConfig) => {
        try {
            const response = await api.put<User>(`${API_PATHS.ADMINS}/${id}`, data, config);
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                console.error('Bad request:', error);
                return { data: null, status: 400, statusText: 'Bad Request', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    },

    delete: async (id: string, config?: AxiosRequestConfig) => {
        try {
            const response = await api.delete(`${API_PATHS.ADMINS}/${id}`, config)
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.error('Admins not found:', error);
                return { data: null, status: 404, statusText: 'Not Found', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    }
};

//Bookings API
export const bookingsApi = {
    getAll: async (config?: AxiosRequestConfig) => {
        try {
            const response = await api.get<Booking[]>(API_PATHS.BOOKINGS, config);
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.error('Bookings not found:', error);
                return { data: [], status: 404, statusText: 'Not Found', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    },

    getById: (id: number, config?: AxiosRequestConfig) =>
        api.get<Booking>(`${API_PATHS.BOOKINGS}/${id}`, config),

    create: (
        data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>,
        config?: AxiosRequestConfig
    ) => api.post<Booking>(API_PATHS.BOOKINGS, data, config),

    update: (
        id: number,
        data: Partial<Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>>,
        config?: AxiosRequestConfig
    ) => api.put<Booking>(`${API_PATHS.BOOKINGS}/${id}`, data, config),
    delete: (id: string, config?: AxiosRequestConfig) =>
    api.delete(`${API_PATHS.BOOKINGS}/${id}`, config)
};

// Users API
export const usersApi = {
    getAllUsers: (config?: AxiosRequestConfig) =>
        api.get<User[]>(API_PATHS.USERS_LIST, config),

    getUserById: (id: string, config?: AxiosRequestConfig) =>
        api.get<User>(`${API_PATHS.USERS_LIST}/${id}`, config),
};

//Room Logs API
export const LogsApi = {
    getAllRoomLogs: async (config?: AxiosRequestConfig) => {
        try {
            const response = await api.get<Log[]>(API_PATHS.LOGS.ROOM, config);
            return response;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.error('Room Logs not found:', error);
                return { data: [], status: 404, statusText: 'Not Found', headers: {}, config: {}, request: {} };
            }
            throw error;
        }
    },
    create: (        
        data: Omit<Log, 'id' | 'timestamp'>,
        config?: AxiosRequestConfig) =>
        api.post<Room>(API_PATHS.LOGS.ROOM, data, config),
}


// Generic API functions (optional)
export const createApiFunctions = <T extends { id: string }>(endpoint: string) => ({
    getAll: (config?: AxiosRequestConfig) => api.get<T[]>(endpoint, config),
    getById: (id: string, config?: AxiosRequestConfig) =>
        api.get<T>(`${endpoint}/${id}`, config),
    create: (data: Omit<T, 'id'>, config?: AxiosRequestConfig) =>
        api.post<T>(endpoint, data, config),
    update: (id: string, data: Partial<T>, config?: AxiosRequestConfig) =>
        api.put<T>(`${endpoint}/${id}`, data, config),
    delete: (id: string, config?: AxiosRequestConfig) =>
        api.delete(`${endpoint}/${id}`, config),
});

