import React, { useState, useEffect } from 'react'
import SideContainer from "../../../components/Layout/UserLayout/SideContainer"
import RoomList from '../../../components/Feature/RoomList'
import UserHeading from '../../../components/UI/UserHeading'
import UserSearch from '../../../components/UI/UserSearch'
import { meetingRooms } from "../../../components/Feature/RoomListInterface"
import { CiFilter } from "react-icons/ci";

interface FacilityOption {
  label: string;
  value: string;
}

const facilityOptions: FacilityOption[] = [
  { label: "Air Conditioner", value: "Air Conditioner" },
  { label: "Projector", value: "Projector" },
  { label: "Whiteboard", value: "Whiteboard" },
  { label: "Coffee Machine", value: "Coffee Machine" },
];

const RoomExplorer = () => {
  // Inputs (live)
  const [searchQuery, setSearchQuery] = useState("");
  const [distance, setDistance] = useState(10);
  const [minSeats, setMinSeats] = useState(5);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [bookingDraft, setBookingDraft] = useState<{ title: string; date: string } | null>(null);


  // Applied filters (used to filter rooms)
  const [appliedMinSeats, setAppliedMinSeats] = useState(5);
  const [appliedFacilities, setAppliedFacilities] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("tempBooking");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.title && parsed.date) {
          setBookingDraft(parsed);
        }
      } catch {
        localStorage.removeItem("tempBooking");
      }
    }
  }, []);

  const handleCancelDraft = () => {
    localStorage.removeItem("tempBooking");
    setBookingDraft(null);
  };



  const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFacilities((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleApplyFilters = () => {
    setAppliedMinSeats(minSeats);
    setAppliedFacilities(facilities);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRooms = meetingRooms.filter((room) => {
    const matchesSearch = `${room.roomCode} ${room.roomName} ${room.location}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()); // Use live search query here for real-time filtering

    const matchesSeats = room.numberOfSeats >= appliedMinSeats;

    const matchesFacilities = appliedFacilities.every((facility) =>
      room.additionalFacilities.includes(facility)
    );

    return matchesSearch && matchesSeats && matchesFacilities;
  });

  return (
    <div>
      <SideContainer>
        <div className="flex flex-col gap-5 text-[#4B5563]">
          <h1 className="text-lg font-semibold mb-2 flex flex-row items-center gap-1">
            <CiFilter size={23} /> Filter
          </h1>

          {/* Location Filter */}
          <div className="mb-2">
            <h2 className="text-md font-medium mb-2">Location</h2>
            <div className="flex flex-col gap-3 pl-6">
              <label className="text-sm">Distance (km)</label>
              <input type="range" min="1" max="50" step="1"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-[#A4A9B0] accent-[#0D9488]"
              />
              <span className="text-xs font-medium">{distance} km</span>
            </div>
          </div>

          {/* Capacity Filter */}
          <div className="mb-2">
            <h2 className="text-md font-medium mb-2">Capacity</h2>
            <div className="flex flex-col gap-3 pl-6">
              <label className="text-sm">Minimum Seats</label>
              <input type="range" min="1" max="50" step="1"
                value={minSeats}
                onChange={(e) => setMinSeats(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-[#A4A9B0] accent-[#0D9488]"
              />
              <span className="text-xs font-medium">{minSeats} seats</span>
            </div>
          </div>

          <div className="mb-2">
            <h2 className="text-md font-medium mb-2">Facilities</h2>
            <div className="flex flex-col gap-1 pl-6 text-xs">
              {facilityOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={facilities.includes(option.value)}
                    onChange={handleFacilityChange}
                    className="accent-[#0D9488]"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleApplyFilters}
            className="w-full bg-[#0D9488] uppercase text-white text-sm py-1.5 px-4 rounded hover:bg-emerald-600 transition"
          >
            Apply All
          </button>
        </div>
      </SideContainer>

      <div className="xl:ml-67 p-10 flex flex-col gap-6">
        <div className="flex flex-row justify-between">
          <UserHeading label="Room Explorer" />
          <div className="flex flex-col md:flex-row justify-end gap-2 w-157">
            <div className="flex items-center text-sm text-red-600 font-medium gap-2">
              {bookingDraft && (
                <div
                  className="flex items-center gap-2 bg-red-100 border border-red-300 px-3 py-1 rounded overflow-hidden max-w-[225px]"
                >
                  <span className="truncate">
                    Booking Draft: <strong className="font-medium">{bookingDraft.title}</strong>
                  </span>
                  <button
                    onClick={handleCancelDraft}
                    className="text-red-600 underline hover:text-red-800 transition text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[60px]"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <UserSearch value={searchQuery} onChange={handleSearchChange} />
          </div>
        </div>
        <div>
          <RoomList role="user" rooms={filteredRooms} />
        </div>
      </div>
    </div>
  );
};

export default RoomExplorer;
