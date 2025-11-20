import { useState } from 'react'
import ViewRoomHeader from './ViewRoomHeader';
import Calendar from './RoomDetails/Calendar';
import History from './RoomDetails/History';
import Reservations from './RoomDetails/Reservations';
import AdminBackLink from '../../../../components/UI/AdminBackLink';
import { useRooms } from '@/context/RoomContext';

const ViewRoomDetails = () => {

  const [activeTab, setActiveTab] = useState('Calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeek, setSelectedWeek] = useState<Date | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { currentRoom } = useRooms();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Reset filters when switching tabs
    setSearchQuery('');
    setSelectedWeek(undefined);
    setSelectedStatus('all');
  };

  return (
    <div className='flex flex-col gap-0 bg-[#F3F4F6] w-full h-full px-7 pt-6 pb-8 rounded-md'>
      <AdminBackLink label='Back to View Rooms' backPath='/admin/rooms/view' />
      <div className='flex flex-col gap-4 mt-5 bg-gray-100 h-full w-full rounded-md shadow-md'>
        <ViewRoomHeader 
          activeTab={activeTab} 
          handleTabClick={handleTabClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedWeek={selectedWeek}
          onWeekChange={setSelectedWeek}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
        {activeTab === 'Calendar' && <Calendar />}
        {activeTab === 'History' && <History searchQuery={searchQuery} selectedWeek={selectedWeek} />}
        {activeTab === 'Reservations' && <Reservations searchQuery={searchQuery} selectedWeek={selectedWeek} selectedStatus={selectedStatus} />}
      </div>
    </div>
  )
}

export default ViewRoomDetails