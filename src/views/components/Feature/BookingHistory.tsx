export interface Booking {
    id: string;
    name: string;
    room: string;
    location: string;
    date: string;
    time: string;
    status: string;
    organizer: string;
    dateBooked: string;
    recurringBooking: string;
    notes: string;
}
export const bookingHistory: Booking[] = [
    {
        id: 'B001',
        name: 'John Doe',
        room: 'Meeting Room 1', // Inferred
        location: 'HQ, Level 3', // Inferred
        date: '2022-05-09',
        time: '12:00 PM - 1:00 PM',
        status: 'Completed', // Assumed
        organizer: 'John Doe',
        dateBooked: 'May 6, 2022 | 3:28 PM',
        recurringBooking: 'No',
        notes: 'None',
    },
    {
        id: 'B002',
        name: 'John Doe',
        room: 'Meeting Room 2', // Inferred
        location: 'HQ, Level 3', // Inferred
        date: '2022-05-10',
        time: '12:00 PM - 1:00 PM',
        status: 'Completed', // Assumed
        organizer: 'John Doe',
        dateBooked: 'May 6, 2022 | 3:28 PM',
        recurringBooking: 'No',
        notes: 'None',
    },
    {
        id: 'B003',
        name: 'John Doe',
        room: 'Meeting Room 3', // Inferred
        location: 'HQ, Level 3', // Inferred
        date: '2022-05-11',
        time: '12:00 PM - 1:00 PM',
        status: 'Completed', // Assumed
        organizer: 'John Doe',
        dateBooked: 'May 6, 2022 | 3:28 PM',
        recurringBooking: 'No',
        notes: 'None',
    },
];
export default bookingHistory;