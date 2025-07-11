// Task Storage
export function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem('react-tasks') || '[]');
}

export function saveTasksToStorage(tasks) {
  localStorage.setItem('react-tasks', JSON.stringify(tasks));
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