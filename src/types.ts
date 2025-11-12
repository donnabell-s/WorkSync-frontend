// Align with backend BookingsController result (camelCase)
export interface Booking {
    bookingId: number;
    userRefId?: number;
    roomId: string;
    title: string;
    description: string;
    startDatetime: string; // ISO datetime string
    endDatetime: string;   // ISO datetime string
    recurrence?: string | null; // JSON string
    status: string; // Pending, Approved, Declined
    expectedAttendees?: number;
    createdAt: string;
    updatedAt: string;
    room?: Room;
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
    roomId: string;
    name: string;
    code: string;
    seats?: number;
    location: string;
    level: string;
    sizeLabel: string; // Small, Medium, Large
    status: string; // Available, Occupied, Under Maintenance
    operatingHours?: string; // serialized JSON from backend
    imageUrl?: string;
    amenities: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface User {
    id: number;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// Minimal log type used by logs context until backend integration
export interface Log {
    bookingLogId?: number;
    bookingId?: number;
    eventType?: string;
    timestamp: string; // ISO datetime
    // generic fields for flexibility
    type?: string;
    entity?: string;
    entityId?: number | string;
    userId?: number | string;
    action?: string;
    message?: string;
}