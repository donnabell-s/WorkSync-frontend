import React from 'react';

interface ChartDescriptionProps {
  descriptions: {
    label: string;
    description: string;
  }[];
}

// Tooltip component for chart descriptions
const ChartDescription: React.FC<ChartDescriptionProps> = ({ descriptions }) => {
  return (
    <div className='p-5 text-sm text-center flex flex-col gap-1 text-gray-600'>
      {descriptions.map((item, index) => (
        <span key={index}>
          <strong>{item.label}</strong> - {item.description}
        </span>
      ))}
    </div>
  );
};

export default ChartDescription;