export interface MeetingRoom {
    roomCode: string; // e.g. "CR-101A"
    roomName: string; // e.g. "Strategy Room"
    location: string;
    size: 'Small' | 'Medium' | 'Large';
    numberOfSeats: number;
    additionalFacilities: string[];
    imageFile: string;
    status: 'available' | 'occupied' | 'under maintenance' | 'reserved';
}
  

export const meetingRooms: MeetingRoom[] = [
{
    roomCode: "CR-101A",
    roomName: "Strategy Room",
    location: "North Tower, Level 11",
    size: "Medium",
    numberOfSeats: 10,
    additionalFacilities: ["Air Conditioner", "Whiteboard"],
    imageFile: "room-1.jpg",
    status: "available",
},
{
    roomCode: "CR-102A",
    roomName: "Executive Boardroom",
    location: "North Tower, Level 12",
    size: "Medium",
    numberOfSeats: 12,
    additionalFacilities: ["Air Conditioner", "Projector", "Whiteboard"],
    imageFile: "room-2.jpeg",
    status: "occupied",
},
{
    roomCode: "CR-103B",
    roomName: "Meeting Pod",
    location: "South Wing, Level 3",
    size: "Small",
    numberOfSeats: 4,
    additionalFacilities: ["Air Conditioner"],
    imageFile: "room-3.jpg",
    status: "available",
},
{
    roomCode: "CR-104C",
    roomName: "Innovation Hub",
    location: "East Wing, Level 5",
    size: "Large",
    numberOfSeats: 20,
    additionalFacilities: ["Air Conditioner", "Projector", "Whiteboard"],
    imageFile: "room-4.jpeg",
    status: "occupied",
},
{
    roomCode: "CR-105A",
    roomName: "Quiet Room",
    location: "North Tower, Level 7",
    size: "Small",
    numberOfSeats: 6,
    additionalFacilities: ["Air Conditioner", "Whiteboard"],
    imageFile: "room-5.jpg",
    status: "available",
},
{
    roomCode: "CR-106B",
    roomName: "Team Room",
    location: "South Wing, Level 4",
    size: "Medium",
    numberOfSeats: 8,
    additionalFacilities: ["Air Conditioner"],
    imageFile: "room-6.jpg",
    status: "occupied",
},
{
    roomCode: "CR-107C",
    roomName: "Think Tank",
    location: "East Wing, Level 6",
    size: "Large",
    numberOfSeats: 18,
    additionalFacilities: ["Air Conditioner", "Projector"],
    imageFile: "room-7.jpg",
    status: "available",
},
{
    roomCode: "CR-108A",
    roomName: "Client Room",
    location: "North Tower, Level 9",
    size: "Medium",
    numberOfSeats: 12,
    additionalFacilities: ["Air Conditioner", "Whiteboard"],
    imageFile: "room-8.jpg",
    status: "occupied",
},
{
    roomCode: "CR-109B",
    roomName: "Workshop Room",
    location: "South Wing, Level 2",
    size: "Large",
    numberOfSeats: 25,
    additionalFacilities: ["Air Conditioner", "Projector", "Whiteboard"],
    imageFile: "room-9.jpg",
    status: "available",
},
{
    roomCode: "CR-110C",
    roomName: "Briefing Room",
    location: "East Wing, Level 1",
    size: "Small",
    numberOfSeats: 5,
    additionalFacilities: ["Air Conditioner"],
    imageFile: "room-10.jpg",
    status: "occupied",
},
];
  