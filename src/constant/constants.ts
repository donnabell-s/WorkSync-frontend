// ROUTER PATH
export const PATHS = {
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
            path: "/rooms/view",
            label: "View Rooms"
        },
        CALENDAR: {
            path: "/rooms/calendar",
            label: "Booking Calendar"
        },
        HISTORY: {
            path: "/rooms/history",
            label: "Booking History"
        },
        RESERVATIONS: {
            path: "/rooms/reservations",
            label: "Booking Reservations"
        },
        ADD: {
            path: "/rooms/add",
            label: "Add Room"
        },
        EDIT: {
            path: "/rooms/edit",
            label: "Edit Room"
        },
        DELETE: {
            path: "/rooms/delete",
            label: "Delete Room"
        },
    },
    BOOKING_MGNT: {
        VIEW: {
            path: "/bookings/view",
            label: "View Bookings"
        },
        VIEW_APPROVED: {
            path: "/bookings/approved-view",
            label: "View Approved Booking"
        },
        ADD: {
            path: "/bookings/add",
            label: "Add Booking"
        },
        EDIT: {
            path: "/bookings/edit",
            label: "Edit Booking"
        },
        CANCEL: {
            path: "/bookings/cancel",
            label: "Cancel Booking"
        },
        MODAL: {
            path: "/bookings/modal",
            label: "Modal"
        },
    },
    ADMIN_MGNT: {
        VIEW: {
            path: "/admins/view",
            label: "View Admins"
        },
        ADD: {
            path: "/admins/add",
            label: "Add Admin"
        },
        EDIT: {
            path: "/admins/edit",
            label: "Edit Admin"
        },
    },
    USER_MGNT: {
        VIEW: {
            path: "/users/view",
            label: "View Users"
        },
        ADD: {
            path: "/users/add",
            label: "Add User"
        },
        EDIT: {
            path: "/users/edit",
            label: "Edit User"
        },
    },
    USER_VIEW: {
        HOME: {
            path: "/home",
            label: "Home Page"
        },
        ROOM_EXPLORER: {
            path: "/room-explorer",
            label: "Room Explorer"
        },
        BOOKINGS: {
            path: "/my-bookings",
            label: "My Bookings"
        },
        BOOK: {
            path: "/book-room",
            label: "Book Room"
        },
        BOOKING_DETAIL: {
            path: "/booking-detail",
            label: "Booking Detail"
        },
        ACCOUNT: {
            path: "/account",
            label: "Account"
        },
        PREFERENCES: {
            path: "/preferences",
            label: "Preferences"
        },
    },
    ADMIN_VIEW: {
        DASHBOARD: {
            path: "/dashboard",
            label: "Dashboard"
        },
        NOTIFICATION: {
            path: "/admin-notification",
            label: "Notifications"
        },
    },
    LOGS: {
        ROOMS: {
            path: "/logs/rooms",
            label: "Room Logs"
        },
        BOOKINGS: {
            path: "/logs/bookings",
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