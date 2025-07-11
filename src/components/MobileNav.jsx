import React from 'react';

function MobileNav({ currentView, onViewChange }) {
  const isActiveView = (view) => currentView === view;

  // Render
  return (
    <nav className="mobile-nav">
      <a
        href="#"
        className={`mobile-nav-link ${isActiveView('tasks') ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onViewChange('tasks');
        }}
      >
        <i className="fas fa-tasks"></i>
        <span>Tasks</span>
      </a>
      
      <a
        href="#"
        className={`mobile-nav-link ${isActiveView('calendar') ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onViewChange('calendar');
        }}
      >
        <i className="fas fa-calendar-alt"></i>
        <span>Calendar</span>
      </a>
      
      <a
        href="#"
        className={`mobile-nav-link ${isActiveView('settings') ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onViewChange('settings');
        }}
      >
        <i className="fas fa-cog"></i>
        <span>Settings</span>
      </a>
    </nav>
  );
}

export default MobileNav; 