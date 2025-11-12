export const API = {
  AUTH: {
    LOGIN: '/api/Account/Login',
    SIGNUP: '/api/Account/Register',
    LOGOUT: '/api/Account/SignOutUser',
    // no explicit ME endpoint in backend; derive from token or add later if needed
  },
  // Account management (admin)
  ACCOUNT: {
    GET_USERS: '/api/Account/GetUsers',
    GET_ADMINS: '/api/Account/GetAdmins',
    CREATE_USER: '/api/Account/CreateUser',
    UPDATE_USER: (id: string | number) => `/api/Account/UpdateUser/${id}`,
    DELETE_USER: (id: string | number) => `/api/Account/DeleteUser/${id}`,
  },
  ROOMS: {
    GET: '/api/Rooms/Get',
    GET_BY_ID: (id: string) => `/api/Rooms/Get/${id}`,
    POST: '/api/Rooms/Post',
    PUT: (id: string) => `/api/Rooms/Put/${id}`,
    DELETE: (id: string) => `/api/Rooms/Delete/${id}`,
  },
  BOOKINGS: {
    GET: '/api/Bookings/Get',
    GET_BY_ID: (id: string | number) => `/api/Bookings/Get/${id}`,
    POST: '/api/Bookings/Post',
    PUT: (id: string | number) => `/api/Bookings/Put/${id}`,
    DELETE: (id: string | number) => `/api/Bookings/Delete/${id}`,
    APPROVE: (id: string | number) => `/api/Bookings/Approve/${id}`,
    DECLINE: (id: string | number) => `/api/Bookings/Decline/${id}`,
  },
  LOGS: {
    BOOKING_LOGS: {
      GET: '/api/BookingLogs/Get',
      GET_BY_BOOKING: (bookingId: string | number) => `/api/BookingLogs/GetByBooking/${bookingId}`,
      GET_BY_ID: (id: string | number) => `/api/BookingLogs/Get/${id}`,
      POST: '/api/BookingLogs/Post',
      DELETE: (id: string | number) => `/api/BookingLogs/Delete/${id}`,
    },
  },
    DASHBOARD: {
        SUMMARY: '/api/Dashboard/Summary',
        BOOKINGS_TREND: '/api/Dashboard/BookingsTrend',
        BOOKINGS_TREND_POST: '/api/Dashboard/BookingsTrendPost',
        PEAK_USAGE: '/api/Dashboard/PeakUsage',
        PEAK_USAGE_POST: '/api/Dashboard/PeakUsagePost',
    },
} as const;

export type ApiPaths = typeof API;