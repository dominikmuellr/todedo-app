// Calendar Module
import * as Storage from "./storage.js";
import * as DatePickerUtils from "./datePickerUtils.js";

let calendarContainer;
let currentMonth;
let currentYear;
let selectedDate = null;
let sidebarContainer;

// Initialize the calendar
export function initCalendar(containerId) {
  calendarContainer = document.getElementById(containerId);
  if (!calendarContainer) return;

  // Set current month and year to today"s date
  const today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();

  // Create sidebar container
  sidebarContainer = document.createElement("div");
  sidebarContainer.id = "calendar-sidebar";
  sidebarContainer.className = "calendar-sidebar hidden";
  document.querySelector(".app-wrapper").appendChild(sidebarContainer);

  // Add click listener to close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (sidebarContainer && !sidebarContainer.classList.contains("hidden")) {
      // Check if click is outside sidebar and calendar
      if (!sidebarContainer.contains(e.target) && 
          !e.target.closest(".calendar-date") && 
          !e.target.closest("#calendar-sidebar")) {
        closeSidebar();
      }
    }
  });

  // Initial render
  renderCalendar();

  // Listen for custom task update events
  document.addEventListener("tasks-updated", () => {
    renderCalendar();
    
    // If sidebar is open, update its content
    if (selectedDate && !sidebarContainer.classList.contains("hidden")) {
      showTasksForDate(selectedDate);
    }
  });
}

// Render the calendar for the current month
export function renderCalendar() {
  if (!calendarContainer) return;

  // Clear previous content
  calendarContainer.innerHTML = '';

  // Create wrapper to fill height
  const calendarWrapper = document.createElement('div');
  calendarWrapper.className = 'calendar-wrapper';
  calendarContainer.appendChild(calendarWrapper);

  // Create calendar header
  const header = createCalendarHeader();
  calendarWrapper.appendChild(header);

  // Create month grid
  const monthGrid = createMonthGrid();
  calendarWrapper.appendChild(monthGrid);
  
  // Make sure the calendar fills the available height
  adjustCalendarHeight();
}

// Adjust calendar height to match the todo list
function adjustCalendarHeight() {
  // We need to do this after a small delay to ensure DOM has been updated
  setTimeout(() => {
    const todoContainer = document.querySelector('.app-container');
    if (todoContainer && calendarContainer) {
      const todoHeight = todoContainer.offsetHeight;
      
      // Make sure calendar grid expands to fill available space
      const calendarWrapper = calendarContainer.querySelector('.calendar-wrapper');
      if (calendarWrapper) {
        calendarWrapper.style.display = 'flex';
        calendarWrapper.style.flexDirection = 'column';
        calendarWrapper.style.height = '100%';
        
        // Make grid grow to fill available space
        const grid = calendarContainer.querySelector('.calendar-grid');
        if (grid) {
          grid.style.flex = '1';
          grid.style.minHeight = '0'; // Important for flex items to shrink below their content size
        }
      }
    }
  }, 0);
}

// Create the calendar header with navigation controls
function createCalendarHeader() {
  const header = document.createElement('div');
  header.className = 'calendar-header';

  const monthYearDisplay = document.createElement('h2');
  monthYearDisplay.className = 'text-lg font-medium text-on-surface';
  monthYearDisplay.textContent = formatMonthYear(currentMonth, currentYear);

  const navigationControls = document.createElement('div');
  navigationControls.className = 'calendar-nav-controls';

  const prevButton = document.createElement('button');
  prevButton.className = 'calendar-nav-btn';
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent sidebar from closing
    navigateMonth(-1);
  });

  const nextButton = document.createElement('button');
  nextButton.className = 'calendar-nav-btn';
  nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent sidebar from closing
    navigateMonth(1);
  });

  navigationControls.appendChild(prevButton);
  navigationControls.appendChild(nextButton);

  header.appendChild(monthYearDisplay);
  header.appendChild(navigationControls);

  return header;
}

// Navigate months
function navigateMonth(direction) {
  currentMonth += direction;
  
  // Adjust year if needed
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  
  renderCalendar();
  
  // If a date was selected, try to keep the sidebar open with that date
  if (selectedDate) {
    // Only keep sidebar open if we're still in the same month and year
    if (selectedDate.getMonth() === currentMonth && selectedDate.getFullYear() === currentYear) {
      highlightSelectedDate();
    } else {
      closeSidebar();
    }
  }
}

// Format month and year for display
function formatMonthYear(month, year) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${monthNames[month]} ${year}`;
}

// Create the month grid with days
function createMonthGrid() {
  const grid = document.createElement('div');
  grid.className = 'calendar-grid';

  // Add day headers (Sun, Mon, etc)
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayHeaders.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.className = 'calendar-day-header';
    dayHeader.textContent = day;
    grid.appendChild(dayHeader);
  });

  // Get dates for the current month
  const dates = getDatesForMonth(currentMonth, currentYear);
  
  // Get tasks with due dates from storage
  const tasks = Storage.getTasksFromStorage();
  const tasksByDate = groupTasksByDate(tasks);

  // Add dates to the grid
  dates.forEach(dateInfo => {
    const dateCell = document.createElement('div');
    dateCell.className = 'calendar-date';
    dateCell.setAttribute('data-date', formatDateKey(dateInfo.date));
    
    if (!dateInfo.isCurrentMonth) {
      dateCell.classList.add('other-month');
    }

    // Check if this date is today
    if (isToday(dateInfo.date)) {
      dateCell.classList.add('today');
    }
    
    // Check if this is the selected date
    if (selectedDate && isSameDay(dateInfo.date, selectedDate)) {
      dateCell.classList.add('selected');
    }

    // Add the date number
    const dateNumber = document.createElement('span');
    dateNumber.className = 'date-number';
    dateNumber.textContent = dateInfo.date.getDate();
    dateCell.appendChild(dateNumber);

    // Add task indicators if there are tasks for this date
    const formattedDate = formatDateKey(dateInfo.date);
    if (tasksByDate[formattedDate] && tasksByDate[formattedDate].length > 0) {
      const indicator = document.createElement('div');
      indicator.className = 'task-indicator';
      
      const count = tasksByDate[formattedDate].length;
      if (count > 0) {
        indicator.textContent = count;
        indicator.title = `${count} task${count !== 1 ? 's' : ''}`;
        dateCell.appendChild(indicator);
      }
    }
    
    // Make date clickable
    dateCell.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent document click from closing the sidebar
      selectDate(dateInfo.date);
    });
    
    grid.appendChild(dateCell);
  });

  return grid;
}

// Select a date and show the sidebar
function selectDate(date) {
  selectedDate = date;
  highlightSelectedDate();
  showTasksForDate(date);
}

// Highlight the selected date in the calendar
function highlightSelectedDate() {
  // Remove selected class from all dates
  document.querySelectorAll('.calendar-date.selected').forEach(cell => {
    cell.classList.remove('selected');
  });
  
  // Add selected class to the current selected date
  const selectedDateKey = formatDateKey(selectedDate);
  const dateCell = document.querySelector(`.calendar-date[data-date="${selectedDateKey}"]`);
  if (dateCell) {
    dateCell.classList.add('selected');
  }
}

// Show tasks for the selected date in the sidebar
function showTasksForDate(date) {
  if (!sidebarContainer) return;
  
  // Format date for display
  const formattedDate = formatDisplayDate(date);
  const dateKey = formatDateKey(date);
  
  // Get tasks for this date
  const tasks = Storage.getTasksFromStorage().filter(task => {
    if (!task.dueDate) return false;
    return task.dueDate.split('T')[0] === dateKey;
  });
  
  // Build sidebar content
  sidebarContainer.innerHTML = `
    <div class="sidebar-header">
      <h3 class="sidebar-title">${formattedDate}</h3>
      <button class="sidebar-close-btn"><i class="fas fa-times"></i></button>
    </div>
    <div class="sidebar-content">
      ${tasks.length === 0 ? 
        '<p class="empty-state">No tasks here!</p>' : 
        '<ul class="sidebar-task-list">' + 
          tasks.map(task => createTaskItemHTML(task)).join('') + 
        '</ul>'
      }
    </div>
    <div class="sidebar-footer">
      <button id="add-task-for-date-btn" class="add-task-btn">
        <i class="fas fa-plus mr-2"></i>Add Task for ${formatSimpleDate(date)}
      </button>
    </div>
  `;
  
  // Show sidebar
  sidebarContainer.classList.remove('hidden');
  
  // Add event listeners
  const closeBtn = sidebarContainer.querySelector('.sidebar-close-btn');
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeSidebar();
  });
  
  // Add event listener for the add task button
  const addTaskBtn = sidebarContainer.querySelector('#add-task-for-date-btn');
  addTaskBtn.addEventListener('click', () => {
    openAddTaskForm(date);
  });
  
  // Add event listeners for task actions (complete, delete)
  sidebarContainer.querySelectorAll('.sidebar-task-item').forEach(item => {
    const taskId = item.getAttribute('data-id');
    
    // Toggle task completion
    const checkbox = item.querySelector('.task-checkbox');
    checkbox.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTaskCompletion(taskId);
    });
    
    // Delete task
    const deleteBtn = item.querySelector('.task-delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(taskId);
    });
  });
}

// Format date for display in the sidebar header
function formatDisplayDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

// Format date for the add task button
function formatSimpleDate(date) {
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

// Create HTML for a task item in the sidebar
function createTaskItemHTML(task) {
  return `
    <li class="sidebar-task-item ${task.done ? 'task-done' : ''}" data-id="${task.id}">
      <div class="task-checkbox ${task.done ? 'checked' : ''}">
        ${task.done ? '<i class="fas fa-check"></i>' : ''}
      </div>
      <span class="task-text">${task.text}</span>
      <button class="task-delete-btn" title="Delete task">
        <i class="fas fa-trash-alt"></i>
      </button>
    </li>
  `;
}

// Toggle task completion status
function toggleTaskCompletion(taskId) {
  const tasks = Storage.getTasksFromStorage();
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex !== -1) {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    Storage.saveTasksToStorage(tasks);
    
    // Update sidebar content
    showTasksForDate(selectedDate);
    
    // Dispatch event to update main task list
    document.dispatchEvent(new CustomEvent('tasks-updated'));
  }
}

// Delete a task
function deleteTask(taskId) {
  const tasks = Storage.getTasksFromStorage();
  const filteredTasks = tasks.filter(t => t.id !== taskId);
  
  Storage.saveTasksToStorage(filteredTasks);
  
  // Update sidebar content
  showTasksForDate(selectedDate);
  
  // Dispatch event to update main task list
  document.dispatchEvent(new CustomEvent('tasks-updated'));
}

// Close the sidebar
function closeSidebar() {
  if (sidebarContainer) {
    sidebarContainer.classList.add('hidden');
  }
  
  // Remove selected state from calendar dates
  document.querySelectorAll('.calendar-date.selected').forEach(cell => {
    cell.classList.remove('selected');
  });
  
  selectedDate = null;
}

// Open add task form with prefilled date
function openAddTaskForm(date) {
  // Set the date in the main form
  const dateInput = document.getElementById('due-date-input');
  const dateBtn = document.getElementById('toggle-date-btn');
  const selectedDatesContainer = document.getElementById('selected-dates');
  
  if (dateInput && date) {
    const formattedDate = formatDateKey(date);
    dateInput.value = formattedDate;
    
    // Update date button state
    if (dateBtn) {
      dateBtn.classList.add('active');
      const displayInfo = DatePickerUtils.getDateDisplayInfo(date);
      dateBtn.innerHTML = `<i class="far fa-calendar mr-2"></i>${displayInfo.text}`;
    }
    
    // Update selected dates pills if available
    if (selectedDatesContainer) {
      const displayInfo = DatePickerUtils.getDateDisplayInfo(date);
      
      selectedDatesContainer.innerHTML = `
        <span class="form-date-pill inline-flex items-center text-sm px-2.5 py-1 rounded-full ${displayInfo.className}">
          ${displayInfo.text}
          <button type="button" class="pill-delete-btn ml-1.5">&times;</button>
        </span>
      `;
      selectedDatesContainer.classList.remove('hidden');
      
      // Add delete button handler
      const deleteBtn = selectedDatesContainer.querySelector('.pill-delete-btn');
      if (deleteBtn) {
        deleteBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          selectedDatesContainer.innerHTML = '';
          selectedDatesContainer.classList.add('hidden');
          dateInput.value = '';
          dateBtn.classList.remove('active');
          dateBtn.innerHTML = '<i class="far fa-calendar mr-2"></i>Due Date';
        };
      }
    }
  }
  
  // Focus the task input field
  const taskInput = document.getElementById('todo-input');
  if (taskInput) {
    taskInput.focus();
    closeSidebar();
  }
}

// Get all dates that should appear in the month view
function getDatesForMonth(month, year) {
  const dates = [];
  
  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Add days from previous month to fill the first row
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, daysInPreviousMonth - i);
    dates.push({
      date,
      isCurrentMonth: false
    });
  }
  
  // Add days from current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    dates.push({
      date,
      isCurrentMonth: true
    });
  }
  
  // Add days from next month to fill remaining cells (6 rows × 7 days = 42 cells total)
  const remainingCells = 42 - dates.length;
  for (let i = 1; i <= remainingCells; i++) {
    const date = new Date(year, month + 1, i);
    dates.push({
      date,
      isCurrentMonth: false
    });
  }
  
  return dates;
}

// Check if a date is today
function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

// Check if two dates are the same day
function isSameDay(date1, date2) {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
}

// Format date as YYYY-MM-DD for task lookup
function formatDateKey(date) {
  return date.toISOString().split('T')[0];
}

// Group tasks by their due date
function groupTasksByDate(tasks) {
  const tasksByDate = {};
  
  tasks.forEach(task => {
    if (task.dueDate) {
      const dateKey = task.dueDate.split('T')[0];
      
      if (!tasksByDate[dateKey]) {
        tasksByDate[dateKey] = [];
      }
      
      tasksByDate[dateKey].push(task);
    }
  });
  
  return tasksByDate;
}
