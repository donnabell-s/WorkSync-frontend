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
    <div className="w-full flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-8 relative">
        
        <a href="#" className="text-blue-600 text-sm font-semibold mb-4 inline-block hover:underline">&lt; Back to View Bookings</a>
        {/* Edit button */}
        {mode === 'view' && (
          <button className="absolute top-8 right-8 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded flex items-center">
            Edit
          </button>
        )}
        <h2 className="text-2xl font-extrabold mb-6 mt-2">BOOKING DETAILS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
          <div>
            <div className="font-semibold">Organizer</div>
            <div>{dummyBooking.organizer}</div>
          </div>
          <div>
            <div className="font-semibold">User ID</div>
            <div>{dummyBooking.userId}</div>
          </div>
          <div className="md:col-span-2">
            <div className="font-semibold">Meeting/Event Title</div>
            <div>{dummyBooking.title}</div>
          </div>
          <div>
            <div className="font-semibold">Date/Time</div>
            <div>{dummyBooking.date}</div>
            <div>{dummyBooking.day}</div>
            <div>{dummyBooking.time}</div>
          </div>
          <div>
            <div className="font-semibold">Description</div>
            <div>{dummyBooking.description}</div>
          </div>
          <div>
            <div className="font-semibold">Expected Attendees</div>
            <div>{dummyBooking.attendees}</div>
          </div>
          <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <div className="font-semibold">Selected Room</div>
              <div>{dummyBooking.room}</div>
            </div>
            <img src={dummyBooking.roomImage} alt="Room" className="w-48 h-24 object-cover rounded" />
          </div>
          <div className="md:col-span-2">
            <div className="font-semibold">Status on Booking Date</div>
            <div className="text-green-600 font-bold">{dummyBooking.status}</div>
          </div>
        </div>
      
      
        {mode === 'view' && (
          <div className="flex gap-4 mt-6">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded flex-1">Approve</button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded flex-1">Decline</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBooking; 