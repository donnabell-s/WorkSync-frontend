import React from "react";

type RoomFormLayoutProps = {
  title: string;
  roomData?: any;
  onSubmit?: (e: React.FormEvent) => void;
  onCancel: () => void;
  isDisabled?: boolean;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actionButtonText: string;
  showImagePreview?: boolean;
};

const RoomFormLayout: React.FC<RoomFormLayoutProps> = ({
  title,
  roomData = {},
  onSubmit,
  onCancel,
  isDisabled = false,
  onFileChange,
  actionButtonText,
  showImagePreview = true,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>{title}</h2>
      <div className="form-grid">
        <div>
          <label>Room Name</label>
          <input type="text" defaultValue={roomData.name} disabled={isDisabled} required />
        </div>
        <div>
          <label>Room Number</label>
          <input type="text" defaultValue={roomData.number} disabled={isDisabled} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" defaultValue={roomData.location} disabled={isDisabled} required />
        </div>
        <div>
          <label>Floor/Level</label>
          <input type="text" defaultValue={roomData.floor} disabled={isDisabled} required />
        </div>
        <div>
          <label>Size</label>
          <select defaultValue={roomData.size} disabled={isDisabled} required>
            <option value="">Select Room Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div>
          <label>Seats</label>
          <input type="number" defaultValue={roomData.seats} disabled={isDisabled} required />
        </div>
        <div>
          <label>Status</label>
          <select defaultValue={roomData.status} disabled={isDisabled} required>
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div>
          <label>Facilities</label>
          <select multiple disabled={isDisabled}>
            <option value="Projector">Projector</option>
            <option value="Video Conferencing">Video Conferencing</option>
            <option value="Whiteboard">Whiteboard</option>
          </select>
        </div>
        <div>
          <label>Room Image</label>
          <input type="file" onChange={onFileChange} disabled={isDisabled} />
          {showImagePreview && roomData.image && (
            <img src={roomData.image} alt="Room" width={250} />
          )}
        </div>
      </div>
      <div className="button-group">
        <button type="submit" disabled={isDisabled}>{actionButtonText}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default RoomFormLayout;
