import React from 'react';

interface ViewBookingProps {
  mode?: 'view' | 'approved';
}

const dummyBooking = {
  organizer: 'Jane Doe',
  userId: '#123456',
  title: 'Marketing Project Proposal',
  date: 'May 17, 2022',
  day: 'Friday',
  time: '12:00 PM - 1:20 PM',
  description: 'N/A',
  attendees: 10,
  room: 'Executive Boardroom - CR-102A',
  roomImage: '/src/assets/meeting-room.png',
  status: 'AVAILABLE',
};

const ViewBooking: React.FC<ViewBookingProps> = ({ mode = 'view' }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl bg-white rounded shadow p-8 relative">
        {/* Back Link */}
        <a href="#" className="text-blue-600 text-sm font-semibold mb-6 inline-block hover:underline">
          &lt; Back to View Bookings
        </a>

        {/* Edit Button */}
        {mode === 'view' && (
          <button className="absolute top-8 right-8 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded text-sm shadow">
            Edit
          </button>
        )}

        <h2 className="text-xl font-bold text-gray-800 mb-8">BOOKING DETAILS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700">Organizer</div>
              <div>{dummyBooking.organizer}</div>
            </div>

            <div className="mb-4">
              <div className="font-semibold text-gray-700">Meeting/Event Title</div>
              <div>{dummyBooking.title}</div>
            </div>

            <div className="mb-4">
              <div className="font-semibold text-gray-700">Date/Time</div>
              <div>
                {dummyBooking.date} <br />
                {dummyBooking.day} <br />
                {dummyBooking.time}
              </div>
            </div>

            <div className="mb-4">
              <div className="font-semibold text-gray-700">Expected Attendees</div>
              <div>{dummyBooking.attendees}</div>
            </div>

            <div className="mb-4">
              <div className="font-semibold text-gray-700">Selected Room</div>
              <div className="flex items-center gap-4">
                <span>{dummyBooking.room}</span>
                <img
                  src={dummyBooking.roomImage}
                  alt="Room"
                  className="w-36 h-20 object-cover rounded"
                />
              </div>
            </div>

            <div>
              <div className="font-semibold text-gray-700">Status on Booking Date</div>
              <div className="text-green-600 font-bold">{dummyBooking.status}</div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700">User ID</div>
              <div>{dummyBooking.userId}</div>
            </div>

            <div className="mb-4">
              <div className="font-semibold text-gray-700">Description</div>
              <div>{dummyBooking.description}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {mode === 'view' && (
          <div className="flex justify-start gap-4 mt-8">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded">
              Approve
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded">
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBooking;
