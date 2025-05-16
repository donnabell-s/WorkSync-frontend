import React from 'react';
import './PendingReservations.css';

interface Booking {
  date: string;
  event: string;
  time: string;
  organizer: string;
  dateBooked: string;
  recurring: string;
  notes: string;
}

const bookings: Booking[] = [
  {
    date: 'May 9',
    event: 'Leadership Training 1',
    time: '12:00 PM - 1:00 PM',
    organizer: 'John Doe',
    dateBooked: 'May 6, 2022, 3:28 PM',
    recurring: 'No',
    notes: 'None',
  },
  {
    date: 'May 10',
    event: 'Leadership Training 2',
    time: '12:00 PM - 1:00 PM',
    organizer: 'John Doe',
    dateBooked: 'May 6, 2022, 3:28 PM',
    recurring: 'No',
    notes: 'None',
  },
  {
    date: 'May 11',
    event: 'Leadership Training 3',
    time: '12:00 PM - 1:00 PM',
    organizer: 'John Doe',
    dateBooked: 'May 6, 2022, 3:28 PM',
    recurring: 'No',
    notes: 'None',
  },
];

const PendingReservations: React.FC = () => {
  return (
    <div id="current-pending">
      <table className="booking-table">
        <thead>
          <tr>
            <th>Today</th>
            <th>No Bookings</th>
          </tr>
        </thead>
      </table>
      <h3>May 9, 2022 - May 11, 2022</h3>
      <table className="booking-table pending">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Organizer</th>
            <th>Date Booked</th>
            <th>Recurring Booking</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.date}</td>
              <td>
                {booking.event}
                <br />
                {booking.time}
              </td>
              <td>{booking.organizer}</td>
              <td>{booking.dateBooked}</td>
              <td>{booking.recurring}</td>
              <td>{booking.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingReservations;