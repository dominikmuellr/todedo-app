// Date Utility Module
import * as DatePickerUtils from './datePickerUtils.js';

// Date Parsing
export function parseDateInput(dateString) {
  const parts = dateString.split('/');
  if (parts.length === 3) {
    return new Date(parts[2], parseInt(parts[1]) - 1, parseInt(parts[0]));
  }
  return null;
}

// Date Formatting
export function formatDate(date) {
  if (!date) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Date Status Checking
export function isOverdue(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function isDueSoon(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return date.getTime() === today.getTime() || date.getTime() === tomorrow.getTime();
}

// Date Status Update
export function updateDueDateStatus() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  document.querySelectorAll('#todo-list li').forEach(li => {
    const dueDateElement = li.querySelector('.due-date-pill');
    
    if (dueDateElement && dueDateElement.dataset.isoDate) {
      const isoDateString = dueDateElement.dataset.isoDate;
      const taskDueDate = new Date(isoDateString);
      
      const taskTextSpan = li.querySelector('.task-top-row > span:not(.category-chip):not(.tag-chip):not(.due-date-pill)');
      const isDone = taskTextSpan ? taskTextSpan.classList.contains('done') : false;

      dueDateElement.classList.remove('overdue', 'due-today', 'due-tomorrow');
      dueDateElement.textContent = DatePickerUtils.formatDateDisplay(taskDueDate);

      if (isDone) {
        return;
      }

      if (taskDueDate < today) {
        dueDateElement.classList.add("overdue");
      } else if (taskDueDate.getTime() === today.getTime()) {
        dueDateElement.classList.add("due-today");
      } else if (taskDueDate.getTime() === tomorrow.getTime()) {
        dueDateElement.classList.add("due-tomorrow");
      }
    } else if (dueDateElement) {
      dueDateElement.classList.remove('overdue', 'due-today', 'due-tomorrow');
    }
  });
}