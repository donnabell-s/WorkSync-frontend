import React from 'react';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import { Reservation, reservations } from '../../../../../components/Feature/LstReservations';

const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[date.getDay()];
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const Reservations: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-200">
            <div className="flex-1 p-6">
                <AdminHeading label="RESERVATIONS" />
                <div className="mb-8">
                    <h2 className="text-lg font-semibold">CURRENT</h2>
                    <p className="text-gray-600">No Reservations</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-4">PENDING</h2>
                    <div className="space-y-4">
                        {reservations.map((reservation: Reservation) => (
                            <div key={reservation.id} className="bg-white rounded-lg shadow-sm p-4">
                                <div className="grid grid-cols-12 gap-4 items-baseline mb-2">
                                    <div className="col-span-2 font-bold">{formatDate(reservation.date)}</div>
                                    <div className="col-span-3 font-bold">{reservation.name}</div>
                                    <div className="col-span-3">
                                        <span className="text-gray-500 font-bold">Organizer: </span>
                                        <span>{reservation.organizer}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-500 font-bold">Recurring Booking: </span>
                                        <span>{reservation.recurringBooking ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                reservation.status === 'PENDING'
                                                    ? 'bg-white-100 font-bold text-yellow-500'
                                                    : 'bg-green-100 text-green-800'
                                            }`}
                                        >
                                            {reservation.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-4 items-baseline">
                                    <div className="col-span-2 text-sm text-gray-500">{getDayOfWeek(reservation.date)}</div>
                                    <div className="col-span-3">{reservation.time}</div>
                                    <div className="col-span-3">
                                        <span className="text-gray-500 font-bold">Date Requested: </span>
                                        <span>{reservation.dateBooked}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-500">Notes: </span>
                                        <span>{reservation.notes}</span>
                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <button className="bg-green-400 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm">
                                            View Details
                                        </button>
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

export default Reservations;