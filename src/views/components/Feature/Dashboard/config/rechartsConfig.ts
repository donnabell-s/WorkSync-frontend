import type { TooltipStyleConfig } from '../types';

/**
 * Shared tooltip styling configuration for Recharts
 */
export const tooltipStyleConfig: TooltipStyleConfig = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '0.375rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  padding: '8px',
  fontSize: '13px',
  color: '#1f2937'
};

/**
 * Recharts axis configuration
 */
export const axisConfig = {
  xAxis: {
    style: { 
      textAnchor: 'middle', 
      fontSize: 12, 
      fontWeight: 'bold', 
      fill: '#1F2937' 
    },
    tick: { 
      fontSize: 12, 
      fontWeight: 'bold', 
      fill: '#9F9F9F' 
    }
  },
  yAxis: {
    style: { 
      textAnchor: 'middle', 
      fontSize: 12, 
      fontWeight: 'bold', 
      fill: '#1F2937' 
    },
    tick: { 
      fontSize: 12, 
      fontWeight: 'bold', 
      fill: '#9F9F9F' 
    }
  }
};

/**
 * Chart color configuration
 */
export const chartColors = {
  primary: '#1E40AF',
  secondary: '#EF4444',
  grid: '#eee'
};