export interface PreferenceInterface {
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