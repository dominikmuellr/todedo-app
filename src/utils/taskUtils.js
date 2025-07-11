import * as Storage from './storage.js';

// Task ID Generation
export function generateId() {
  return Date.now().toString() + Math.random().toString(36).substring(2, 5);
}

// Task Creation
export function createTask(taskText, dueDate, category = '', tags = []) {
  return {
    id: generateId(),
    text: taskText,
    done: false,
    dueDate: dueDate ? dueDate.toISOString() : null,
    category: category || null,
    tags: tags || []
  };
}

// Task Operations
export function addTask(taskText, dueDate, category = '', tags = []) {
  const newTask = createTask(taskText, dueDate, category, tags);
  const tasks = Storage.getTasksFromStorage();
  tasks.push(newTask);
  Storage.saveTasksToStorage(tasks);
  return newTask;
}

export function deleteTask(taskId) {
  let tasks = Storage.getTasksFromStorage();
  tasks = tasks.filter(t => t.id !== taskId);
  Storage.saveTasksToStorage(tasks);
  return tasks;
}

export function toggleTaskDone(taskId) {
  const tasks = Storage.getTasksFromStorage();
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return tasks;

  tasks[taskIndex].done = !tasks[taskIndex].done;
  Storage.saveTasksToStorage(tasks);
  return tasks;
}

export function updateTaskDate(taskId, newDate) {
  const tasks = Storage.getTasksFromStorage();
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return tasks;

  tasks[taskIndex].dueDate = newDate ? new Date(newDate).toISOString() : null;
  Storage.saveTasksToStorage(tasks);
  return tasks;
}

// Task Filtering
export const filterFunctions = {
  all: () => true,
  pending: task => !task.done,
  completed: task => task.done,
  overdue: task => {
    if (task.done || !task.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today;
  },
  category: categoryName => task => task.category === categoryName,
  tag: tagName => task => task.tags && task.tags.includes(tagName)
};

// Category and Tag Extraction
export function getCategoriesFromTasks(tasks) {
  return [...new Set(tasks.map(task => task.category).filter(Boolean))];
}

export function getTagsFromTasks(tasks) {
  const allTags = tasks.flatMap(task => task.tags || []);
  return [...new Set(allTags)];
} 