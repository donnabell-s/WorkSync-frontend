import React from 'react';
import { RoomFormLayout } from '../../../../../components'; 
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    navigate('/superadmin/admins/rooms');
  };

  return (
    <div className="add-room">
      <RoomFormLayout
        title="Add New Room"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        actionButtonText="Add Room"
      />
    </div>
  );
};

export default AddRoom;
