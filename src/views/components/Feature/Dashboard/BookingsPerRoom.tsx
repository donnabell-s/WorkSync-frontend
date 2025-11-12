import React, { useState } from 'react';
import {
  Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart,
} from 'recharts';
import { DatePicker } from '../../UI';
import { sampleWeeklyData } from './data';
import { formatWeekKey } from './utils';
import { tooltipStyleConfig, axisConfig, chartColors } from './config';
import { NoDataState, ChartDescription } from './components';

const BookingsPerRoom: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  
  const handleWeekChange = (date: Date) => {
    setSelectedWeek(date);
  };

  const weekKey = formatWeekKey(selectedWeek);
  const data = sampleWeeklyData[weekKey];
  const hasData = data && data.length > 0;

  const chartDescriptions = [
    { label: 'Y1 | Bookings', description: 'Number of bookings / Count' },
    { label: 'Y2 | Utilization', description: 'Total Available Capacity Booked / Percentage (%)' },
    { label: 'X | Day', description: 'Day of the Week' }
  ];

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
              <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                label={{
                  value: 'Day',
                  position: 'insideBottom',
                  offset: 2,
                  dy: 4,
                  style: axisConfig.xAxis.style,
                }}
                tick={axisConfig.xAxis.tick}
              />
              <YAxis
                yAxisId="left"
                label={{
                  value: 'Bookings',
                  angle: -90,
                  position: 'insideLeft',
                  dx: 6,
                  style: axisConfig.yAxis.style,
                }}
                tick={axisConfig.yAxis.tick}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: 'Utilization (%)',
                  angle: 90,
                  position: 'insideRight',
                  dx: -6,
                  style: axisConfig.yAxis.style,
                }}
                tick={axisConfig.yAxis.tick}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: tooltipStyleConfig.backgroundColor,
                  border: tooltipStyleConfig.border,
                  borderRadius: tooltipStyleConfig.borderRadius,
                  boxShadow: tooltipStyleConfig.boxShadow,
                  padding: tooltipStyleConfig.padding,
                  fontSize: tooltipStyleConfig.fontSize,
                  color: tooltipStyleConfig.color
                }}
                labelStyle={{
                  fontWeight: 'bold',
                  marginBottom: '0px',
                  color: tooltipStyleConfig.color
                }}
                itemStyle={{
                  color: tooltipStyleConfig.color,
                  padding: ''
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="bookings"
                name="Number of Bookings"
                fill={chartColors.primary}
                barSize={43}
                radius={[10, 10, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="linear"
                dataKey="utilization"
                name="Utilization (%)"
                stroke={chartColors.secondary}
                strokeWidth={3}
                dot={{ r: 4, stroke: chartColors.secondary, strokeWidth: 2, fill: chartColors.secondary }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <NoDataState
            title="No data available"
            description="No booking data found for the selected week.<br />Please select a different week or check back later."
            icon="chart"
          />
        )}
      </div>
      
      <ChartDescription descriptions={chartDescriptions} />
    </div>
  );
};

export default BookingsPerRoom;