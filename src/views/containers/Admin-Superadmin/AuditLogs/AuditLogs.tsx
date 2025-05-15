import React from 'react';

interface AuditLogsProps {
  mode: 'rooms' | 'bookings';  
}

const AuditLogs: React.FC<AuditLogsProps> = ({ mode }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {mode === 'rooms' ? 'Room Audit Logs' : 'Booking Audit Logs'}
      </h2>
      {mode === 'rooms' ? (
        <div>
          
          <p>Display room audit logs here...</p>
        </div>
      ) : (
        <div>
          
          <p>Display booking audit logs here...</p>
        </div>
      )}
    </div>
  );
};

export default   AuditLogs;
