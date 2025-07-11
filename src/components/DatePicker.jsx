import React, { useState } from 'react';

const DatePicker = ({ isOpen, onClose, onDateSelect, selectedDate }) => {
  // Component State
  const [currentDate, setCurrentDate] = useState(new Date());

  if (!isOpen) return null;

  // Calendar Logic
  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

  const calendarDays = [];
  
  const prevMonth = new Date(currentYear, currentMonth - 1, 1);
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevMonthDay = new Date(currentYear, currentMonth - 1, prevMonthLastDay - i);
    calendarDays.push({
      date: prevMonthDay,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isToday = date.toDateString() === today.toDateString();
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
    
    calendarDays.push({
      date,
      isCurrentMonth: true,
      isToday,
      isSelected
    });
  }

  const remainingCells = 42 - calendarDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    const nextMonthDay = new Date(currentYear, currentMonth + 1, i);
    calendarDays.push({
      date: nextMonthDay,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    });
  }

  // Event Handlers
  const handlePrevMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDateClick = (date, e) => {
    e.preventDefault();
    e.stopPropagation();
    onDateSelect(date);
    onClose();
  };

  const handleQuickSelect = (days, e) => {
    e.preventDefault();
    e.stopPropagation();
    const date = new Date();
    date.setDate(date.getDate() + days);
    onDateSelect(date);
    onClose();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Render
  return (
    <div className="task-popup-overlay" onClick={onClose}>
      <div className="task-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="task-popup-header">
          <h3 className="task-popup-title">Select Date</h3>
          <button className="task-popup-close" onClick={onClose}>×</button>
        </div>
        
        <div className="task-popup-body">
          <div className="premium-calendar">
            <div className="premium-calendar-header">
              <div className="header-content">
                <button 
                  className="premium-nav-btn"
                  onClick={handlePrevMonth}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                
                <div className="month-year-display">
                  <h2 className="month-title">
                    {monthNames[currentMonth]}
                    <span className="year-subtitle">{currentYear}</span>
                  </h2>
                </div>
                
                <button 
                  className="premium-nav-btn"
                  onClick={handleNextMonth}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="premium-weekdays">
              {weekdayNames.map((day) => (
                <div key={day} className="premium-weekday">
                  {day}
                </div>
              ))}
            </div>

            <div className="premium-calendar-grid">
              {calendarDays.map((dayInfo, index) => (
                <button
                  key={index}
                  className={`premium-calendar-day ${
                    !dayInfo.isCurrentMonth ? 'other-month' : ''
                  } ${dayInfo.isToday ? 'today' : ''} ${
                    dayInfo.isSelected ? 'selected' : ''
                  }`}
                  onClick={(e) => handleDateClick(dayInfo.date, e)}
                >
                  <span className="day-number">{dayInfo.date.getDate()}</span>
                </button>
              ))}
            </div>

            <div className="premium-actions">
              <div className="action-group">
                <button 
                  className="premium-quick-btn primary"
                  onClick={(e) => handleQuickSelect(0, e)}
                >
                  <div className="btn-content">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    Today
                  </div>
                </button>
                
                <button 
                  className="premium-quick-btn"
                  onClick={(e) => handleQuickSelect(1, e)}
                >
                  <div className="btn-content">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 2v4"/>
                      <path d="M16 2v4"/>
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <path d="M3 10h18"/>
                    </svg>
                    Tomorrow
                  </div>
                </button>
                
                <button 
                  className="premium-quick-btn"
                  onClick={(e) => handleQuickSelect(7, e)}
                >
                  <div className="btn-content">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 2v4"/>
                      <path d="M16 2v4"/>
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <path d="M3 10h18"/>
                      <path d="M8 14h.01"/>
                      <path d="M12 14h.01"/>
                      <path d="M16 14h.01"/>
                    </svg>
                    Next Week
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker; 