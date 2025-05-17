export interface BookingInterface {
    id: number;
    userId: number; // ID of the user who made the booking
    roomId: number; // ID of the booked room
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