import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { User, Room, Booking, Preference } from '../../server/types';
import { get } from 'http';

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
    USERS_LIST: '/users', 
    BOOKINGS: '/bookings',

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

    getById: (id: string, config?: AxiosRequestConfig) =>
        api.get<Room>(`${API_PATHS.ROOMS}/${id}`, config),

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

    update: (id: string, data: { room: Partial<Room> }, config?: AxiosRequestConfig) =>
        api.put<Room>(`${API_PATHS.ROOMS}/${id}`, data, config),

    delete: (id: string, config?: AxiosRequestConfig) =>
        api.delete(`${API_PATHS.ROOMS}/${id}`, config)
};

//Bookings API
export const bookingsApi = {
    getAll: (config?: AxiosRequestConfig) =>
        api.get<Booking[]>(API_PATHS.BOOKINGS, config),

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
};

// Users API
export const usersApi = {
    getAllUsers: (config?: AxiosRequestConfig) =>
        api.get<User[]>(API_PATHS.USERS_LIST, config),

    getUserById: (id: string, config?: AxiosRequestConfig) =>
        api.get<User>(`${API_PATHS.USERS_LIST}/${id}`, config),

    updateUser: (id: string, data: Partial<User>, config?: AxiosRequestConfig) =>
        api.put<User>(`${API_PATHS.USERS_LIST}/${id}`, data, config),
};




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

