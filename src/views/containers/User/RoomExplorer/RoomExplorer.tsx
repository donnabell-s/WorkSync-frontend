import React, { useState, useEffect } from 'react';
import SideContainer from "../../../components/Layout/UserLayout/SideContainer";
import RoomList from '../../../components/Feature/RoomList';
import UserHeading from '../../../components/UI/UserHeading';
import UserSearch from '../../../components/UI/UserSearch';
import { CiFilter } from "react-icons/ci";
import { useRooms } from '../../../../context/RoomContext'; // adjust path as needed
import type { Room } from '../../../../types';

interface FacilityOption {
  label: string;
  value: string;
}

const facilityOptions: FacilityOption[] = [
  { label: "Projector", value: "Projector" },
  { label: "Whiteboard", value: "Whiteboard" },
  { label: "LED Display", value: "LED Display" },
  { label: "Air Conditioning", value: "Air Conditioning" },
  { label: "Internet Access", value: "Internet Access" },
  { label: "Coffee / Water Station", value: "Coffee / Water Station" },
  { label: "Microphone & Speakers", value: "Microphone & Speakers" },
];


const RoomExplorer: React.FC = () => {
  const { rooms } = useRooms();           
  const [searchQuery, setSearchQuery] = useState("");
  const [distance, setDistance]     = useState(10);
  const [minSeats, setMinSeats]     = useState(5);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [bookingDraft, setBookingDraft] = useState<{ title: string; date: string } | null>(null);

  // Applied filters snapshot
  const [appliedMinSeats, setAppliedMinSeats]         = useState(5);
  const [appliedFacilities, setAppliedFacilities]     = useState<string[]>([]);

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
  }, [setBookingDraft]);

  const handleCancelDraft = () => {
    localStorage.removeItem("tempBooking");
    setBookingDraft(null);
  };

  const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFacilities(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  const handleApplyFilters = () => {
    setAppliedMinSeats(minSeats);
    setAppliedFacilities(facilities);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter the live rooms array
  const filteredRooms = (rooms as Room[])
    .filter(room => {
      const matchesSearch = `${room.code} ${room.name} ${room.location}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesSeats = (room.seats ?? 0) >= appliedMinSeats;

      const matchesFacilities = appliedFacilities.every(f =>
        room.amenities.includes(f)
      );

      // TODO: add distance-based filtering here if you have coordinates

      return matchesSearch && matchesSeats && matchesFacilities;
    });

  return (
    <div>
      <SideContainer>
        <div className="flex flex-col gap-5 text-[#4B5563]">
          <h1 className="text-lg font-semibold mb-2 flex items-center gap-1">
            <CiFilter size={23} /> Filter
          </h1>

          {/* Distance */}
          {/* <div className="mb-2">
            <h2 className="text-md font-medium mb-2">Location</h2>
            <div className="flex flex-col gap-3 pl-6">
              <label className="text-sm">Distance (km)</label>
              <input
                type="range"
                min="1" max="50" step="1"
                value={distance}
                onChange={e => setDistance(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-[#A4A9B0] accent-[#0D9488]"
              />
              <span className="text-xs font-medium">{distance} km</span>
            </div>
          </div> */}

          {/* Capacity */}
          <div className="mb-2">
            <h2 className="text-md font-medium mb-2">Capacity</h2>
            <div className="flex flex-col gap-3 pl-6">
              <label className="text-sm">Minimum Seats</label>
              <input
                type="range"
                min="1" max="50" step="1"
                value={minSeats}
                onChange={e => setMinSeats(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-[#A4A9B0] accent-[#0D9488]"
              />
              <span className="text-xs font-medium">{minSeats} seats</span>
            </div>
          </div>

          {/* Facilities */}
          <div className="mb-2">
            <h2 className="text-md font-medium mb-2">Facilities</h2>
            <div className="flex flex-col gap-1 pl-6 text-xs">
              {facilityOptions.map(opt => (
                <label key={opt.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={opt.value}
                    checked={facilities.includes(opt.value)}
                    onChange={handleFacilityChange}
                    className="accent-[#0D9488]"
                  />
                  {opt.label}
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
        <div className="flex justify-between">
          <UserHeading label="Room Explorer" />
          <div className="flex flex-col md:flex-row justify-end gap-2 w-157">
            <div className="flex items-center text-sm text-red-600 font-medium gap-2">
              {bookingDraft && (
                <div className="flex items-center gap-2 bg-red-100 border border-red-300 px-3 py-1 rounded overflow-hidden max-w-[225px]">
                  <span className="truncate">
                    Booking Draft: <strong>{bookingDraft.title}</strong>
                  </span>
                  <button
                    onClick={handleCancelDraft}
                    className="text-red-600 underline hover:text-red-800 text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[60px]"
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
