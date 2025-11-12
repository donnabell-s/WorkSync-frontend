import type { ApexOptions } from 'apexcharts';
import { findRoomNameByNumber } from '../utils';

/**
 * Base ApexCharts options for heatmap charts
 */
export const createHeatmapOptions = (): ApexOptions => ({
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
      const roomName = findRoomNameByNumber(roomNumber);

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
});