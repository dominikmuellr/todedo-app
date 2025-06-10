// dateUtils.js - Date related utilities

// Parse date input in DD/MM/YYYY format
export function parseDateInput(dateString) {
  const parts = dateString.split('/');
  if (parts.length === 3) {
    return new Date(parts[2], parseInt(parts[1])-1, parseInt(parts[0]));
  }
  return null;
}

// Format date to DD/MM/YYYY
export function formatDate(date) {
  if (!date) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Check if a date is overdue
export function isOverdue(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

// Check if a date is due soon (today or tomorrow)
export function isDueSoon(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return date >= today && date <= tomorrow;
}

// Update status of all due dates in the DOM
export function updateDueDateStatus() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  document.querySelectorAll('#todo-list li').forEach(li => {
    const dueDateElement = li.querySelector('.due-date');
    if (dueDateElement) {
      const isDone = li.querySelector('span').classList.contains('done');
      if (isDone) return;

      const dateText = dueDateElement.textContent.replace(/\s\(.*\)$/, '').replace('Due: ', '');
      const parts = dateText.split('/');
      if (parts.length === 3) {
        const dueDate = new Date(parts[2], parseInt(parts[1])-1, parseInt(parts[0]));

        dueDateElement.classList.remove('overdue', 'due-soon');
        dueDateElement.textContent = dueDate.toLocaleDateString('en-GB');

        if (dueDate < today) {
          dueDateElement.classList.add("overdue");
        } else if (dueDate <= tomorrow) {
          dueDateElement.classList.add("due-soon");
        }
      }
    }
  });
}