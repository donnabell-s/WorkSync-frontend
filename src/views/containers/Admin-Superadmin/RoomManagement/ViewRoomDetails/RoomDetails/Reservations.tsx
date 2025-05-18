import React from 'react';
import AdminHeading from '../../../../../components/UI/AdminHeading';

interface Reservation {
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

const Reservations: React.FC = () => {
  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[date.getDay()];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const reservations: Reservation[] = [
    {
      id: '1',
      name: 'Marketing Project Proposal',
      date: '2023-05-17',
      time: '10:00 AM - 11:30 AM',
      organizer: 'Jane Doe',
      dateBooked: 'May 15, 2022 | 3:28 PM',
      recurringBooking: false,
      notes: 'None',
      status: 'PENDING'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <AdminHeading label="RESERVATIONS" />
        
        {/* Current Reservations */}
            <div className="mb-8">
                            <h2 className="text-lg font-semibold">
                                TODAY</h2>
                            <p className="text-gray-600">
                                No reservations</p>
            </div>
        
        {/* Pending Reservations */}
        <div>
          <h2 className="text-lg font-semibold mb-2">PENDING</h2>
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="bg-white rounded-lg shadow-sm p-4">
                {/* First Row */}
                <div className="grid grid-cols-12 gap-4 items-baseline mb-2">
                  <div className="col-span-2 font-bold">{formatDate(reservation.date)}</div>
                  <div className="col-span-4 font-semibold">{reservation.name}</div>
                  <div className="col-span-3">
                    <span className="text-gray-500">Organizer: </span>
                    <span>{reservation.organizer}</span>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="text-gray-500">Recurring Booking: </span>
                    <span>{reservation.recurringBooking ? 'Yes' : 'No'}</span>
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-12 gap-4 items-baseline">
                  <div className="col-span-2 text-sm text-gray-500">{getDayOfWeek(reservation.date)}</div>
                  <div className="col-span-4">{reservation.time}</div>
                  <div className="col-span-3">
                    <span className="text-gray-500">Date Requested: </span>
                    <span>{reservation.dateBooked}</span>
                  </div>
                  <div className="col-span-3 flex justify-between">
                    <div>
                      <span className="text-gray-500">Notes: </span>
                      <span>{reservation.notes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        reservation.status === 'PENDING' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {reservation.status}
                      </span>
                      <button className="bg-green-400 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm">
                        View Details
                      </button>
                    </div>
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