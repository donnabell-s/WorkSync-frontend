import AdminHeading from '../../../../components/UI/AdminHeading'
import RoomList from '../../../../components/Feature/RoomList'
import ViewManagementHeader from '../../../../components/UI/ViewManagementHeader'
import { useEffect, useState } from 'react'
import { useRooms } from '../../../../../context/RoomContext'
import { Room } from '../../../../../../server/types'

const ViewRooms = () => {
  const { rooms, currentRoom } = useRooms()
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms)

  useEffect(() => {
    console.log('view rooms rendered');
    setFilteredRooms(rooms);
  }, [rooms]);

  return (
    <div className='h-[calc(100%-3rem)] flex flex-col p-3 px-7'>
      <div>
        <AdminHeading label="MEETING ROOMS" />
      </div>
      <div className='h-full flex flex-col mt-5 bg-white rounded-lg shadow-md divide-y-1 divide-[#D2D4D8]'>
        <ViewManagementHeader view="rooms" setFunction={setFilteredRooms} />
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