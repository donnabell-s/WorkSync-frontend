import { RoomDataMap } from '../types';

export const roomData: RoomDataMap = {
  'Conference Room': { number: 'R001', name: 'Conference Room' },
  'Skyline Room': { number: 'R002', name: 'Skyline Room' },
  'Training Room': { number: 'R003', name: 'Training Room' },
  'Grand Hall': { number: 'R004', name: 'Grand Hall' },
  'Sky Hall': { number: 'R005', name: 'Sky Hall' },
  'Board Room': { number: 'R006', name: 'Board Room' },
  'Meeting Room A': { number: 'R007', name: 'Meeting Room A' },
  'Meeting Room B': { number: 'R008', name: 'Meeting Room B' },
  'Innovation Lab': { number: 'R009', name: 'Innovation Lab' },
  'Presentation Hall': { number: 'R010', name: 'Presentation Hall' },
  'Executive Suite': { number: 'R011', name: 'Executive Suite' },
  'Strategy Room': { number: 'R012', name: 'Strategy Room' },
  'Collaboration Hub': { number: 'R013', name: 'Collaboration Hub' },
  'Workshop Room': { number: 'R014', name: 'Workshop Room' },
  'Innovation Center': { number: 'R015', name: 'Innovation Center' },
  'Lounge Area': { number: 'R016', name: 'Lounge Area' },
  'Focus Room': { number: 'R017', name: 'Focus Room' },
  'Brainstorming Room': { number: 'R018', name: 'Brainstorming Room' },
  'Media Room': { number: 'R019', name: 'Media Room' },
  'Networking Hall': { number: 'R020', name: 'Networking Hall' }
};

export const rooms = Object.keys(roomData);
export const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
export const ROOMS_PER_PAGE = 10;