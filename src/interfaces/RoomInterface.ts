export interface RoomInterface {
    id: number;
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