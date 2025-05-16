import React, { useState } from 'react';
import './ViewFormsLayout.css';

interface ViewFormsLayoutProps {
  title: string;
  searchPlaceholder: string;
  items: Array<{
    id: string;
    columns: string[];
    status: 'ACTIVE' | 'INACTIVE';
  }>;
  columns: string[];
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
  renderActions?: (id: string) => React.ReactNode;
}

const ViewFormsLayout: React.FC<ViewFormsLayoutProps> = ({
  title,
  searchPlaceholder,
  items,
  columns,
  totalItems,
  currentPage,
  onPageChange,
  onAdd,
  onEdit,
  renderActions,
}) => {
  const [sortBy, setSortBy] = useState(columns[0]); // Default sort by first column
  const startItem = (currentPage - 1) * 8 + 1;
  const endItem = Math.min(currentPage * 8, totalItems);

  // Sorting logic (simplified for demo; in a real app, sort the items array)
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    // Add sorting logic here if needed (e.g., sort items array)
  };

  return (
    <div className="view-forms-container">
      <h2 className="subtitle">{title}</h2>
      
      <div className="search-and-sort-container">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="search-input"
          />
        </div>
        <div className="sort-container">
          <label>Sort by: </label>
          <select value={sortBy} onChange={handleSortChange} className="sort-select">
            {columns.map((column, index) => (
              <option key={index} value={column}>{column}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="table-container">
        <table className="forms-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {item.columns.map((column, colIndex) => (
                  <td key={colIndex}>{column}</td>
                ))}
                <td className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </td>
                <td className="actions">
                  {renderActions ? renderActions(item.id) : (
                    <>
                      <button onClick={() => onEdit(item.id)} className="edit-btn">
                        <span className="edit-icon">✏️</span>
                      </button>
                      <button className="more-btn">⋮</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination-container">
        <span className="pagination-info">
          Showing {startItem}-{endItem} of {totalItems} {title.toLowerCase()}
        </span>
        <div className="pagination-controls">
          <button 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-arrow"
          >
            &lt;
          </button>
          <span className="current-page">{currentPage}</span>
          <button 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={endItem >= totalItems}
            className="pagination-arrow"
          >
            &gt;
          </button>
          <button onClick={onAdd} className="add-button">
            Add {title.slice(0, -10)} {/* Remove " MANAGEMENT" from title */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewFormsLayout;