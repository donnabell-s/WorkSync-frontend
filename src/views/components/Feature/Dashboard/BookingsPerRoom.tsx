import React, { useState, useEffect, useMemo } from 'react';
import {
  Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart,
} from 'recharts';
import { DatePicker } from '../../UI';
import { dashboardService } from '@/services/dashboard.service';
import { tooltipStyleConfig, axisConfig, chartColors } from './config';
import { NoDataState, ChartDescription } from './components';

interface ChartDataItem {
  day: string;
  bookings: number;
  utilization: number;
}

const BookingsPerRoom: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const handleWeekChange = (date: Date) => {
    setSelectedWeek(date);
  };

  // Get start and end dates for the selected week
  const { startDate, endDate } = useMemo(() => {
    const start = new Date(selectedWeek);
    start.setDate(start.getDate() - start.getDay()); // Go to Sunday
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Go to Saturday
    
    return {
      startDate: start.toISOString().split('T')[0], // yyyy-MM-dd format
      endDate: end.toISOString().split('T')[0]
    };
  }, [selectedWeek]);

  // Fetch booking trend data
  useEffect(() => {
    const fetchBookingsTrend = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const trendData = await dashboardService.getBookingsTrend(startDate, endDate);
        
        // Transform API data to match chart format
        const transformedData = trendData.map(item => ({
          day: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
          bookings: item.bookingsCount,
          utilization: Math.round(item.utilizationPercentage * 100) / 100 // Round to 2 decimal places
        }));
        
        setData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch booking trends');
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingsTrend();
  }, [startDate, endDate]);

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
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-600">Loading...</div>
              <div className="text-sm text-gray-500">Fetching booking trends</div>
            </div>
          </div>
        ) : error ? (
          <NoDataState
            title="Error loading data"
            description={`${error}<br />Please try again later or contact support if the problem persists.`}
            icon="chart"
          />
        ) : hasData ? (
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