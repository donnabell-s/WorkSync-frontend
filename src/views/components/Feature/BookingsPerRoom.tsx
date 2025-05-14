import React from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart,
} from 'recharts';

const data = [
    { day: 'Sun', bookings: 12, utilization: 60 },
    { day: 'Mon', bookings: 18, utilization: 75 },
    { day: 'Tue', bookings: 10, utilization: 50 },
    { day: 'Wed', bookings: 15, utilization: 80 },
    { day: 'Thu', bookings: 20, utilization: 90 },
    { day: 'Fri', bookings: 14, utilization: 65 },
    { day: 'Sat', bookings: 8, utilization: 40 },
];

const BookingsPerRoom: React.FC = () => {
    return (
        <div className='h-45 w-100'>
            <h2 className='text-center font-bold text-[#1F2937] mb-3'>
            Bookings per Day (Trend Over Time)
            </h2>
            <ResponsiveContainer>
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
                <Tooltip />
                <Bar
                    yAxisId="left"
                    dataKey="bookings"
                    name="Number of Bookings"
                    fill="#1E40AF"
                    barSize={22}
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
        </div>
    );
};

export default BookingsPerRoom;