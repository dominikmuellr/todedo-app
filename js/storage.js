// Storage Operations Module

// Task Storage
export function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

export function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
} 

export function saveTaskToStorage(newTask) {
  const tasks = getTasksFromStorage();
  tasks.push(newTask);
  saveTasksToStorage(tasks);
}

// Category Storage
export function getCategoriesFromStorage() {
  return JSON.parse(localStorage.getItem('categories') || '[]');
}

export function saveCategoriesToStorage(categories) {
  localStorage.setItem('categories', JSON.stringify(categories));
}

// Tag Storage
export function getTagsFromStorage() {
  return JSON.parse(localStorage.getItem('tags') || '[]');
}

export function saveTagsToStorage(tags) {
  localStorage.setItem('tags', JSON.stringify(tags));
}

// DOM State Sync
export function updateStorageFromDOM() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    const id = li.dataset.id;
    const textElement = li.querySelector('.task-top-row > span:not(.category-chip):not(.tag-chip):not(.due-date-pill)'); 
    const text = textElement ? textElement.textContent : '';
    const done = textElement ? textElement.classList.contains('done') : false;
    
    const dueDateElement = li.querySelector('.due-date-pill');
    const dueDate = dueDateElement && dueDateElement.dataset.isoDate ? dueDateElement.dataset.isoDate : null;
    
    const categoryChip = li.querySelector('.category-chip');
    const category = categoryChip ? categoryChip.textContent : null;
    
    const tags = [];
    li.querySelectorAll('.tag-chip').forEach(tagEl => {
      tags.push(tagEl.textContent.substring(1));
    });
    
    tasks.push({ id, text, done, dueDate, category, tags });
  });
  
  saveTasksToStorage(tasks);
}