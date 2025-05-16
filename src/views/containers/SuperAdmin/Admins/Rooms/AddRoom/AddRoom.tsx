import React from 'react';
import RoomFormLayout from '../../../../../components/RoomFormLayout';

const AddRoom: React.FC = () => {
  return (
    <RoomFormLayout
      title="ADD ROOM"
      backLinkText="Back to View Rooms"
      backLinkHref="#"
      leftFields={
        <>
          <div className="form-group">
            <label className="required">Room Name</label>
            <input type="text" placeholder="Enter Room Name" />
          </div>
          <div className="form-group">
            <label className="required">Room Number</label>
            <input type="text" placeholder="Enter Room Number" />
          </div>
          <div className="form-group">
            <label className="required">Location</label>
            <input type="text" placeholder="Enter Location" />
          </div>
          <div className="form-group">
            <label className="required">Floor/Level</label>
            <input type="text" placeholder="Enter Floor/Level" />
          </div>
          <div className="form-group">
            <label className="required">Size</label>
            <select>
              <option value="">Select Room Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="form-group">
            <label className="required">Seats</label>
            <input type="text" placeholder="Select Number of Seats" />
          </div>
        </>
      }
      rightFields={
        <>
          <div className="form-group">
            <label className="required">Status</label>
            <select>
              <option value="">Select Room Status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>
          <div className="form-group">
            <label className="required">Facilities</label>
            <select>
              <option value="">Select Room Facilities Included</option>
              <option value="Projector, Video Conferencing, Whiteboard">Projector, Video Conferencing, Whiteboard</option>
              <option value="None">None</option>
            </select>
          </div>
          <div className="room-image-section">
            <label className="required">Room Image</label>
            <input type="file" />
            <div className="room-image-container">
              <span className="room-image-filename">No File Chosen</span>
            </div>
          </div>
        </>
      }
      buttons={
        <>
          <button className="save-btn">Save</button>
          <button className="cancel-btn">Cancel</button>
        </>
      }
    />
  );
};

export default AddRoom;