import React, { useState, useEffect } from 'react';
import { formatDateDisplay, getDateDisplayInfo } from '../utils/dateUtils';

function Calendar({ tasks, onToggleTask, onDeleteTask, onAddTask, onUpdateTaskDate }) {
  // State and Data
  const [currentView, setCurrentView] = useState('month');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);

  const groupTasksByDate = (tasks) => {
    const grouped = {};
    tasks.forEach(task => {
      if (task.dueDate) {
        const dateKey = new Date(task.dueDate).toDateString();
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(task);
      }
    });
    return grouped;
  };

  const tasksByDate = groupTasksByDate(tasks);

  // Event Handlers
  const navigateMonth = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;
    
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = (e) => {
    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, date) => {
    e.preventDefault();
    
    if (draggedTask && onUpdateTaskDate) {
      const newDateString = date.toISOString().split('T')[0];
      onUpdateTaskDate(draggedTask.id, newDateString);
    }
    setDraggedTask(null);
  };

  const getDatesForMonth = (month, year) => {
    const dates = [];
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;
    startDate.setDate(firstDay.getDate() - startingDayOfWeek);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push({
        date: date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === new Date().toDateString()
      });
    }
    return dates;
  };

  const getTasksForDate = (date) => {
    const dateKey = date.toDateString();
    return tasksByDate[dateKey] || [];
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim() || !selectedDate) return;
    
    const newTask = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      done: false,
      dueDate: selectedDate.toISOString().split('T')[0],
      tags: []
    };
    
    if (onAddTask) {
      onAddTask(newTask);
    }
    
    setNewTaskText('');
    setShowTaskForm(false);
  };

  // Helper Functions
  const formatMonthYear = (month, year) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[month]} ${year}`;
  };

  const formatSelectedDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const dates = getDatesForMonth(currentMonth, currentYear);
  const tasksForSelectedDate = getTasksForDate(selectedDate);

  // Render
  return (
    <div className="calendar-simple">
      {/* Calendar Header */}
      <div className="calendar-simple-header">
        <button
          className="calendar-nav-btn"
          onClick={() => navigateMonth(-1)}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <div className="calendar-header-center">
          <h2 className="calendar-month-title">
            {formatMonthYear(currentMonth, currentYear)}
          </h2>
          <button
            className="calendar-today-mobile-btn"
            onClick={goToToday}
          >
            Today
          </button>
        </div>
        
        <button
          className="calendar-nav-btn"
          onClick={() => navigateMonth(1)}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="calendar-simple-controls">
        <button
          className="calendar-today-btn"
          onClick={goToToday}
        >
          Today
        </button>
      </div>

      {/* Days of week */}
      <div className="calendar-weekdays">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {dates.map((dateInfo, index) => {
          const tasksForDate = getTasksForDate(dateInfo.date);
          const isSelected = selectedDate && dateInfo.date.toDateString() === selectedDate.toDateString();
          
          return (
            <div
              key={index}
              className={`calendar-day ${
                !dateInfo.isCurrentMonth ? 'other-month' : ''
              } ${dateInfo.isToday ? 'today' : ''} ${
                isSelected ? 'selected' : ''
              }`}
              onClick={() => handleDateClick(dateInfo.date)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, dateInfo.date)}
            >
              <div className="calendar-day-number">
                {dateInfo.date.getDate()}
              </div>
              
              <div className="calendar-day-tasks">
                {tasksForDate.slice(0, 3).map(task => (
                  <div
                    key={task.id}
                    className={`calendar-task ${task.done ? 'completed' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onDragEnd={handleDragEnd}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTask(task.id);
                    }}
                    title={task.text}
                  >
                    {task.text}
                  </div>
                ))}
                {tasksForDate.length > 3 && (
                  <div className="calendar-more-tasks">
                    +{tasksForDate.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Date Tasks Section */}
      {selectedDate && (
        <div className="calendar-selected-date-section">
          <div className="calendar-selected-date-tasks">
            {tasksForSelectedDate.length > 0 ? (
              <>
                <div className="calendar-selected-date-header">
                  <div className="calendar-selected-date-info">
                    <span className="calendar-selected-date-label">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="calendar-selected-task-count">
                      {tasksForSelectedDate.length} {tasksForSelectedDate.length === 1 ? 'task' : 'tasks'}
                    </span>
                  </div>
                </div>
                <div className="calendar-selected-tasks-list">
                  {tasksForSelectedDate.map(task => (
                    <div
                      key={task.id}
                      className={`calendar-selected-task ${task.done ? 'completed' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="calendar-selected-task-content">
                        <div
                          className="calendar-selected-task-text"
                          onClick={() => onToggleTask(task.id)}
                        >
                          {task.text}
                        </div>
                        
                        {task.tags && task.tags.length > 0 && (
                          <div className="calendar-selected-task-tags">
                            {task.tags.map(tag => (
                              <span key={tag} className="calendar-task-tag">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <button
                        className="calendar-selected-task-delete"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="calendar-selected-empty">
                <div className="calendar-selected-date-info">
                  <span className="calendar-selected-date-label">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <p className="calendar-selected-empty-text">No tasks for this day</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Task Form Modal */}
      {showTaskForm && selectedDate && (
        <div className="calendar-modal-overlay" onClick={() => setShowTaskForm(false)}>
          <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
            <div className="calendar-modal-header">
              <h3>Add Task for {selectedDate.toLocaleDateString()}</h3>
              <button
                className="calendar-modal-close"
                onClick={() => setShowTaskForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleAddTask} className="calendar-task-form">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Enter task..."
                className="calendar-task-input"
                autoFocus
              />
              
              <div className="calendar-form-actions">
                <button
                  type="button"
                  onClick={() => setShowTaskForm(false)}
                  className="calendar-btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="calendar-btn-add"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar; 