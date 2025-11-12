import React, { useState } from 'react';
import AdminSearch from '../../../components/UI/AdminSearch';

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
    <div className="h-full min-h-0 flex flex-col px-7 pt-6 pb-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">NOTIFICATIONS</h1>

        {/* Header styled like View/Booking list header */}
        <div className='divide-y-1 divide-[#D2D4D8] rounded-md bg-white'>
          <div className='p-3'>
            <div className='bg-[#F3F4F6] p-1 rounded-md flex flex-wrap gap-2 max-w-max'>
              {(['All', 'Alert', 'Update', 'Report', 'System'] as NotificationType[]).map((tab) => (
                <button
                  key={tab}
                  className={`px-5 py-2 rounded-md text-sm font-semibold cursor-pointer ${activeTab === tab ? 'bg-white text-[#2563EB]' : 'text-[#374151] hover:bg-[#E5E7EB]'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'System' ? 'System Notifications' : `${tab}${tab !== 'All' ? 's' : ''}`}
                </button>
              ))}
            </div>
          </div>
          <div className='flex sm:flex-row flex-col p-3 justify-between gap-3'>
            <div className='flex md:flex-row flex-col gap-4 items-center flex-1 w-full'>
              <AdminSearch value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filter by:</span>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-slate-200 px-3 py-2 rounded-md text-sm bg-[#F3F4F6] text-[#888E96] focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                <option>This Day</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>
        </div>

  {/* Notifications */}
  <div className="space-y-3">
          {filtered.map((n) => (
            <div
              key={n.id}
              className="border border-gray-200 rounded-md px-4 py-3 flex justify-between items-start shadow-sm bg-white"
            >
              <div>
                <div
                  className={`px-4 py-1 text-xs font-semibold rounded rounded-lg mb-1 inline-block ${
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
    </div>
  );
};

export default Notifications;