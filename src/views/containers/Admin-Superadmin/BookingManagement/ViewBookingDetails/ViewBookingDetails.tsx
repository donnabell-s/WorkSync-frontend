import { useState } from 'react';
import ViewBooking from './ViewBooking';

const ViewBookingDetails = () => {
  const [mode, setMode] = useState<'view' | 'approved' | 'declined'>('view');

  const handleApprove = () => {
    setMode('approved');
  };
  const handleDecline = () => {
    setMode('declined');
  };

  return (
    <div className="h-full min-h-0 flex flex-col px-7 pt-6 pb-8">
  <ViewBooking mode={mode} onApprove={handleApprove} onDecline={handleDecline} />
    </div>
  );
};


export default ViewBookingDetails