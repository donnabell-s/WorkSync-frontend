export interface Booking {
    id: string;
    name: string;
    date: string;
    time: string;
    organizer: string;
    dateBooked: string;
    recurringBooking: boolean;
    notes: string;
}

export const bookingHistory: Booking[] = [
    {
        id: 'B001',
        name: 'Leadership Training 1',
        date: '2022-05-09',
        time: '12:00 PM - 1:30 PM',
        organizer: 'John Doe',
        dateBooked: 'May 6, 2022 | 3:28 PM',
        recurringBooking: false,
        notes: 'None',
    },
    {
        id: 'B002',
        name: 'Leadership Training 2',
        date: '2022-05-10',
        time: '12:00 PM - 1:30 PM',
        organizer: 'John Doe',
        dateBooked: 'May 6, 2022 | 3:28 PM',
        recurringBooking: false,
        notes: 'None',
    },
    {
        id: 'B003',
        name: 'Leadership Training 3',
        date: '2022-05-11',
        time: '12:00 PM - 1:30 PM',
        organizer: 'John Doe',
        dateBooked: 'May 6, 2022 | 3:28 PM',
        recurringBooking: false,
        notes: 'None',
    },
];