import React, { useState } from 'react';
import SideNav from '../../../../../components/Layout/AdminSuperAdminLayout/SideNav';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import BookingTableRow from '../../../../../components/UI/BookingTableRow';
import { reservations } from "../../../../../components/Feature";

const Reservations: React.FC = () => {
    const [nav, setNav] = useState(false);

    const toggleNav = () => setNav(!nav);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1">
                <div className="p-6">
                    <AdminHeading label="RESERVATIONS" />
                    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reservations.map(reservation => (
                                    <BookingTableRow
                                        key={reservation.id}
                                        id={reservation.id}
                                        name={reservation.name}
                                        room={reservation.room}
                                        location={reservation.location}
                                        date={reservation.date}
                                        time={reservation.time}
                                        status={reservation.status}
                                        statusColor={reservation.status === 'Completed' ? 'text-green-600' : reservation.status === 'Upcoming' ? 'text-yellow-600' : 'text-red-600'}
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

export default Reservations;