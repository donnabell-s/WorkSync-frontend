import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { AdminButton, DatePicker } from '../../UI';

// Room data with room numbers and names
const roomData: { [room: string]: { number: string; name: string } } = {
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
    // 10 new rooms
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

// Sample daily heatmap data - in a real app this would come from an API
const sampleDailyData: { [key: string]: { [room: string]: { [hour: number]: number } } } = {
  '2025-11-13': { // Wednesday data
    'Conference Room': { 8: 30, 9: 45, 10: 60, 11: 80, 12: 90, 13: 85, 14: 70, 15: 65, 16: 50, 17: 40, 18: 25 },
    'Skyline Room': { 8: 20, 9: 35, 10: 55, 11: 82, 12: 88, 13: 75, 14: 68, 15: 60, 16: 45, 17: 30, 18: 15 },
    'Training Room': { 8: 40, 9: 50, 10: 65, 11: 85, 12: 85, 13: 78, 14: 72, 15: 62, 16: 55, 17: 43, 18: 35 },
    'Grand Hall': { 8: 25, 9: 40, 10: 50, 11: 75, 12: 95, 13: 90, 14: 80, 15: 70, 16: 60, 17: 45, 18: 30 },
    'Sky Hall': { 8: 35, 9: 48, 10: 58, 11: 70, 12: 82, 13: 88, 14: 75, 15: 68, 16: 52, 17: 38, 18: 28 },
    'Board Room': { 8: 15, 9: 30, 10: 45, 11: 70, 12: 85, 13: 90, 14: 75, 15: 60, 16: 45, 17: 35, 18: 20 },
    'Meeting Room A': { 8: 45, 9: 60, 10: 70, 11: 85, 12: 80, 13: 75, 14: 65, 15: 50, 16: 40, 17: 30, 18: 25 },
    'Meeting Room B': { 8: 25, 9: 40, 10: 55, 11: 75, 12: 90, 13: 85, 14: 70, 15: 55, 16: 45, 17: 35, 18: 20 },
    'Innovation Lab': { 8: 50, 9: 65, 10: 80, 11: 90, 12: 85, 13: 80, 14: 75, 15: 60, 16: 50, 17: 40, 18: 30 },
    'Presentation Hall': { 8: 20, 9: 35, 10: 50, 11: 80, 12: 95, 13: 90, 14: 85, 15: 70, 16: 55, 17: 40, 18: 25 },
    'Executive Suite': { 8: 10, 9: 20, 10: 35, 11: 50, 12: 65, 13: 70, 14: 60, 15: 45, 16: 35, 17: 20, 18: 10 },
    'Strategy Room': { 8: 15, 9: 25, 10: 40, 11: 55, 12: 70, 13: 75, 14: 65, 15: 50, 16: 40, 17: 25, 18: 15 },
    'Collaboration Hub': { 8: 20, 9: 30, 10: 50, 11: 65, 12: 80, 13: 85, 14: 70, 15: 55, 16: 45, 17: 30, 18: 20 },
    'Workshop Room': { 8: 25, 9: 35, 10: 55, 11: 70, 12: 85, 13: 80, 14: 65, 15: 50, 16: 40, 17: 25, 18: 15 },
    'Innovation Center': { 8: 30, 9: 45, 10: 60, 11: 75, 12: 90, 13: 85, 14: 70, 15: 60, 16: 50, 17: 35, 18: 25 },
    'Lounge Area': { 8: 10, 9: 20, 10: 35, 11: 50, 12: 65, 13: 70, 14: 60, 15: 45, 16: 35, 17: 20, 18: 10 },
    'Focus Room': { 8: 15, 9: 25, 10: 40, 11: 55, 12: 70, 13: 75, 14: 65, 15: 50, 16: 40, 17: 25, 18: 15 },
    'Brainstorming Room': { 8: 20, 9: 35, 10: 50, 11: 65, 12: 80, 13: 85, 14: 70, 15: 55, 16: 45, 17: 30, 18: 20 },
    'Media Room': { 8: 25, 9: 40, 10: 55, 11: 70, 12: 85, 13: 80, 14: 65, 15: 50, 16: 40, 17: 25, 18: 15 },
    'Networking Hall': { 8: 30, 9: 45, 10: 60, 11: 75, 12: 90, 13: 85, 14: 70, 15: 60, 16: 50, 17: 35, 18: 25 }
  },
  '2025-11-14': { // Thursday data (different pattern)
    'Conference Room': { 8: 45, 9: 60, 10: 75, 11: 85, 12: 95, 13: 90, 14: 80, 15: 70, 16: 55, 17: 45, 18: 30 },
    'Skyline Room': { 8: 35, 9: 50, 10: 65, 11: 88, 12: 92, 13: 85, 14: 75, 15: 65, 16: 50, 17: 35, 18: 20 },
    'Training Room': { 8: 50, 9: 65, 10: 75, 11: 90, 12: 90, 13: 85, 14: 80, 15: 70, 16: 60, 17: 50, 18: 40 },
    'Grand Hall': { 8: 40, 9: 55, 10: 70, 11: 85, 12: 100, 13: 95, 14: 85, 15: 75, 16: 65, 17: 50, 18: 35 },
    'Sky Hall': { 8: 50, 9: 63, 10: 73, 11: 80, 12: 87, 13: 93, 14: 80, 15: 73, 16: 57, 17: 43, 18: 33 },
    'Board Room': { 8: 25, 9: 40, 10: 55, 11: 80, 12: 90, 13: 95, 14: 80, 15: 65, 16: 50, 17: 40, 18: 25 },
    'Meeting Room A': { 8: 55, 9: 70, 10: 80, 11: 90, 12: 85, 13: 80, 14: 70, 15: 55, 16: 45, 17: 35, 18: 30 },
    'Meeting Room B': { 8: 35, 9: 50, 10: 65, 11: 85, 12: 95, 13: 90, 14: 75, 15: 60, 16: 50, 17: 40, 18: 25 },
    'Innovation Lab': { 8: 60, 9: 75, 10: 85, 11: 95, 12: 90, 13: 85, 14: 80, 15: 65, 16: 55, 17: 45, 18: 35 },
    'Presentation Hall': { 8: 30, 9: 45, 10: 60, 11: 85, 12: 100, 13: 95, 14: 90, 15: 75, 16: 60, 17: 45, 18: 30 },
    'Executive Suite': { 8: 20, 9: 30, 10: 45, 11: 60, 12: 75, 13: 80, 14: 70, 15: 55, 16: 45, 17: 30, 18: 20 },
    'Strategy Room': { 8: 25, 9: 35, 10: 50, 11: 65, 12: 80, 13: 85, 14: 75, 15: 60, 16: 50, 17: 35, 18: 25 },
    'Collaboration Hub': { 8: 30, 9: 40, 10: 60, 11: 75, 12: 85, 13: 90, 14: 75, 15: 60, 16: 50, 17: 35, 18: 25 },
    'Workshop Room': { 8: 35, 9: 45, 10: 65, 11: 80, 12: 90, 13: 85, 14: 70, 15: 55, 16: 45, 17: 30, 18: 20 },
    'Innovation Center': { 8: 40, 9: 55, 10: 70, 11: 85, 12: 95, 13: 90, 14: 75, 15: 65, 16: 55, 17: 40, 18: 30 },
    'Lounge Area': { 8: 20, 9: 30, 10: 45, 11: 60, 12: 75, 13: 80, 14: 70, 15: 55, 16: 45, 17: 30, 18: 20 },
    'Focus Room': { 8: 25, 9: 35, 10: 50, 11: 65, 12: 80, 13: 85, 14: 75, 15: 60, 16: 50, 17: 35, 18: 25 },
    'Brainstorming Room': { 8: 30, 9: 45, 10: 60, 11: 75, 12: 85, 13: 90, 14: 75, 15: 60, 16: 50, 17: 35, 18: 25 },
    'Media Room': { 8: 35, 9: 50, 10: 65, 11: 80, 12: 90, 13: 85, 14: 70, 15: 55, 16: 45, 17: 30, 18: 20 },
    'Networking Hall': { 8: 40, 9: 55, 10: 70, 11: 85, 12: 95, 13: 90, 14: 75, 15: 65, 16: 55, 17: 40, 18: 30 }
  }
};

const formatDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formatted = `${year}-${month}-${day}`;
    console.log('[PRINTING SELECTED DAY]' + formatted);
    return formatted;
};

// Heatmap data for new rooms
const heatmapData: { [room: string]: { [hour: number]: number } } = {
    'Conference Room': { 8: 30, 9: 45, 10: 60, 11: 80, 12: 90, 13: 85, 14: 70, 15: 65, 16: 50, 17: 40, 18: 25 },
    'Skyline Room': { 8: 20, 9: 35, 10: 55, 11: 82, 12: 88, 13: 75, 14: 68, 15: 60, 16: 45, 17: 30, 18: 15 },
    'Training Room': { 8: 40, 9: 50, 10: 65, 11: 85, 12: 85, 13: 78, 14: 72, 15: 62, 16: 55, 17: 43, 18: 35 },
    'Grand Hall': { 8: 25, 9: 40, 10: 50, 11: 75, 12: 95, 13: 90, 14: 80, 15: 70, 16: 60, 17: 45, 18: 30 },
    'Sky Hall': { 8: 35, 9: 48, 10: 58, 11: 70, 12: 82, 13: 88, 14: 75, 15: 68, 16: 52, 17: 38, 18: 28 },
    'Board Room': { 8: 15, 9: 30, 10: 45, 11: 70, 12: 85, 13: 90, 14: 75, 15: 60, 16: 45, 17: 35, 18: 20 },
    'Meeting Room A': { 8: 45, 9: 60, 10: 70, 11: 85, 12: 80, 13: 75, 14: 65, 15: 50, 16: 40, 17: 30, 18: 25 },
    'Meeting Room B': { 8: 25, 9: 40, 10: 55, 11: 75, 12: 90, 13: 85, 14: 70, 15: 55, 16: 45, 17: 35, 18: 20 },
    'Innovation Lab': { 8: 50, 9: 65, 10: 80, 11: 90, 12: 85, 13: 80, 14: 75, 15: 60, 16: 50, 17: 40, 18: 30 },
    'Presentation Hall': { 8: 20, 9: 35, 10: 50, 11: 80, 12: 95, 13: 90, 14: 85, 15: 70, 16: 55, 17: 40, 18: 25 },
    'Executive Suite': { 8: 10, 9: 20, 10: 35, 11: 50, 12: 65, 13: 70, 14: 60, 15: 45, 16: 35, 17: 20, 18: 10 },
    'Strategy Room': { 8: 15, 9: 25, 10: 40, 11: 55, 12: 70, 13: 75, 14: 65, 15: 50, 16: 40, 17: 25, 18: 15 },
    'Collaboration Hub': { 8: 20, 9: 30, 10: 50, 11: 65, 12: 80, 13: 85, 14: 70, 15: 55, 16: 45, 17: 30, 18: 20 },
    'Workshop Room': { 8: 25, 9: 35, 10: 55, 11: 70, 12: 85, 13: 80, 14: 65, 15: 50, 16: 40, 17: 25, 18: 15 },
    'Innovation Center': { 8: 30, 9: 45, 10: 60, 11: 75, 12: 90, 13: 85, 14: 70, 15: 60, 16: 50, 17: 35, 18: 25 },
    'Lounge Area': { 8: 10, 9: 20, 10: 35, 11: 50, 12: 65, 13: 70, 14: 60, 15: 45, 16: 35, 17: 20, 18: 10 },
    'Focus Room': { 8: 15, 9: 25, 10: 40, 11: 55, 12: 70, 13: 75, 14: 65, 15: 50, 16: 40, 17: 25, 18: 15 },
    'Brainstorming Room': { 8: 20, 9: 35, 10: 50, 11: 65, 12: 80, 13: 85, 14: 70, 15: 55, 16: 45, 17: 30, 18: 20 },
    'Media Room': { 8: 25, 9: 40, 10: 55, 11: 70, 12: 85, 13: 80, 14: 65, 15: 50, 16: 40, 17: 25, 18: 15 },
    'Networking Hall': { 8: 30, 9: 45, 10: 60, 11: 75, 12: 90, 13: 85, 14: 70, 15: 60, 16: 50, 17: 35, 18: 25 }
};


const rooms = Object.keys(heatmapData);
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const ROOMS_PER_PAGE = 10;

// Generate series data for ApexCharts with pagination
const generateSeriesData = (currentRooms: string[], dataSource: { [room: string]: { [hour: number]: number } } = heatmapData) => {
    return currentRooms.map(room => ({
        name: roomData[room].number, // Use room number as series name
        data: hours.map((hour) => ({
            x: `${hour}:00`,
            y: dataSource[room]?.[hour] || 0
        }))
    }));
};

const PeakUsageTimes: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const totalPages = Math.ceil(rooms.length / ROOMS_PER_PAGE);

    const handleDateChange = (date: Date) => {
        console.log('[DATE CHANGED TO]' + date.toISOString().split('T')[0]);
        setSelectedDate(date);
    };

    // Get data for selected date, fallback to default data if not found
    const dateKey = formatDateKey(selectedDate);
    const currentHeatmapData = sampleDailyData[dateKey];
    const hasData = currentHeatmapData !== undefined;

    // Get current page rooms
    const startIndex = currentPage * ROOMS_PER_PAGE;
    const endIndex = startIndex + ROOMS_PER_PAGE;
    const currentRooms = rooms.slice(startIndex, endIndex);

    const series = hasData ? generateSeriesData(currentRooms, currentHeatmapData) : [];

    const options: ApexOptions = {
        chart: {
            type: 'heatmap',
            toolbar: {
                show: false
            },
            offsetY: 0,
        },
        grid: {
            padding: {
                top: 0
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#fff'],
                fontSize: '10px',
                fontWeight: 'bold'
            }
        },
        colors: ['#008FFB'],
        xaxis: {
            type: 'category',
            title: {
                text: 'Time of Day',
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#1F2937'
                },
            },
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    colors: ['#9F9F9F']
                }
            }
        },
        yaxis: {
            title: {
                text: 'Rooms',
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#1F2937'
                }
            },
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    colors: ['#9F9F9F']
                }
            }
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 0,
                useFillColorAsStroke: true,
                colorScale: {
                    ranges: [
                        {
                            from: 0,
                            to: 10,
                            name: '0-10%',
                            color: '#D1D5DB'
                        },
                        {
                            from: 11,
                            to: 30,
                            name: '11-30%',
                            color: '#3B82F6'
                        },
                        {
                            from: 31,
                            to: 50,
                            name: '31-50%',
                            color: '#10B981'
                        },
                        {
                            from: 51,
                            to: 70,
                            name: '51-70%',
                            color: '#F59E0B'
                        },
                        {
                            from: 71,
                            to: 89,
                            name: '71-89%',
                            color: '#EF4444'
                        },
                        {
                            from: 90,
                            to: 100,
                            name: '90%+',
                            color: '#DC2626'
                        }
                    ]
                }
            }
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const roomNumber = w.globals.seriesNames[seriesIndex];
                const hour = w.globals.labels[dataPointIndex];
                const occupancy = series[seriesIndex][dataPointIndex];

                // Find the room name from room number
                const roomEntry = Object.entries(roomData).find(([, data]) => data.number === roomNumber);
                const roomName = roomEntry ? roomEntry[1].name : roomNumber;

                return `<div class="p-2 bg-white border border-[#e5e7eb] rounded shadow">
                    <div class="font-bold">${roomNumber} - ${roomName}</div>
                    <div>Time: ${hour}</div>
                    <div>Occupancy: ${occupancy}%</div>
                </div>`;
            }
        },
        legend: {
            show: false
        }
    };

    return (
        <div className="h-full w-full flex flex-col">
            {/* Header with pagination controls */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <h2 className='font-bold text-[#1F2937]'>
                        Peak Usage Times Heatmap
                    </h2>
                    <DatePicker 
                        variant="days" 
                        onDateChange={handleDateChange}
                        initialDate={selectedDate}
                    />
                </div>
                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[#1F2937] font-medium">
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <AdminButton className="py-2 bg-gray-700" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                            disabled={currentPage === 0} label="<" />
                        <AdminButton className="py-2 bg-gray-700" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                            disabled={currentPage === totalPages - 1} label=">" />
                    </div>
                )}
            </div>

            {/* Chart container */}
            <div className="flex-1">
                {hasData ? (
                    <Chart
                        options={options}
                        series={series}
                        type="heatmap"
                        height="100%"
                    />
                ) : (
                    <div className="h-full flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-gray-400 mb-2">
                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 7 5 5 5-5" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 mb-1">No data available</h3>
                            <p className="text-xs text-gray-500">
                                No occupancy data found for {selectedDate.toLocaleDateString('en-US', { 
                                    month: 'long', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                })}.<br />
                                Please select a different date or check back later.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className='flex justify-between items-end'>
                {hasData && (
                    <>
                        {/* Room info for current page */}
                        <div className="text-start">
                            <span className="text-xs text-[#6B7280]">
                                Showing rooms: <br /> {currentRooms.map(room => roomData[room].number).join(', ')}
                            </span>
                        </div>

                        {/* Color spectrum legend */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-xs font-bold text-[#1F2937]">Occupancy Rate %</div>
                            <div className="flex items-center gap-1">
                                {/* Color spectrum bar */}
                                <div className="flex rounded overflow-hidden border border-gray-300">
                                    <div className="w-8 h-4 bg-[#D1D5DB] flex items-center justify-center">
                                        <span className="text-xs text-gray-700 font-bold">0</span>
                                    </div>
                                    <div className="w-8 h-4 bg-[#3B82F6] flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">20</span>
                                    </div>
                                    <div className="w-8 h-4 bg-[#10B981] flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">40</span>
                                    </div>
                                    <div className="w-8 h-4 bg-[#F59E0B] flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">60</span>
                                    </div>
                                    <div className="w-8 h-4 bg-[#EF4444] flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">80</span>
                                    </div>
                                    <div className="w-8 h-4 bg-[#DC2626] flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">100</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-48 text-xs text-[#6B7280]">
                                <span>Low Usage</span>
                                <span>High Usage</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PeakUsageTimes;
