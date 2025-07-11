import React, { useState } from 'react';

function FilterBar({ 
  activeFilter, 
  filterValue, 
  onFilterChange, 
  tags, 
  taskCounts,
  onClearCompleted,
  onToggleSort
}) {
  // Component State
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Event Handlers
  const isActive = (filter, value = '') => {
    if (filter === 'tag') {
      return activeFilter === filter && filterValue === value;
    }
    return activeFilter === filter;
  };

  const handleFilterClick = (filter, value = '') => {
    onFilterChange(filter, value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onFilterChange('search', searchTerm.trim());
    }
  };

  const toggleSearch = () => {
    if (showSearch && searchTerm) {
      setSearchTerm('');
      onFilterChange('all');
    }
    setShowSearch(!showSearch);
  };

  // Render
  return (
    <div className="unified-filter-bar">
      <div className="status-chips">
        <button
          className={`status-chip ${isActive('all') ? 'active' : ''}`}
          onClick={() => handleFilterClick('all')}
        >
          All
          {taskCounts.all > 0 && <span className="chip-count">{taskCounts.all}</span>}
        </button>
        
        <button
          className={`status-chip ${isActive('pending') ? 'active' : ''}`}
          onClick={() => handleFilterClick('pending')}
        >
          Active
          {taskCounts.pending > 0 && <span className="chip-count">{taskCounts.pending}</span>}
        </button>
        
        <button
          className={`status-chip ${isActive('completed') ? 'active' : ''}`}
          onClick={() => handleFilterClick('completed')}
        >
          Done
          {taskCounts.completed > 0 && <span className="chip-count">{taskCounts.completed}</span>}
        </button>
        
        {taskCounts.overdue > 0 && (
          <button
            className={`status-chip overdue ${isActive('overdue') ? 'active' : ''}`}
            onClick={() => handleFilterClick('overdue')}
          >
            Overdue
            <span className="chip-count">{taskCounts.overdue}</span>
          </button>
        )}
      </div>

      <div className="tag-pills">
        {tags.map(tag => (
          <button
            key={tag}
            className={`tag-pill ${isActive('tag', tag) ? 'active' : ''}`}
            onClick={() => handleFilterClick('tag', tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="smart-actions">
        <div className="search-container">
          <button
            className={`action-button ${showSearch ? 'active' : ''}`}
            onClick={toggleSearch}
            title="Search tasks"
          >
            <i className="fas fa-search"></i>
          </button>
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="search-dropdown">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="search-input"
                autoFocus
                onBlur={() => !searchTerm && setShowSearch(false)}
              />
            </form>
          )}
        </div>

        {taskCounts.completed > 0 && (
          <button
            className="action-button"
            onClick={onClearCompleted}
            title="Clear completed tasks"
          >
            <i className="fas fa-trash"></i>
          </button>
        )}

        <button
          className="action-button"
          onClick={onToggleSort}
          title="Sort by date"
        >
          <i className="fas fa-sort"></i>
        </button>
      </div>
    </div>
  );
}

export default FilterBar; 