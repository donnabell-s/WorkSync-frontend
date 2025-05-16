import React from 'react';
import RoomFormLayout from '../../../../../components/RoomFormLayout';

const EditRoom: React.FC = () => {
  return (
    <RoomFormLayout
      title="EDIT ROOM"
      backLinkText="Back to Room Details"
      backLinkHref="#"
      leftFields={
        <>
          <div className="form-group">
            <label>Room Name</label>
            <input type="text" defaultValue="Executive Boardroom" />
          </div>
          <div className="form-group">
            <label>Room Number</label>
            <input type="text" defaultValue="CR-102A" />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" defaultValue="North Tower" />
          </div>
          <div className="form-group">
            <label>Floor/Level</label>
            <input type="text" defaultValue="12" />
          </div>
          <div className="form-group">
            <label>Size</label>
            <input type="text" defaultValue="Medium" />
          </div>
          <div className="form-group">
            <label>Seats</label>
            <input type="text" defaultValue="12" />
          </div>
        </>
      }
      rightFields={
        <>
          <div className="form-group">
            <label>Status</label>
            <select>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>
          <div className="form-group">
            <label>Facilities</label>
            <select>
              <option value="Projector, Video Conferencing, Whiteboard">Projector, Video Conferencing, Whiteboard</option>
              <option value="None">None</option>
            </select>
          </div>
          <div className="room-image-section">
            <label>Room Image</label>
            <input type="file" />
            <div className="room-image-container">
              <img src="https://via.placeholder.com/200x120" alt="Room Image" className="room-image" />
              <span className="room-image-filename">executive_boardroom.png</span>
            </div>
          </div>
        </>
      }
      buttons={
        <>
          <button className="save-btn">Save Changes</button>
          <button className="cancel-btn">Cancel</button>
        </>
      }
    />
  );
};

export default EditRoom;