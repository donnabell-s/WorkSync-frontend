import React, { useState } from 'react'
import SideContainer from "../../../components/Layout/UserLayout/SideContainer"
import RoomList from '../../../components/Feature/RoomList'
import UserHeading from '../../../components/UI/UserHeading'
import UserSearch from '../../../components/UI/UserSearch'
import { meetingRooms } from "../../../components/Feature/RoomListInterface"

const RoomExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRooms = meetingRooms.filter((room) =>
    `${room.roomCode} ${room.roomName} ${room.location}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SideContainer />
      <div className="xl:ml-67 p-10 flex flex-col gap-6">
        <div className="flex flex-row justify-between">
          <UserHeading label="Room Explorer" />
          <UserSearch value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div>
          <RoomList role="user" rooms={filteredRooms} />
        </div>
      </div>
    </div>
  );
};

export default RoomExplorer;
