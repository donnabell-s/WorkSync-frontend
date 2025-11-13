// ROUTER PATH
export const PATHS = {
    // URLs for admin pages always start with "/admin"
    ADMIN_MAIN: {
        path: "/admin",
        label: "Admin Main"
    },
    // URLs for user pages always start with "/user"
    USER_MAIN: {
        path: "/user",
        label: "User Main"
    },
    LOGIN: {
        path: "/login",
        label: "Login"
    },
    SIGNUP: {
        path: "/signup",
        label: "Sign Up"
    },
    FORGOT_PASS: {
        path: "/forgot-password",
        label: "Forgot Password"
    },
    RESET_PASS: {
        path: "/reset-password",
        label: "Reset Password"
    },
    UNAUTHORIZED: {
        path: "/unauthorized",
        label: "Unauthorized"
    },
    LOGOUT: {
        path: "/logout",
        label: "Logout"
    },
    NOT_FOUND: {
        path: "*",
        label: "Not Found"
    },
    ROOM_MGNT: {
        VIEW: {
            path: "rooms/view",
            label: "View Rooms"
        },
        DETAIL: {
            path: "rooms/room-detail",
            label: "Room Detail"
        },
        ADD: {
            path: "rooms/add",
            label: "Add Room"
        },
        EDIT: {
            path: "rooms/edit",
            label: "Edit Room"
        },
        DELETE: {
            path: "rooms/delete",
            label: "Delete Room"
        },
    },
    BOOKING_MGNT: {
        VIEW: {
            path: "bookings/view",
            label: "View Bookings"
        },
        DETAIL: {
            path: "bookings/booking-detail",
            label: "Booking Detail"
        },
        ADD: {
            path: "bookings/add",
            label: "Add Booking"
        },
        EDIT: {
            path: "bookings/edit",
            label: "Edit Booking"
        },
        CANCEL: {
            path: "bookings/cancel",
            label: "Cancel Booking"
        },
    },
    ADMIN_MGNT: {
        VIEW: {
            path: "admins/view",
            label: "View Admins"
        },
        ADD: {
            path: "admins/add",
            label: "Add Admin"
        },
        EDIT: {
            path: "admins/edit",
            label: "Edit Admin"
        },
    },
    USER_MGNT: {
        VIEW: {
            path: "users/view",
            label: "View Users"
        },
        ADD: {
            path: "users/add",
            label: "Add User"
        },
        EDIT: {
            path: "users/edit",
            label: "Edit User"
        },
    },
    USER_VIEW: {
        HOME: {
            path: "home",
            label: "Home Page"
        },
        ROOM_EXPLORER: {
            path: "room-explorer",
            label: "Room Explorer"
        },
        BOOKINGS: {
            path: "my-bookings",
            label: "My Bookings"
        },
        BOOK: {
            path: "book-room",
            label: "Book Room"
        },
        EDIT: {
            path: "view-booking",
            label: "View Booking"
        },
        SETTINGS: {
            path: "settings",
            label: "Settings"
        },
    },
    ADMIN_VIEW: {
        DASHBOARD: {
            path: "dashboard",
            label: "Dashboard"
        },
        NOTIFICATION: {
            path: "notifications",
            label: "Notifications"
        },
    },
    LOGS: {
        ROOMS: {
            path: "logs/rooms",
            label: "Room Logs"
        },
        BOOKINGS: {
            path: "logs/bookings",
            label: "Booking Logs"
        },
    },
    // Add more routes here
};

// SIDE BAR MENU PATH
export const USER_NAV_MENU = [
    {
        path: "/home",
        label: "Home Page"
    },
    {
        path: "/room-explorer",
        label: "Room Explorer"
    },
    {
        path: "/my-bookings",
        label: "My Bookings"
    },
];

export const SUPERADMIN_MENU = [
    {
        path: "/dashboard",
        label: "Dashboard"
    },
    {
        path: "/admin-notification",
        label: "Notifications"
    },
    {
        path: "/rooms/view",
        label: "View Rooms"
    },
    {
        path: "/bookings/view",
        label: "View Bookings"
    },
    {
        path: "/logs/rooms",
        label: "Room Logs"
    },
    {
        path: "/logs/bookings",
        label: "Booking Logs"
    },
    {
        path: "/admins/view",
        label: "View Admins"
    },
    {
        path: "/users/view",
        label: "View Users"
    },
];

export const ADMIN_MENU = [
    {
        path: "/dashboard",
        label: "Dashboard"
    },
    {
        path: "/admin-notification",
        label: "Notifications"
    },
    {
        path: "/rooms/view",
        label: "View Rooms"
    },
    {
        path: "/bookings/view",
        label: "View Bookings"
    },
    {
        path: "/logs/rooms",
        label: "Room Logs"
    },
    {
        path: "/logs/bookings",
        label: "Booking Logs"
    },
    {
        path: "/users/view",
        label: "View Users"
    },
];