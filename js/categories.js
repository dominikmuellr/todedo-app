// categories.js - Category management
import * as Storage from './storage.js';
import { applyFilter } from './filters.js';

let allCategories = [];

// Initialize categories
export function init(savedCategories = []) {
  allCategories = savedCategories;
  updateCategoryList();
  updateCategoryFilters();
}

// Update category datalist
export function updateCategoryList() {
  const categoryList = document.getElementById("category-list");
  categoryList.innerHTML = "";
  allCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    categoryList.appendChild(option);
  });
}

// Update category filter buttons
export function updateCategoryFilters() {
  const categoryFiltersContainer = document.getElementById("category-filters");
  categoryFiltersContainer.innerHTML = "";
  
  allCategories.forEach(cat => {
    const button = document.createElement('button');
    button.className = 'category-filter';
    button.textContent = cat;
    
    button.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        applyFilter('all');
      } else {
        document.querySelectorAll('.category-filter').forEach(btn => {
          btn.classList.remove('active');
        });
        this.classList.add('active');
        applyFilter('category', cat);
      }
    });
    
    categoryFiltersContainer.appendChild(button);
  });
}

// Add a new category
export function addCategory(category) {
  if (category && !allCategories.includes(category)) {
    allCategories.push(category);
    updateCategoryList();
    updateCategoryFilters();
    Storage.saveCategoriesToStorage(allCategories);
    return true;
  }
  return false;
}

// Delete a category
export function deleteCategory(category) {
  const index = allCategories.indexOf(category);
  if (index !== -1) {
    allCategories.splice(index, 1);
  }
  
  Storage.saveCategoriesToStorage(allCategories);
  
  updateCategoryList();
  updateCategoryFilters();
  
  const tasks = Storage.getTasksFromStorage();
  let tasksUpdated = false;
  
  tasks.forEach(task => {
    if (task.category === category) {
      task.category = null;
      tasksUpdated = true;
    }
  });
  
  if (tasksUpdated) {
    Storage.saveTasksToStorage(tasks);
    
    document.querySelectorAll('#todo-list li').forEach(li => {
      const categoryChip = li.querySelector('.category-chip');
      if (categoryChip && categoryChip.textContent === category) {
        categoryChip.remove();
      }
    });
  }
  
  applyFilter('all');
}

// Get all categories
export function getCategories() {
  return [...allCategories];
}