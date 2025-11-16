import React from 'react';
import { AdminButton } from '../../../UI';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Reusable pagination controls component
 */
const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#1F2937] font-medium">
        Page {currentPage + 1} of {totalPages}
      </span>
      <AdminButton 
        className="py-2 bg-gray-700" 
        onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
        disabled={currentPage === 0} 
        label="<" 
      />
      <AdminButton 
        className="py-2 bg-gray-700" 
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
        disabled={currentPage === totalPages - 1} 
        label=">" 
      />
    </div>
  );
};

export default PaginationControls;