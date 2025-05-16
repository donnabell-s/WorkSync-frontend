export interface Booking {
    id: string;
    name: string;
    room: string;
    location: string;
    date: string;
    time: string;
    status: string;
}

export const bookingHistory: Booking[] = [
    {
        id: 'B001',
        name: 'John Smith',
        room: 'Meeting Room 1',
        location: 'HQ, Level 3',
        date: '2023-10-01',
        time: '10:00 AM - 11:00 AM',
        status: 'Completed',
    },
    {
        id: 'B002',
        name: 'Jane Doe',
        room: 'Conference Room B',
        location: 'HQ, Level 5',
        date: '2023-10-02',
        time: '1:00 PM - 2:00 PM',
        status: 'Cancelled',
    },
];

export const reservations: Booking[] = [
    {
        id: 'B003',
        name: 'Alice Johnson',
        room: 'Conference Room A',
        location: 'Branch 1, Level 5',
        date: '2023-10-05',
        time: '2:00 PM - 3:00 PM',
        status: 'Confirmed',
    },
    {
        id: 'B004',
        name: 'Bob Williams',
        room: 'Meeting Room 2',
        location: 'Branch 2, Level 2',
        date: '2023-10-06',
        time: '9:00 AM - 10:00 AM',
        status: 'Pending',
    },
];