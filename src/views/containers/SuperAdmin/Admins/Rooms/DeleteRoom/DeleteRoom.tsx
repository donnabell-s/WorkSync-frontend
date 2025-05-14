import React from 'react';
import { RoomFormLayout } from '../../../../../components'; 
import { useNavigate } from 'react-router-dom';

const DeleteRoom = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    navigate('/superadmin/admins/rooms');
  };

  return (
    <div className="delete-room">
      <RoomFormLayout
        title="Delete Room"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        actionButtonText="Delete Room"
        isDisabled={true} 
      />
    </div>
  );
};

export default DeleteRoom;
