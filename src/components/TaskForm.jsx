import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import DatePicker from './DatePicker';

function TaskForm({ onAddTask }) {
  // State and Refs
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFullDatePicker, setShowFullDatePicker] = useState(false);
  const popupRef = useRef(null);
  const fullDatePickerRef = useRef(null);

  // Effects
  useEffect(() => {
    function handleClickOutside(event) {
      const isClickInsidePopup = popupRef.current && popupRef.current.contains(event.target);
      const isClickInsideFullDatePicker = fullDatePickerRef.current && fullDatePickerRef.current.contains(event.target);
      
      const isClickOnQuickAddBtn = event.target.closest('.quick-add-btn');
      const isClickOnExpandedPicker = event.target.closest('.expanded-date-picker');
      
      if (!isClickInsidePopup && !isClickInsideFullDatePicker && !isClickOnQuickAddBtn && !isClickOnExpandedPicker) {
        setShowDatePicker(false);
        setShowFullDatePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, fullDatePickerRef]);

  // Event Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    
    const tagRegex = /#(\w+)/g;
    const tags = taskText.match(tagRegex)?.map(tag => tag.substring(1)) || [];
    const cleanText = taskText.replace(tagRegex, '').trim();

    if (!cleanText) return;

    onAddTask(cleanText, dueDate, tags);
    setTaskText('');
    setDueDate(undefined);
    setShowDatePicker(false);
    setShowFullDatePicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Helper Functions
  const getDateDisplayText = (date) => {
    if (!date) return 'Add Date';
    
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
    
    if (dateOnly.getTime() === todayOnly.getTime()) {
      return 'Today';
    } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
      return 'Tomorrow';
    } else {
      return format(date, 'MMM d');
    }
  };

  // Render
  return (
    <form onSubmit={handleSubmit} className="task-form-container">
      <div className="input-group">
        <div className="main-input-container">
          <div className="task-input-wrapper">
            <textarea
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 text-lg resize-y min-h-[4rem]"
              placeholder="Add new task... Use # for tags."
              required
            />
            
            {taskText.trim() && (
              <button
                type="submit"
                className="mobile-add-button"
                title="Add task"
              >
                <i className="fas fa-arrow-up"></i>
              </button>
            )}
            
            <div className="task-pills-container">
              {taskText.trim() && (
                <div className="quick-add-buttons">
                  {!dueDate && (
                    <div className="expandable-button-container">
                      {!showDatePicker ? (
                        <button
                          type="button"
                          onClick={toggleDatePicker}
                          className="quick-add-btn"
                          title="Add date"
                        >
                          <i className="far fa-calendar"></i>
                        </button>
                      ) : (
                        <div className="expanded-date-picker">
                          <button
                            type="button"
                            onClick={() => {
                              setDueDate(new Date());
                              setShowDatePicker(false);
                            }}
                            className="quick-date-option"
                          >
                            Today
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const tomorrow = new Date();
                              tomorrow.setDate(tomorrow.getDate() + 1);
                              setDueDate(tomorrow);
                              setShowDatePicker(false);
                            }}
                            className="quick-date-option"
                          >
                            Tomorrow
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowDatePicker(false);
                              setShowFullDatePicker(true);
                            }}
                            className="quick-date-option more-dates"
                          >
                            More...
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowDatePicker(false)}
                            className="quick-date-cancel"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              <div className="selected-pills">
                {dueDate && (
                  <div className="task-pill date-pill">
                    <i className="fas fa-calendar"></i>
                    <span>{getDateDisplayText(dueDate)}</span>
                    <button
                      type="button"
                      onClick={() => setDueDate(undefined)}
                      className="pill-remove"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div ref={popupRef} className="options-container">
          </div>
        </div>
      </div>

      {showFullDatePicker && (
        <div ref={fullDatePickerRef} className="full-date-picker-container">
          <div className="date-picker-header">
            <span>Choose Date</span>
            <button
              type="button"
              onClick={() => {
                setShowFullDatePicker(false);
                setShowDatePicker(false);
              }}
              className="date-picker-close"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <DatePicker 
            onDateSelect={(date) => {
              setDueDate(date);
              setShowFullDatePicker(false);
              setShowDatePicker(false);
            }}
            selectedDate={dueDate}
            onClose={() => setShowFullDatePicker(false)}
          />
        </div>
      )}
    </form>
  );
}

export default TaskForm; 