export interface BookingInfo {
    roomCode: string;
    user: string;
    period: string;
    status: 'upcoming' | 'completed' | 'cancelled';
}

export const bookingSummaryList: BookingInfo[] = [
    {
        roomCode: "A101",
        user: "Alice Wong",
        period: "01-Jun-2024 09:00 - 11:00",
        status: "upcoming"
    },
    {
        roomCode: "B202",
        user: "Bob Smith",
        period: "02-Jun-2024 13:00 - 15:00",
        status: "completed"
    },
    {
        roomCode: "C303",
        user: "Carol Jones",
        period: "03-Jun-2024 10:00 - 12:00",
        status: "cancelled"
    },
    {
        roomCode: "D404",
        user: "David Lee",
        period: "04-Jun-2024 14:00 - 16:00",
        status: "upcoming"
    },
    {
        roomCode: "E505",
        user: "Emma Brown",
        period: "05-Jun-2024 08:00 - 10:00",
        status: "completed"
    },
    {
        roomCode: "F606",
        user: "Frank Green",
        period: "06-Jun-2024 11:00 - 13:00",
        status: "upcoming"
    },
    {
        roomCode: "G707",
        user: "Grace Hall",
        period: "07-Jun-2024 15:00 - 17:00",
        status: "cancelled"
    },
    {
        roomCode: "H808",
        user: "Henry King",
        period: "08-Jun-2024 12:00 - 14:00",
        status: "completed"
    },
    {
        roomCode: "I909",
        user: "Isabel Moore",
        period: "09-Jun-2024 16:00 - 18:00",
        status: "upcoming"
    },
    {
        roomCode: "J010",
        user: "Jack Nelson",
        period: "10-Jun-2024 09:00 - 11:00",
        status: "completed"
    },
    {
        roomCode: "K111",
        user: "Karen Owen",
        period: "11-Jun-2024 13:00 - 15:00",
        status: "cancelled"
    },
    {
        roomCode: "L212",
        user: "Leo Perez",
        period: "12-Jun-2024 10:00 - 12:00",
        status: "upcoming"
    },
    {
        roomCode: "M313",
        user: "Mia Quinn",
        period: "13-Jun-2024 14:00 - 16:00",
        status: "completed"
    },
    {
        roomCode: "N414",
        user: "Noah Ross",
        period: "14-Jun-2024 08:00 - 10:00",
        status: "upcoming"
    },
    {
        roomCode: "O515",
        user: "Olivia Smith",
        period: "15-Jun-2024 11:00 - 13:00",
        status: "cancelled"
    },
    {
        roomCode: "P616",
        user: "Paul Taylor",
        period: "16-Jun-2024 15:00 - 17:00",
        status: "completed"
    },
    {
        roomCode: "Q717",
        user: "Quinn Underwood",
        period: "17-Jun-2024 12:00 - 14:00",
        status: "upcoming"
    },
    {
        roomCode: "R818",
        user: "Rachel Vasquez",
        period: "18-Jun-2024 16:00 - 18:00",
        status: "completed"
    },
    {
        roomCode: "S919",
        user: "Sam Wilson",
        period: "19-Jun-2024 09:00 - 11:00",
        status: "cancelled"
    },
    {
        roomCode: "T020",
        user: "Tina Xu",
        period: "20-Jun-2024 13:00 - 15:00",
        status: "upcoming"
    }
]
