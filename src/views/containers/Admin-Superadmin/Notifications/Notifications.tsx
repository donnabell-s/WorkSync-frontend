import React, { useState } from 'react';

type NotificationType = 'All' | 'Alert' | 'Update' | 'Report' | 'System';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
}

const dummyNotifications: Notification[] = [
  {
    id: 1,
    type: 'Alert',
    title: 'Double-Booking Detected',
    message:
      'Conflict: Conference Room A is booked by both Sales and Engineering for 10–11 AM today. Resolve now?',
    timestamp: '29 March 2025 at 3:00 PM',
  },
  {
    id: 2,
    type: 'Update',
    title: 'Booking Modified',
    message:
      'David Zhang rescheduled Training Room 2 from 3 PM → 4 PM tomorrow.',
    timestamp: '29 March 2025 at 2:10 PM',
  },
  {
    id: 3,
    type: 'Report',
    title: 'Peak Hours Update',
    message: 'New peak detected: 3–4 PM (85% occupancy vs. 70% last month).',
    timestamp: '29 March 2025 at 1:48 PM',
  },
  {
    id: 4,
    type: 'System',
    title: 'Backup Completed',
    message:
      'Nightly backup successful (March 29, 2 AM). 14 new bookings archived.',
    timestamp: '29 March 2025 at 2:05 AM',
  },
];

const tabStyles: Record<NotificationType, string> = {
  All: '',
  Alert: 'bg-red-500 text-white',
  Update: 'bg-yellow-400 text-white',
  Report: 'bg-purple-500 text-white',
  System: 'bg-green-500 text-white',
};

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NotificationType>('All');
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('This Week');

  const filtered = dummyNotifications.filter((n) => {
    const matchesTab =
      activeTab === 'All' || n.type.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">NOTIFICATIONS</h1>

      {/* Tabs */}
      <div className="flex space-x-3 mb-4 border-b pb-2">
        {['All', 'Alert', 'Update', 'Report', 'System'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as NotificationType)}
            className={`px-4 py-1 rounded-md text-sm ${
              activeTab === tab ? 'bg-gray-200 font-semibold' : 'text-gray-600'
            }`}
          >
            {tab === 'System' ? 'System Notifications' : tab + (tab !== 'All' ? 's' : '')}
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-md w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter by:</span>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="border px-2 py-1 rounded-md text-sm"
          >
            <option>This Day</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        {filtered.map((n) => (
          <div
            key={n.id}
            className="border border-gray-200 rounded-md px-4 py-3 flex justify-between items-start shadow-sm bg-white"
          >
            <div>
              <div
                className={`px-2 py-1 text-xs font-semibold rounded mb-1 inline-block ${
                  tabStyles[n.type]
                }`}
              >
                {n.type === 'System' ? 'System Notifications' : n.type + (n.type !== 'Report' ? 's' : '')}
              </div>
              <h4 className="font-semibold">{n.title}</h4>
              <p className="text-sm text-gray-700">{n.message}</p>
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap pl-4">{n.timestamp}</div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;