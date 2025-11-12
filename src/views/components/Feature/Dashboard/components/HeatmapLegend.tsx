import React from 'react';

/**
 * Color spectrum legend for heatmap visualization
 */
const HeatmapLegend: React.FC = () => {
  return (
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
  );
};

export default HeatmapLegend;