import React, { useState } from 'react';
import { getDateDisplayInfo } from '../utils/dateUtils.js';

function TaskItem({ task, onToggle, onDelete, onUpdateDate }) {
  // State Management
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempDate, setTempDate] = useState('');

  // Event Handlers
  const handleDateClick = () => {
    if (task.dueDate) {
      setTempDate(task.dueDate.substring(0, 10));
    }
    setIsEditingDate(true);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    if (newDate) {
      onUpdateDate(newDate);
    } else {
      onUpdateDate(null);
    }
    setIsEditingDate(false);
  };

  const handleDateBlur = () => {
    setIsEditingDate(false);
  };

  // Derived State and JSX
  const dateInfo = task.dueDate ? getDateDisplayInfo(new Date(task.dueDate)) : null;

  const tagChips = task.tags && task.tags.length > 0 ? (
    task.tags.map(tag => (
      <span key={tag} className="bg-tertiary-container text-on-tertiary-container px-2.5 py-1 rounded-lg font-medium">
        #{tag}
      </span>
    ))
  ) : null;

  const cleanTaskText = task.text ? task.text.replace(/#\w+/g, '').trim() : 'Unnamed task';

  // Render
  return (
    <li 
      className={`flex flex-col py-3 px-1 border-b border-outline-variant w-full box-border m-0 last:border-b-0 bg-surface-container-low rounded-lg mb-3 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        task.done ? 'opacity-60 bg-surface-container-high' : ''
      }`}
      data-id={task.id}
    >
      <div className="w-full flex flex-col gap-1">
        <div className="flex justify-between items-center w-full">
          <span 
            className={`flex-grow break-words cursor-pointer text-on-surface text-lg transition-all duration-200 hover:text-primary ${
              task.done ? 'line-through text-on-surface-variant' : ''
            }`}
            onClick={onToggle}
          >
            {cleanTaskText}
          </span>
          <button
            className="bg-transparent border-none text-on-surface-variant text-xl cursor-pointer p-1 ml-2 flex items-center justify-center rounded-full h-7 w-7 transition duration-200 hover:text-error hover:bg-error-container hover:scale-110 active:scale-95"
            onClick={onDelete}
            aria-label="Delete task"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
        
        <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs">
          {tagChips}
          
          {dateInfo && (
            <>
              {isEditingDate ? (
                <input
                  type="date"
                  value={tempDate}
                  onChange={handleDateChange}
                  onBlur={handleDateBlur}
                  autoFocus
                  className="px-2 py-1 border border-outline rounded text-xs"
                />
              ) : (
                <span
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:scale-105 ${dateInfo.className}`}
                  onClick={handleDateClick}
                  data-iso-date={task.dueDate}
                >
                  {dateInfo.text}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default TaskItem; 