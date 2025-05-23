export interface Reservation {
    id: string;
    name: string;
    date: string;
    time: string;
    organizer: string;
    dateBooked: string;
    recurringBooking: boolean;
    notes: string;
    status: string;
}

export const reservations: Reservation[] = [
    {
        id: '1',
        name: 'Marketing Project Proposal',
        date: '2023-05-17',
        time: '10:00 AM - 11:30 AM',
        organizer: 'Jane Doe',
        dateBooked: 'May 15, 2022 | 3:28 PM',
        recurringBooking: false,
        notes: 'None',
        status: 'PENDING',
    },
    {
        id: '2',
        name: 'Marketing Daily Stand-up',
        date: '2023-05-21',
        time: '12:00 PM - 1:30 PM',
        organizer: 'John Doe',
        dateBooked: 'May 15, 2022 | 3:28 PM',
        recurringBooking: true,
        notes: 'None',
        status: 'PENDING',
    },
];