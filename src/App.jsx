import React, { useState, useEffect } from 'react';
import './style.css';

// Components
import Calendar from './components/Calendar';
import FilterBar from './components/FilterBar';
import MobileNav from './components/MobileNav';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PWAUpdateNotification from './components/PWAUpdateNotification';

// Utils
import { getRandomTitle, getPersonalizedGreeting, getGreetingInfo, parseGreeting } from './utils/randomTitles';
import { updateAndroidStatusBarColor, initializeThemeColorListener } from './utils/themeUtils';

function App() {
  // State Management
  const [currentView, setCurrentView] = useState('tasks');
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterValue, setFilterValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState('');
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  // Effects
  useEffect(() => {
    // Initialize theme color listener
    const observer = initializeThemeColorListener();
    
    const savedTheme = localStorage.getItem('react-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    const savedColorTheme = localStorage.getItem('react-color-theme');
    if (savedColorTheme && ['rose', 'forest'].includes(savedColorTheme)) {
      if (savedColorTheme === 'rose') {
        document.documentElement.removeAttribute('data-color-theme');
      } else {
        document.documentElement.setAttribute('data-color-theme', savedColorTheme);
      }
    } else {
      document.documentElement.removeAttribute('data-color-theme');
    }
    
    // Initial status bar color update
    setTimeout(updateAndroidStatusBarColor, 100);
    
    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem('react-user-name') || '';
    setUserName(savedName);
    
    if (savedName) {
      setCurrentGreeting(getPersonalizedGreeting(savedName));
    } else {
      setCurrentGreeting(getRandomTitle());
      setShowNameInput(true);
    }
  }, []);

  useEffect(() => {
    const handleNameChange = (event) => {
      const newName = event.detail.name;
      setUserName(newName);
      if (newName) {
        setCurrentGreeting(getPersonalizedGreeting(newName));
        setShowNameInput(false);
      } else {
        setCurrentGreeting(getRandomTitle());
        setShowNameInput(true);
      }
    };

    window.addEventListener('name-changed', handleNameChange);
    return () => window.removeEventListener('name-changed', handleNameChange);
  }, []);

  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem('react-tasks') || '[]');
      setTasks(savedTasks);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setTasks([]);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      localStorage.setItem('react-tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }, [tasks, isLoaded]);

  // App Logic
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('react-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('react-theme', 'light');
    }
    
    // Update Android status bar color
    setTimeout(updateAndroidStatusBarColor, 50);
  };

  const handleNameSubmit = (name) => {
    const trimmedName = name.trim();
    setUserName(trimmedName);
    localStorage.setItem('react-user-name', trimmedName);
    setCurrentGreeting(getPersonalizedGreeting(trimmedName));
    setShowNameInput(false);
  };

  const generateNewGreeting = () => {
    if (userName) {
      setCurrentGreeting(getPersonalizedGreeting(userName));
    } else {
      setCurrentGreeting(getRandomTitle());
    }
  };

  const addTask = (taskText, dueDate, tags) => {
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      done: false,
      dueDate: dueDate ? dueDate.toISOString().split('T')[0] : null,
      tags: tags || []
    };
    
    setTasks(prev => [...prev, newTask]);
  };

  const addTaskFromCalendar = (taskData) => {
    setTasks(prev => [...prev, taskData]);
  };

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const updateTaskDate = (taskId, newDate) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, dueDate: newDate } : task
    ));
  };

  const filterFunctions = {
    all: () => true,
    pending: task => !task.done,
    completed: task => task.done,
    overdue: task => {
      if (task.done || !task.dueDate) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(task.dueDate) < today;
    },
    tag: (task, value) => task.tags && task.tags.includes(value),
    search: (task, value) => {
      const searchTerm = value.toLowerCase();
      return task.text.toLowerCase().includes(searchTerm) ||
             (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
    }
  };

  const getFilteredTasks = () => {
    const filterFn = filterFunctions[activeFilter];
    if (activeFilter === 'tag' || activeFilter === 'search') {
      return tasks.filter(task => filterFn(task, filterValue));
    }
    return tasks.filter(filterFn);
  };

  const handleFilterChange = (filter, value = '') => {
    setActiveFilter(filter);
    setFilterValue(value);
  };

  const clearCompletedTasks = () => {
    setTasks(prev => prev.filter(task => !task.done));
  };

  const toggleSortOrder = () => {
    setTasks(prev => [...prev].reverse());
  };

  const existingTags = [...new Set(tasks.flatMap(task => task.tags || []))];

  const filteredTasks = getFilteredTasks();
  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(filterFunctions.pending).length,
    completed: tasks.filter(filterFunctions.completed).length,
    overdue: tasks.filter(filterFunctions.overdue).length,
    tags: existingTags.reduce((acc, tag) => {
      acc[tag] = tasks.filter(task => task.tags && task.tags.includes(tag)).length;
      return acc;
    }, {})
  };

  // Render
  return (
    <div className="app-container md:p-8 p-0">
      <div className="app-title-outside">
        ToDeDo
      </div>
      
      <div className="greeting-header">
        {showNameInput ? (
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Enter your name..."
                className="flex-1 px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleNameSubmit(e.target.value);
                  }
                }}
                autoFocus
              />
              <button
                onClick={(e) => {
                  const input = e.target.parentElement.querySelector('input');
                  if (input.value.trim()) {
                    handleNameSubmit(input.value);
                  }
                }}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold cursor-pointer transition-all duration-300">
              <span onClick={generateNewGreeting} title={(() => {
                const { language, translation } = getGreetingInfo(currentGreeting, userName);
                return language === 'English' ? `This is ${language}` : `This is ${language} and means "${translation}"`;
              })()} className="greeting-with-wavy-underline">
                {(() => {
                  const { parts } = parseGreeting(currentGreeting, userName);
                  return (
                    <>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{ 
                            color: part.isName ? 'var(--color-on-surface)' : 'var(--color-secondary)' 
                          }}
                          className="hover:opacity-80 transition-opacity"
                        >
                          {part.text}
                        </span>
                      ))}
                    </>
                  );
                })()}
              </span>
            </h1>
          </div>
        )}
      </div>

      <div className="main-grid-layout">
        <Sidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          calendarDate={new Date()}
          isOpen={sidebarOpen}
        />

        <div className="main-task-card">
          {currentView === 'tasks' ? (
            <div className="tasks-view-container">
              <div className="tasks-view-full">
                <FilterBar
                  activeFilter={activeFilter}
                  filterValue={filterValue}
                  onFilterChange={handleFilterChange}
                  tags={existingTags}
                  taskCounts={taskCounts}
                  onClearCompleted={clearCompletedTasks}
                  onToggleSort={toggleSortOrder}
                />

                <TaskList
                  tasks={filteredTasks}
                  onToggleTask={toggleTask}
                  onDeleteTask={deleteTask}
                  onUpdateTaskDate={updateTaskDate}
                  activeFilter={activeFilter}
                  totalTaskCount={tasks.length}
                />

                <div className="task-form-bottom">
                  <TaskForm 
                    onAddTask={addTask}
                  />
                </div>
              </div>
            </div>
          ) : currentView === 'calendar' ? (
            <Calendar 
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onAddTask={addTaskFromCalendar}
              onUpdateTaskDate={updateTaskDate}
            />
          ) : currentView === 'settings' ? (
            <Settings />
          ) : null}
        </div>

        <div className={`right-sidebar ${rightSidebarOpen ? 'open' : ''}`}>
          <div className="task-form-container">
            <Calendar 
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onAddTask={addTaskFromCalendar}
              onUpdateTaskDate={updateTaskDate}
            />
          </div>
        </div>
      </div>

      <MobileNav
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <div className="small-info-text">
        <span className="small-info-display">Made in Europe</span>
        <span className="small-info-display">v0.1.0-dev-cristina</span>
      </div>

      <PWAInstallPrompt />
      <PWAUpdateNotification />
    </div>
  );
}

export default App;