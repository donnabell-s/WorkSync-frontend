import React, { useState, useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { DatePicker } from '../../UI';
import { dashboardService, PeakUsageItem } from '@/services/dashboard.service';
import { formatDateKey } from './utils';
import { createHeatmapOptions } from './config';
import { 
  NoDataState, 
  HeatmapLegend, 
  PaginationControls, 
  RoomInfoDisplay 
} from './components';

const ROOMS_PER_PAGE = 10;

const PeakUsageTimes: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [peakUsageData, setPeakUsageData] = useState<PeakUsageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (date: Date) => {
    console.log('[DATE CHANGED TO]' + formatDateKey(date));
    setSelectedDate(date);
    setCurrentPage(0); // Reset to first page when date changes
  };

  // Fetch peak usage data
  useEffect(() => {
    const fetchPeakUsage = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const dateString = selectedDate.toISOString().split('T')[0]; // yyyy-MM-dd format
        const usageData = await dashboardService.getPeakUsage(dateString);
        setPeakUsageData(usageData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch peak usage data');
        setPeakUsageData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeakUsage();
  }, [selectedDate]);

  // Get unique rooms and paginate them
  const { currentRooms, totalPages } = useMemo(() => {
    const uniqueRooms = [...new Set(peakUsageData.map(item => item.roomName))];
    const startIndex = currentPage * ROOMS_PER_PAGE;
    const endIndex = startIndex + ROOMS_PER_PAGE;
    const roomsForCurrentPage = uniqueRooms.slice(startIndex, endIndex);
    
    return {
      currentRooms: roomsForCurrentPage,
      totalPages: Math.ceil(uniqueRooms.length / ROOMS_PER_PAGE)
    };
  }, [peakUsageData, currentPage]);

  // Generate chart series for current page rooms
  const series = useMemo(() => {
    if (!peakUsageData.length || !currentRooms.length) return [];

    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    return currentRooms.map(roomName => ({
      name: roomName,
      data: hours.map(hour => {
        const dataPoint = peakUsageData.find(
          item => item.roomName === roomName && item.hour === hour
        );
        return {
          x: hour,
          y: dataPoint ? Math.round(dataPoint.occupancyRate * 100) / 100 : 0
        };
      })
    }));
  }, [peakUsageData, currentRooms]);

  const hasData = peakUsageData.length > 0;

  // Create chart options
  const options = createHeatmapOptions();

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
        {hasData && totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Chart container */}
      <div className="flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-600">Loading...</div>
              <div className="text-sm text-gray-500">Fetching peak usage data</div>
            </div>
          </div>
        ) : error ? (
          <NoDataState
            title="Error loading data"
            description={`${error}<br />Please try again later or contact support if the problem persists.`}
            icon="calendar"
          />
        ) : hasData ? (
          <Chart
            options={options}
            series={series}
            type="heatmap"
            height="100%"
          />
        ) : (
          <NoDataState
            title="No data available"
            description={`No occupancy data found for ${selectedDate.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}.<br />Please select a different date or check back later.`}
            icon="calendar"
          />
        )}
      </div>

      {/* Footer with room info and legend */}
      <div className='flex justify-between items-end'>
        {hasData && (
          <>
            <RoomInfoDisplay currentRooms={currentRooms} />
            <HeatmapLegend />
          </>
        )}
      </div>
    </div>
  );
};

export default PeakUsageTimes;