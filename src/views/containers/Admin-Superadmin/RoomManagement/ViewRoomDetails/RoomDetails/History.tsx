import React, { useState } from 'react';
import SideNav from '../../../../../components/Layout/AdminSuperAdminLayout/SideNav';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import BookingTableRow from '../../../../../components/UI/BookingTableRow';
import { bookingHistory } from "../../../../../components/Feature";

const History: React.FC = () => {
    const [nav, setNav] = useState(false);

    const toggleNav = () => setNav(!nav);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1">
                <div className="p-6">
                    <AdminHeading label="BOOKING HISTORY" />
                    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-green divide-y divide-gray-10000">
                                {bookingHistory.map(booking => (
                                    <BookingTableRow
                                        name={booking.name}
                                        key={booking.id}
                                        id={booking.id}
                                        room={booking.room}
                                        location={booking.location}
                                        date={booking.date}
                                        time={booking.time}
                                        status={booking.status}
                                        statusColor={booking.status === 'Completed' ? 'text-green-600' : 'text-red-600'}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;