import React from 'react';
import { RoomFormLayout } from '../../../../../components'; 
import { useNavigate } from 'react-router-dom';

const EditRoom = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  };

  const handleCancel = () => {
    navigate('/superadmin/admins/rooms');
  };

  return (
    <div className="edit-room">
      <RoomFormLayout
        title="Edit Room"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        actionButtonText="Save Changes"
        roomData={{ name: 'Conference Room', number: '101', location: '1st Floor', floor: '1', size: 'Medium', seats: 10, status: 'Available' }} 
      />
    </div>
  );
};


export default EditRoom;
