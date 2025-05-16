import React from 'react';
import './BookingHistory.css';

interface History {
  date: string;
  event: string;
  organizer: string;
}

const history: History[] = [
  { date: 'May 1', event: 'Team Meeting', organizer: 'Jane Doe' },
];

const BookingHistory: React.FC = () => {
  return (
    <div id="booking-history">
      <h3>Booking History</h3>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Organizer</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.event}</td>
              <td>{item.organizer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;