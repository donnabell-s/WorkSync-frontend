import React from 'react';

interface NoDataStateProps {
  title: string;
  description: string;
  icon?: 'chart' | 'calendar';
}

/**
 * Reusable no-data state component for charts
 */
const NoDataState: React.FC<NoDataStateProps> = ({ 
  title, 
  description, 
  icon = 'chart' 
}) => {
  const ChartIcon = () => (
    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 7 5 5 5-5" />
    </svg>
  );

  return (
    <div className="h-full flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 mb-2">
          {icon === 'chart' ? <ChartIcon /> : <CalendarIcon />}
        </div>
        <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};

export default NoDataState;