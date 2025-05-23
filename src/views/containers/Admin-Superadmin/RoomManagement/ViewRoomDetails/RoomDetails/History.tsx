import React, { useState } from 'react';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import { Booking, bookingHistory } from '../../../../../components/Feature/ListHistory';

const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[date.getDay()];
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const History: React.FC = () => {
    const [nav, setNav] = useState(false);

    const toggleNav = () => setNav(!nav);

    return (
        <div className="flex min-h-screen bg-gray-200">
            <div className="flex-1 p-6">
                <AdminHeading label="BOOKING HISTORY" />
                <div className="mb-8">
                    <h2 className="text-lg font-semibold">CURRENT</h2>
                    <p className="text-gray-600">No Bookings</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-4">HISTORY</h2>
                    <div className="space-y-4">
                        {bookingHistory.map((booking: Booking) => (
                            <div key={booking.id} className="bg-white rounded-lg shadow-sm p-4">
                                <div className="grid grid-cols-12 gap-4 items-baseline mb-2">
                                    <div className="col-span-2 font-bold">{formatDate(booking.date)}</div>
                                    <div className="col-span-3 font-bold">{booking.name}</div>
                                    <div className="col-span-3">
                                        <span className="text-gray-500 font-bold">Organizer: </span>
                                        <span>{booking.organizer}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-500 font-bold">Recurring Booking: </span>
                                        <span>{booking.recurringBooking ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div className="col-span-2 flex justify-end"></div>
                                </div>
                                <div className="grid grid-cols-12 gap-4 items-baseline">
                                    <div className="col-span-2 text-sm text-gray-500">{getDayOfWeek(booking.date)}</div>
                                    <div className="col-span-3">{booking.time}</div>
                                    <div className="col-span-3">
                                        <span className="text-gray-500 font-bold">Date Booked: </span>
                                        <span>{booking.dateBooked}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-500">Notes: </span>
                                        <span>{booking.notes}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;