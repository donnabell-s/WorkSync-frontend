import React, { useEffect } from 'react'
import AdminHeading from '../../../../components/UI/AdminHeading'
import AdminSearch from '../../../../components/UI/AdminSearch'
import AdminFilter from '../../../../components/UI/AdminFilter'
import AdminButton from '../../../../components/UI/AdminButton'
import RoomList from '../../../../components/Feature/RoomList'
import { meetingRooms } from "../../../../components/Feature/RoomListInterface"
import { IoAddOutline } from "react-icons/io5";

const ViewRooms = () => {

  const tabs: string[] = ["All", "Available", "Occupied", "Under Maintenance", "Reserved"];
  const [activeTab, setActiveTab] = React.useState<string>(tabs[0]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [filteredRooms, setFilteredRooms] = React.useState(meetingRooms);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    handleFilterRooms(tab);
    setSearchQuery('');
  }

  const handleFilterRooms = (tab: string) => {
    let filtered = meetingRooms;
    switch (tab) {
      case "Available":
        filtered = meetingRooms.filter(room => room.status === "available");
        break;
      case "Occupied":
        filtered = meetingRooms.filter(room => room.status === "occupied");
        break;
      case "Under Maintenance":
        filtered = meetingRooms.filter(room => room.status === "under maintenance");
        break;
      case "Reserved":
        filtered = meetingRooms.filter(room => room.status === "reserved");
        break;
      default:
        filtered = meetingRooms;
    }
    setFilteredRooms(filtered);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filtered = meetingRooms.filter(room => {
      const roomDetails = `${room.roomCode} ${room.roomName} ${room.location}`.toLowerCase();
      return roomDetails.includes(event.target.value.toLowerCase());
    });
    setFilteredRooms(filtered);
  }

  useEffect(() => {
    const filtered = meetingRooms.filter(room => {
      const roomDetails = `${room.roomCode} ${room.roomName} ${room.location}`.toLowerCase();
      return roomDetails.includes(searchQuery.toLowerCase());
    });
    setFilteredRooms(filtered);
  }, [searchQuery]);

  return (
    <div className='h-[calc(100%-3rem)] flex flex-col p-3 px-7'>
      <div>
        <AdminHeading label="MEETING ROOMS" />
      </div>
      <div className='h-full flex flex-col mt-5 bg-white rounded-lg shadow-md divide-y-1 divide-[#D2D4D8]'>
        <div className='p-3'>
          <div className='bg-[#F3F4F6] p-1 rounded-md flex flex-wrap gap-2 max-w-max'>
            {
              tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-5 py-2 rounded-md text-sm font-semibold cursor-pointer ${activeTab === tab ? 'bg-white text-[#2563EB]' : 'text-[#374151] hover:bg-[#E5E7EB]'}`}
                  onClick={() => handleTabClick(tab)}>
                  {tab}
                </button>
              ))
            }
          </div>
        </div>
        <div className='flex sm:flex-row flex-col p-3 justify-between gap-3'>
          <div className='flex md:flex-row flex-col gap-4 items-center'>
            <AdminSearch value={searchQuery} onChange={handleSearchChange} />
            <AdminFilter />
          </div>
          <AdminButton label="Add Room" icon={<IoAddOutline className='size-5 font-bold' />} />
        </div>
        <div className='h-full bg-[#F3F4F6] p-3 overflow-y-scroll rounded-md'>
          {
            filteredRooms.length > 0 ?
              <RoomList role='admin' rooms={filteredRooms} /> :
              <div className='flex items-center justify-center h-full'>
                <p className='text-gray-500 text-md'>No rooms found</p>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ViewRooms