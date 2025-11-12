import AdminHeading from '../../../../components/UI/AdminHeading'
import RoomList from '../../../../components/Feature/RoomList'
import ViewManagementHeader from '../../../../components/UI/ViewManagementHeader'
import { useEffect, useState } from 'react'
import { useRooms } from '../../../../../context/RoomContext'
import { Room } from '../../../../../../server/types'

const ViewRooms = () => {
  const { rooms } = useRooms()
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms)

  useEffect(() => {
    console.log('view rooms rendered');
    setFilteredRooms(rooms);
  }, [rooms]);

  return (
    <div className='h-full min-h-0 flex flex-col px-7 pt-6 pb-8'>
      <div>
        <AdminHeading label="MEETING ROOMS" />
      </div>
      <div className='h-full min-h-0 flex flex-col mt-5 bg-white rounded-lg shadow-md divide-y-1 divide-[#D2D4D8]'>
        <ViewManagementHeader view="rooms" setFunction={setFilteredRooms} />
  <div className='flex-1 min-h-0 bg-[#EAECEF] p-3 rounded-md overflow-hidden flex flex-col'>
          <div className='flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar'>
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
    </div>
  )
}

export default ViewRooms