import React, { useState } from 'react';
import ViewBooking from './ViewBooking';

const ViewBookings = () => {
  const [mode, setMode] = useState<'view' | 'approved'>('view');

  const handleApprove = () => {
    setMode('approved');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ViewBooking mode={mode} onApprove={handleApprove} />
    </div>
  );
};

export default ViewBookings;
