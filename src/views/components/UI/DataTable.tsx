import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type Align = 'left' | 'center' | 'right';

export type DataTableColumn<Row> = {
  key: keyof Row | string;
  header: string;
  width?: string;
  align?: Align;
  className?: string;
  render?: (row: Row) => React.ReactNode;
};

export interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  getRowKey?: (row: Row, index: number) => React.Key;
  emptyMessage?: string;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footer?: React.ReactNode; // If provided, overrides the default footer and disables built-in pagination
  // Built-in pagination and actions
  itemsPerPage?: number;
  initialPage?: number;
  page?: number; // Controlled page number (1-indexed)
  onPageChange?: (page: number) => void;
  showFooter?: boolean; // Defaults to true when using built-in footer
  actionButtonLabel?: string; // Optional primary action button in footer (e.g., "Add User")
  onActionButtonClick?: () => void;
}

const alignClass = (align?: Align) => {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
};

export function DataTable<Row extends Record<string, any>>({
  columns,
  rows,
  getRowKey,
  emptyMessage = 'No records found.',
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  itemsPerPage = 8,
  initialPage = 1,
  page,
  onPageChange,
  showFooter = true,
  actionButtonLabel,
  onActionButtonClick,
}: DataTableProps<Row>) {
  // If a custom footer is provided, we assume external pagination (if any).
  const useBuiltInPagination = !footer;
  const [internalPage, setInternalPage] = React.useState(initialPage);
  const currentPage = page ?? internalPage;
  const setPage = (p: number) => {
    if (onPageChange) onPageChange(p);
    else setInternalPage(p);
  };

  const totalRows = rows.length;
  const startIdx = useBuiltInPagination ? Math.max((currentPage - 1) * itemsPerPage, 0) : 0;
  const endIdx = useBuiltInPagination ? Math.min(currentPage * itemsPerPage, totalRows) : totalRows;
  const displayedRows = useBuiltInPagination ? rows.slice(startIdx, endIdx) : rows;
  const canPrev = currentPage > 1;
  const canNext = currentPage * itemsPerPage < totalRows;

  return (
    <div className={`bg-white shadow-sm ring-1 ring-gray-200 ${className}`}>
      <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-left">
        <thead className={`bg-white relative z-10 shadow-[0_2px_0_rgba(0,0,0,0.12)] ${headerClassName}`}>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wide text-gray-600 ${alignClass(col.align)} ${col.className ?? ''}`}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y divide-gray-100 ${bodyClassName}`}>
          {displayedRows.length > 0 ? (
            displayedRows.map((row, idx) => (
              <tr key={getRowKey ? getRowKey(row, idx) : idx} className="odd:bg-white even:bg-[#FAFAFB] hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`px-6 py-4 text-sm text-gray-800 ${alignClass(col.align)}`}
                  >
                    {col.render
                      ? col.render(row)
                      : // Fallback: try to read property by key
                        (row as any)[col.key as string] ?? ''}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center px-6 py-8 text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      {footer ? (
        <div className="px-6 py-3 bg-white relative z-10 shadow-[0_-1px_0_rgba(0,0,0,0.12)]">{footer}</div>
      ) : (
        showFooter && (
          <div className="px-6 py-3 bg-white relative z-10 shadow-[0_-1px_0_rgba(0,0,0,0.12)] grid grid-cols-3 items-center">
            {/* Left: Range text */}
            <div className="text-sm text-gray-700 justify-self-start">
              {totalRows > 0
                ? `Showing ${useBuiltInPagination ? startIdx + 1 : 1}–${useBuiltInPagination ? endIdx : totalRows} of ${totalRows}`
                : 'No records'}
            </div>
            {/* Center: Pagination controls */}
            <div className="justify-self-center">
              {useBuiltInPagination && (
                <div className="flex items-center gap-9">
                  <button
                    onClick={() => canPrev && setPage(currentPage - 1)}
                    disabled={!canPrev}
                    className="text-[#4B5563]"
                    aria-label="Previous page"
                  >
                    <FaChevronLeft/>
                  </button>
                  <span className="text-sm">{currentPage}</span>
                  <button
                    onClick={() => canNext && setPage(currentPage + 1)}
                    disabled={!canNext}
                    className="text-[#4B5563]"
                    aria-label="Next page"
                  >
                    <FaChevronRight/>
                  </button>
                </div>
              )}
            </div>
            {/* Right: Optional action button */}
            <div className="justify-self-end">
              {actionButtonLabel && (
                <button
                  onClick={onActionButtonClick}
                  className="bg-[#2563EB] text-white text-sm font-semibold px-6 py-2 rounded-md hover:bg-[#1E40AF]"
                >
                  {actionButtonLabel}
                </button>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default DataTable;
