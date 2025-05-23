export interface Booking {
    id: number;
    userId: number; // ID of the user who made the booking
    roomId: string; // ID of the booked room
    title: string; // Title of the booking
    description: string; // Description of the booking
    startDateTime: Date; // Start date and time of the booking
    endDateTime: Date; // End date and time of the booking
    recurrence: {
        isRecurring: boolean; // Indicates if the booking is recurring
        pattern?: string; // e.g., "daily", "weekly", "monthly"
        interval?: number; // Interval for the recurrence (e.g., every 2 weeks)
        daysOfWeek?: number[]; // Array of days for weekly recurrence (0 = Sunday, 6 = Saturday)
        dates?: Date[]; // Specific dates for the booking if not recurring
        endDate?: Date; // End date for the recurrence
    };
    status: string; // e.g., "Confirmed", "Cancelled", "Completed"
    createdAt: Date; // Timestamp when the booking was created
    updatedAt: Date; // Timestamp when the booking was last updated
}

export interface Preference {
    id: number;
    userId: number;
    preferences: {
        bookingEmailConfirm: boolean;
        cancellationNotif: boolean;
        reminders: {
            bookingReminder: boolean;
            notif: {
                time: number;
                unit: string; // e.g., "minutes", "hours", "days"
            };
        };
        bookingDefaultDuration: number; // in minutes
    };
}

export interface Room {
    id: string;
    name: string;
    code: string;
    seats: number;
    location: string;
    level: number;
    size: string; // e.g., "Small", "Medium", "Large"
    status: string; // e.g., "Available", "Booked", "Under Maintenance"
    operatingHours: {
        weekdays: {
            open: string; // e.g., "09:00"
            close: string; // e.g., "17:00"
        };
        weekends: {
            open: string; // e.g., "10:00"
            close: string; // e.g., "16:00"
        };
    };
    amenities: string[];
    createdAt: Date; // Timestamp when the room was created
    updatedAt: Date; // Timestamp when the room was last updated
}

export interface User {
    id: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    createdAt: Date; // Timestamp when the user was created
    updatedAt: Date; // Timestamp when the user was last updated
}

export interface Log {
    id: number;
    roomId: number;
    userId: string;
    eventType: string; // e.g., "Room Created", "Room Updated", "Room Deleted"
    currentStatus: string; // e.g., "available", "booked", "under maintenance"
    timestamp: string; // ISO 8601 format
}

export interface Session {
    id: string;
    userId: string;
    createdAt: Date;
};

export type Data = {
    users: User[];
    preferences: Preference[];
    rooms: Room[];
    bookings: Booking[];
    bookingLogs: Log[];
    roomLogs: Log[];
    sessions: Session[];
};