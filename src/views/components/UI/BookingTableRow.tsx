import React from 'react';

interface BookingTableRowProps {
    name: string;
    id: string;
    room: string;
    location: string;
    date: string;
    time: string;
    status: string;
    statusColor: string; 
}

const BookingTableRow: React.FC<BookingTableRowProps> = ({ id, name, room, location, date, time, status, statusColor }) => {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{time}</td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm ${statusColor}`}>{status}</td>
        </tr>
    );
};

export default BookingTableRow;