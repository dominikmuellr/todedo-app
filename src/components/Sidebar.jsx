import React, { useState, useEffect } from 'react';

function Sidebar({ currentView, onViewChange, calendarDate, isOpen }) {
  useEffect(() => {
    localStorage.removeItem('sidebar-locked');
  }, []);

  const isActiveView = (view) => currentView === view;

  // Render
  return (
    <>
      <aside 
        className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}
      >
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            <span className="sidebar-title-full"></span>
            <span className="sidebar-title-collapsed">T</span>
          </h3>
        </div>
        
        <nav className="sidebar-nav">
          <a
            href="#"
            className={`nav-link ${isActiveView('tasks') ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onViewChange('tasks');
            }}
            title="Tasks"
          >
            <i className="fas fa-tasks"></i>
            <span>Tasks</span>
          </a>
        </nav>
        
        <div className="sidebar-footer">
          <a
            href="#"
            className={`nav-link ${isActiveView('settings') ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onViewChange('settings');
            }}
            title="Settings"
          >
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </a>
        </div>
      </aside>
    </>
  );
}

export default Sidebar; 