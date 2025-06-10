// storage.js - All localStorage operations

// Get tasks from storage
export function getTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Save tasks to storage
export function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
} 

// Save a single task
export function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
}

// Update storage from current DOM state
export function updateStorageFromDOM() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    const id = li.dataset.id;
    const text = li.querySelector('span').textContent;
    const done = li.querySelector('span').classList.contains('done');
    
    // Get due date if it exists
    const dueDateElement = li.querySelector('.due-date');
    let dueDate = null;
    if (dueDateElement) {
      const dateText = dueDateElement.textContent.replace(/\s\(.*\)$/, '').replace('Due: ', '');
      const parts = dateText.split('/');
      if (parts.length === 3) {
        const date = new Date(parts[2], parseInt(parts[1])-1, parseInt(parts[0]));
        dueDate = date.toISOString();
      }
    }
    
    // Get category if present
    const categoryChip = li.querySelector('.category-chip');
    const category = categoryChip ? categoryChip.textContent : null;
    
    // Get tags if present
    const tags = [];
    li.querySelectorAll('.tag-chip').forEach(tagEl => {
      tags.push(tagEl.textContent.substring(1));
    });
    
    tasks.push({ id, text, done, dueDate, category, tags });
  });
  
  saveTasksToStorage(tasks);
}

// Get categories from storage
export function getCategoriesFromStorage() {
  const categories = localStorage.getItem('categories');
  return categories ? JSON.parse(categories) : [];
}

// Save categories to storage
export function saveCategoriesToStorage(categories) {
  localStorage.setItem('categories', JSON.stringify(categories));
}

// Get tags from storage
export function getTagsFromStorage() {
  const tags = localStorage.getItem('tags');
  return tags ? JSON.parse(tags) : [];
}

// Save tags to storage
export function saveTagsToStorage(tags) {
  localStorage.setItem('tags', JSON.stringify(tags));
}