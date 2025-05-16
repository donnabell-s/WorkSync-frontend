import React from 'react';
import './RoomFormLayout.css';

interface Room {
  id: string;
  name: string;
  code: string;
  location: string;
  size: string;
  seats: number;
  facilities: string[];
  status: 'AVAILABLE' | 'BOOKED';
  imageUrl: string;
}

interface RoomFormLayoutProps {
  room: Room;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const RoomFormLayout: React.FC<RoomFormLayoutProps> = ({ room, onEdit, onDelete }) => {
  return (
    <div className="room-card">
      <img src={room.imageUrl} alt={`${room.name} Image`} />
      <div className="details">
        <h2>{room.name}</h2>
        <p><strong>{room.code}</strong></p>
        <p><strong>Location:</strong> {room.location}</p>
        <p><strong>Size:</strong> {room.size}</p>
        <p><strong>No. of Seats:</strong> {room.seats}</p>
        <p><strong>Facilities:</strong> {room.facilities.join(', ')}</p>
        <p className={room.status === 'AVAILABLE' ? 'status-available' : 'status-booked'}>
          {room.status}
        </p>
      </div>
      <div className="actions">
        <button onClick={() => onEdit?.(room.id)} className="edit-button">Edit</button>
        <button onClick={() => onDelete?.(room.id)} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default RoomFormLayout;