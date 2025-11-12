import React, { useState } from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart,
} from 'recharts';
import { DatePicker } from '../../UI';

// Sample weekly data - in a real app this would come from an API
const sampleWeeklyData: { [key: string]: any[] } = {
  '2025-11-02': [ // Week of Nov 2-8, 2025
    { day: 'Sun', bookings: 12, utilization: 60 },
    { day: 'Mon', bookings: 18, utilization: 75 },
    { day: 'Tue', bookings: 10, utilization: 50 },
    { day: 'Wed', bookings: 15, utilization: 80 },
    { day: 'Thu', bookings: 20, utilization: 90 },
    { day: 'Fri', bookings: 14, utilization: 65 },
    { day: 'Sat', bookings: 8, utilization: 40 },
  ],
  '2025-11-09': [ // Week of Nov 9-15, 2025
    { day: 'Sun', bookings: 8, utilization: 45 },
    { day: 'Mon', bookings: 22, utilization: 85 },
    { day: 'Tue', bookings: 16, utilization: 70 },
    { day: 'Wed', bookings: 19, utilization: 88 },
    { day: 'Thu', bookings: 25, utilization: 95 },
    { day: 'Fri', bookings: 18, utilization: 78 },
    { day: 'Sat', bookings: 12, utilization: 55 },
  ],
  '2025-11-16': [ // Week of Nov 16-22, 2025
    { day: 'Sun', bookings: 15, utilization: 65 },
    { day: 'Mon', bookings: 20, utilization: 82 },
    { day: 'Tue', bookings: 14, utilization: 68 },
    { day: 'Wed', bookings: 17, utilization: 75 },
    { day: 'Thu', bookings: 23, utilization: 92 },
    { day: 'Fri', bookings: 16, utilization: 72 },
    { day: 'Sat', bookings: 10, utilization: 48 },
  ],
  '2025-11-23': [ // Week of Nov 23-29, 2025
    { day: 'Sun', bookings: 12, utilization: 60 },
    { day: 'Mon', bookings: 18, utilization: 75 },
    { day: 'Tue', bookings: 10, utilization: 50 },
    { day: 'Wed', bookings: 15, utilization: 80 },
    { day: 'Thu', bookings: 20, utilization: 90 },
    { day: 'Fri', bookings: 14, utilization: 65 },
    { day: 'Sat', bookings: 8, utilization: 40 },
  ]
};

const getWeekStart = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.getFullYear(), date.getMonth(), diff);
};

const formatWeekKey = (date: Date): string => {
  const weekStart = getWeekStart(date);
  const year = weekStart.getFullYear();
  const month = String(weekStart.getMonth() + 1).padStart(2, '0');
  const day = String(weekStart.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const BookingsPerRoom: React.FC = () => {
    const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
    
    const handleWeekChange = (date: Date) => {
        setSelectedWeek(date);
    };

    const weekKey = formatWeekKey(selectedWeek);
    const data = sampleWeeklyData[weekKey]; // Don't fallback to default week
    const hasData = data && data.length > 0;

    return (
        <div className='h-full w-full flex flex-col gap-3'>
            <div className='flex justify-between items-center mb-3'>
                <h2 className='font-bold text-[#1F2937]'>
                    Bookings per Day (Trend Over Time)
                </h2>
                <DatePicker 
                    variant="weeks" 
                    onDateChange={handleWeekChange}
                    initialDate={selectedWeek}
                />
            </div>
            <div className='flex-1 min-h-0 pt-2'>
                {hasData ? (
                    <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="day"
                            label={{
                                value: 'Day',
                                position: 'insideBottom',
                                offset: 2,
                                dy: 4,
                                style: { textAnchor: 'middle', fontSize: 12, fontWeight: 'bold', fill: '#1F2937' },
                            }}
                            tick={{ fontSize: 12, fontWeight: 'bold', fill: '#9F9F9F' }}
                        />
                        <YAxis
                            yAxisId="left"
                            label={{
                                value: 'Bookings',
                                angle: -90,
                                position: 'insideLeft',
                                dx: 6,
                                style: { textAnchor: 'middle', fontSize: 12, fontWeight: 'bold', fill: '#1F2937' },
                            }}
                            tick={{ fontSize: 12, fontWeight: 'bold', fill: '#9F9F9F' }}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            label={{
                                value: 'Utilization (%)',
                                angle: 90,
                                position: 'insideRight',
                                dx: -6,
                                style: { textAnchor: 'middle', fontSize: 12, fontWeight: 'bold', fill: '#1F2937' },
                            }}
                            tick={{ fontSize: 12, fontWeight: 'bold', fill: '#9F9F9F' }}
                        />
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.375rem',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                                padding: '8px',
                                fontSize: '13spx',
                                color: '#1f2937'
                            }}
                            labelStyle={{
                                fontWeight: 'bold',
                                marginBottom: '0px',
                                color: '#1f2937'
                            }}
                            itemStyle={{
                                color: '#1f2937',
                                padding: ''
                            }}
                        />
                        <Bar
                            yAxisId="left"
                            dataKey="bookings"
                            name="Number of Bookings"
                            fill="#1E40AF"
                            barSize={43}
                            radius={[10, 10, 0, 0]}
                        />
                        <Line
                            yAxisId="right"
                            type="linear"
                            dataKey="utilization"
                            name="Utilization (%)"
                            stroke="#EF4444"
                            strokeWidth={3}
                            dot={{ r: 4, stroke: '#EF4444', strokeWidth: 2, fill: '#EF4444' }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
                ) : (
                    <div className="h-full flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-gray-400 mb-2">
                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 mb-1">No data available</h3>
                            <p className="text-xs text-gray-500">
                                No booking data found for the selected week.<br />
                                Please select a different week or check back later.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div className='p-5 text-sm text-center flex flex-col gap-1 text-gray-600'>
                <span><strong>Y1 | Bookings</strong> - Number of bookings / Count</span>
                <span><strong>Y2 | Utilization</strong> - Total Available Capacity Booked / Percentage (%)</span>
                <span><strong>X | Day</strong> - Day of the Week</span>
            </div>
        </div>
    );
};

export default BookingsPerRoom;