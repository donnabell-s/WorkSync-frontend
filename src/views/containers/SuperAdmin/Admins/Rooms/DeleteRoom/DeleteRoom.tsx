import React from 'react';
import RoomFormLayout from '../../../../../components/RoomFormLayout';

const DeleteRoom: React.FC = () => {
  return (
    <RoomFormLayout
      title="DELETE ROOM"
      backLinkText="Back to Room Details"
      backLinkHref="#"
      leftFields={
        <>
          <div className="form-group">
            <label>Room Name</label>
            <input type="text" defaultValue="Executive Boardroom" disabled />
          </div>
          <div className="form-group">
            <label>Room Number</label>
            <input type="text" defaultValue="CR-102A" disabled />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" defaultValue="North Tower" disabled />
          </div>
          <div className="form-group">
            <label>Floor/Level</label>
            <input type="text" defaultValue="12" disabled />
          </div>
          <div className="form-group">
            <label>Size</label>
            <input type="text" defaultValue="Medium" disabled />
          </div>
          <div className="form-group">
            <label>Seats</label>
            <input type="text" defaultValue="12" disabled />
          </div>
        </>
      }
      rightFields={
        <>
          <div className="form-group">
            <label>Status</label>
            <input type="text" defaultValue="Available" disabled />
          </div>
          <div className="form-group">
            <label>Facilities</label>
            <input type="text" defaultValue="Projector, Video Conferencing, Whiteboard" disabled />
          </div>
          <div className="room-image-section">
            <label>Room Image</label>
            <div className="room-image-container">
              <img src="https://via.placeholder.com/200x120" alt="Room Image" className="room-image" />
              <span className="room-image-filename">executive_boardroom.png</span>
            </div>
          </div>
        </>
      }
      buttons={
        <>
          <button className="delete-btn">Delete</button>
          <button className="cancel-btn">Cancel</button>
        </>
      }
    />
  );
};

export default DeleteRoom;