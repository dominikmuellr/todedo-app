// Category Management Module
import * as Storage from './storage.js';
import * as Filters from './filters.js'; 
import * as Tasks from './tasks.js';

let allCategories = [];

// Category Initialization
export function initCategories(savedCategories = []) {
  allCategories = [...new Set(savedCategories)];
  displayCategoryFilters();
}

// Category List Updates
export function updateCategoryList() {
  const categoryList = document.getElementById("category-list");
  categoryList.innerHTML = "";
  allCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    categoryList.appendChild(option);
  });
}

// Category Filter Management
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

// Category Addition
export function addCategory(category) {
  if (category && !allCategories.includes(category)) {
    allCategories.push(category);
    Storage.saveCategoriesToStorage(allCategories);
    displayCategoryFilters();
  }
}

// Category Display
function displayCategoryFilters() {
  const container = document.getElementById("category-filters");
  if (!container) {
    console.error("Category filters container not found!");
    return;
  }
  container.innerHTML = "";

  const categoriesFromTasks = [...new Set(Storage.getTasksFromStorage().map(task => task.category).filter(Boolean))];
  const storedCategories = Storage.getCategoriesFromStorage();
  const uniqueDisplayCategories = [...new Set([...categoriesFromTasks, ...storedCategories])];
  allCategories = [...uniqueDisplayCategories];

  uniqueDisplayCategories.forEach(category => {
    const filterButton = document.createElement("button");
    filterButton.className = "category-filter";
    filterButton.dataset.category = category;

    const categoryText = document.createElement("span");
    categoryText.className = "category-filter-text";
    categoryText.textContent = category;
    filterButton.appendChild(categoryText);

    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-category-btn";
    deleteBtn.innerHTML = "&times;";
    deleteBtn.title = `Remove category: ${category}`;
    filterButton.appendChild(deleteBtn);

    filterButton.addEventListener("click", () => {
      document.querySelectorAll("#filter-bar button[data-filter]").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll("#filter-bar .category-filter").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll("#filter-bar .tag-filter").forEach(btn => btn.classList.remove("active"));
      
      filterButton.classList.add("active");
      Filters.applyFilter("category", category);
    });

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeCategory(category);
    });

    container.appendChild(filterButton);
  });
}

// Category Deletion
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

// Category Removal
export function removeCategory(categoryToRemove) {
  let tasks = Storage.getTasksFromStorage();
  
  tasks.forEach(task => {
    if (task.category === categoryToRemove) {
      task.category = null; 
    }
  });
  Storage.saveTasksToStorage(tasks);

  allCategories = allCategories.filter(cat => cat !== categoryToRemove);
  Storage.saveCategoriesToStorage(allCategories);

  const todoList = document.getElementById('todo-list');
  if (todoList) todoList.innerHTML = '';
  tasks.forEach(task => Tasks.addTaskToDOM(task));
  
  displayCategoryFilters(); 
  
  document.querySelectorAll("#filter-bar button.active, #filter-bar .category-filter.active, #filter-bar .tag-filter.active").forEach(btn => btn.classList.remove("active"));
  const allFilterButton = document.querySelector('#filter-bar button[data-filter="all"]');
  if (allFilterButton) allFilterButton.classList.add("active");
  
  Filters.applyFilter('all'); 

  if (window.DateUtils && typeof window.DateUtils.updateDueDateStatus === 'function') {
    window.DateUtils.updateDueDateStatus();
  }
}

// Category Retrieval
export function getCategories() {
  return [...allCategories];
}

// Category Filter Rendering
const categoryFiltersContainer = document.getElementById('category-filters');

export function renderCategoryFilters() {
    if (!categoryFiltersContainer) return;
    categoryFiltersContainer.innerHTML = '';

    const tasks = Storage.getTasksFromStorage();
    const uniqueCategories = [...new Set(tasks.map(task => task.category).filter(cat => cat))];

    uniqueCategories.forEach(category => {
        const pill = document.createElement('button');
        pill.className = 'category-filter text-sm px-4 py-2 rounded-full border border-outline bg-surface-container text-on-surface-variant cursor-pointer mb-1 transition';
        pill.textContent = category;
        pill.addEventListener('click', () => {
            Filters.setActiveFilterButton(pill);
            Tasks.renderTasks(task => task.category === category);
        });
        categoryFiltersContainer.appendChild(pill);
    });
}

// Call initCategories when the app loads, perhaps in app.js after loading from storage
// For now, ensure it's called if not already.
// Example: if app.js calls Categories.initCategories(Storage.getCategoriesFromStorage()); this is fine.