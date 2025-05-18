import React, { useState } from 'react';
import SideNav from '../../../../../components/Layout/AdminSuperAdminLayout/SideNav';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import BookingTableRow from '../../../../../components/UI/BookingTableRow';
import { bookingHistory } from "../../../../../components/Feature";

const History: React.FC = () => {
    const [nav, setNav] = useState(false);

    const toggleNav = () => setNav(!nav);

    // Function to get the day of the week from a date string
    const getDayOfWeek = (dateString: string): string => {
        const date = new Date(dateString);
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
        return days[date.getDay()];
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1">
                <div className="p-6">
                    <AdminHeading label="BOOKING HISTORY" />

                    {/* TODAY Section */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">TODAY</h2>
                        <p className="text-gray-600">No Bookings</p>
                    </div>

                    {/* Previous History Section */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold">May 9, 2022 - May 11, 2022</h2>
                        <div className="mt-4">
                        {bookingHistory.map(booking => (
                            <BookingTableRow
                                key={booking.id}
                                name={booking.name ?? ''}
                                time={booking.time ?? ''}
                                organizer={booking.organizer ?? ''}
                                dateBooked={booking.dateBooked ?? ''}
                                notes={booking.note ?? ''}
                                day={getDayOfWeek(booking.date)}
                                recurringBooking={booking.recurrence ?? false}
                            />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;