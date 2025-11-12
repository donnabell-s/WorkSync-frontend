import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { DatePicker } from '../../UI';
import { 
  sampleDailyData, 
  rooms, 
  ROOMS_PER_PAGE 
} from './data';
import { 
  formatDateKey, 
  generateSeriesData, 
  getPaginatedRooms 
} from './utils';
import { createHeatmapOptions } from './config';
import { 
  NoDataState, 
  HeatmapLegend, 
  PaginationControls, 
  RoomInfoDisplay 
} from './components';

const PeakUsageTimes: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    console.log('[DATE CHANGED TO]' + formatDateKey(date));
    setSelectedDate(date);
  };

  // Get data for selected date
  const dateKey = formatDateKey(selectedDate);
  const currentHeatmapData = sampleDailyData[dateKey];
  const hasData = currentHeatmapData !== undefined;

  // Get paginated rooms
  const { currentRooms, totalPages } = getPaginatedRooms(rooms, currentPage, ROOMS_PER_PAGE);

  // Generate chart series
  const series = hasData ? generateSeriesData(currentRooms, currentHeatmapData) : [];

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
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
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