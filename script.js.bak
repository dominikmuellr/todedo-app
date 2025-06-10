// DOM ELEMENT SELECTORS
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const categoryInput = document.getElementById("category-input");
const toggleCategoryBtn = document.getElementById("toggle-category-btn");
const categoryList = document.getElementById("category-list");
const list = document.getElementById("todo-list");
const filterAll = document.getElementById("filter-all");
const filterDone = document.getElementById("filter-done");
const filterTodo = document.getElementById("filter-todo");
const filterOverdue = document.getElementById("filter-overdue");
const toggleDateBtn = document.getElementById("toggle-date-btn");
const dateInput = document.getElementById("due-date-input");
const categoryFiltersContainer = document.getElementById("category-filters");
const tagFiltersContainer = document.getElementById("tag-filters");

// APP STATE
let allCategories = [];
let allTags = [];

// TOGGLE BUTTONS FUNCTIONALITY
toggleCategoryBtn.addEventListener('click', function() {
  categoryInput.classList.toggle("hidden");
  
  if (categoryInput.classList.contains("hidden")) {
    this.textContent = "Add Category";
    this.classList.remove("active");
    categoryInput.value = "";
  } else {
    this.textContent = "Remove Category";
    this.classList.add("active");
    categoryInput.focus();
  }
});

toggleDateBtn.addEventListener('click', function() {
  dateInput.classList.toggle("hidden");
  
  if (dateInput.classList.contains("hidden")) {
    this.textContent = "Add Date";
    this.classList.remove("active");
    dateInput.value = "";
  } else {
    this.textContent = "Remove Date";
    this.classList.add("active");
    dateInput.focus();
  }
});

dateInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    dateInput.classList.add("hidden");
    input.focus();
  }
});

// UTILITY FUNCTIONS
function generateId() {
  return Date.now().toString() + Math.random().toString(36).substring(2, 5);
}

// FORM HANDLING
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let taskText = input.value.trim();
  if (taskText === "") return;

  // Extract hashtags
  const tags = [];
  const tagRegex = /#(\w+)/g;
  let match;
  
  while ((match = tagRegex.exec(taskText)) !== null) {
    const tag = match[1].toLowerCase();
    tags.push(tag);
    
    // Add to global tags list if new
    if (!allTags.includes(tag)) {
      allTags.push(tag);
      updateTagFilters();
    }
  }
  
  // Remove hashtags from task text
  taskText = taskText.replace(/#\w+/g, '').trim();

  // Process date
  const dateValue = dateInput.value.trim();
  let dueDate = null;

  if (dateValue) {
    const parts = dateValue.split('/');
    if (parts.length === 3) {
      // Parse DD/MM/YYYY format
      dueDate = new Date(parts[2], parseInt(parts[1])-1, parseInt(parts[0]));
    }
  }

  // Process category
  const category = categoryInput.value.trim();
  if (category && !allCategories.includes(category)) {
    allCategories.push(category);
    updateCategoryList();
    updateCategoryFilters();
    localStorage.setItem('categories', JSON.stringify(allCategories));
  }

  const newTask = {
    id: generateId(),
    text: taskText,
    done: false,
    dueDate: dueDate ? dueDate.toISOString() : null,
    category: category || null,
    tags: tags
  };

  addTaskToDOM(newTask);
  saveTaskToStorage(newTask);

  // Clear inputs
  input.value = "";
  dateInput.value = "";
  categoryInput.value = "";
  
  // Hide date input if visible
  dateInput.classList.add("hidden");
  
  // Reset toggle buttons
  if (!dateInput.classList.contains("hidden")) {
    toggleDateBtn.click();
  }
  if (!categoryInput.classList.contains("hidden")) {
    toggleCategoryBtn.click();
  }
});

// FILTER SETUP
filterAll.addEventListener('click', () => applyFilter('all'));
filterDone.addEventListener('click', () => applyFilter('done'));
filterTodo.addEventListener('click', () => applyFilter('todo'));
filterOverdue.addEventListener('click', () => applyFilter('overdue'));

// CATEGORY MANAGEMENT
function updateCategoryList() {
  categoryList.innerHTML = "";
  allCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    categoryList.appendChild(option);
  });
}

function updateCategoryFilters() {
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

function deleteCategory(category) {
  const index = allCategories.indexOf(category);
  if (index !== -1) {
    allCategories.splice(index, 1);
  }
  
  localStorage.setItem('categories', JSON.stringify(allCategories));
  
  updateCategoryList();
  updateCategoryFilters();
  
  const tasks = getTasksFromStorage();
  let tasksUpdated = false;
  
  tasks.forEach(task => {
    if (task.category === category) {
      task.category = null;
      tasksUpdated = true;
    }
  });
  
  if (tasksUpdated) {
    saveTasksToStorage(tasks);
    
    document.querySelectorAll('#todo-list li').forEach(li => {
      const categoryChip = li.querySelector('.category-chip');
      if (categoryChip && categoryChip.textContent === category) {
        categoryChip.remove();
      }
    });
  }
  
  applyFilter('all');
}

// TAG MANAGEMENT
function updateTagFilters() {
  tagFiltersContainer.innerHTML = "";
  
  allTags.forEach(tag => {
    const button = document.createElement('button');
    button.className = 'tag-filter';
    button.textContent = '#' + tag;
    
    button.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        applyFilter('all');
      } else {
        document.querySelectorAll('.tag-filter').forEach(btn => {
          btn.classList.remove('active');
        });
        this.classList.add('active');
        applyFilter('tag', tag);
      }
    });
    
    tagFiltersContainer.appendChild(button);
  });
  
  localStorage.setItem('tags', JSON.stringify(allTags));
}

function deleteTag(tag) {
  const index = allTags.indexOf(tag);
  if (index !== -1) {
    allTags.splice(index, 1);
  }
  
  localStorage.setItem('tags', JSON.stringify(allTags));
  
  updateTagFilters();
  
  const tasks = getTasksFromStorage();
  let tasksUpdated = false;
  
  tasks.forEach(task => {
    if (task.tags && task.tags.includes(tag)) {
      task.tags = task.tags.filter(t => t !== tag);
      tasksUpdated = true;
    }
  });
  
  if (tasksUpdated) {
    saveTasksToStorage(tasks);
    
    document.querySelectorAll('#todo-list li').forEach(li => {
      li.querySelectorAll('.tag-chip').forEach(tagEl => {
        if (tagEl.textContent === '#' + tag) {
          tagEl.remove();
        }
      });
    });
  }
  
  applyFilter('all');
}

// TASK RENDERING
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;

  const taskContent = document.createElement("div");
  taskContent.className = "task-content";

  const span = document.createElement("span");
  span.textContent = task.text;
  if (task.done) {
    span.classList.add("done");
  }

  // Make span editable on double click
  span.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";

    taskContent.replaceChild(input, span);
    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (input.value.trim() !== "") {
          span.textContent = input.value.trim();
          taskContent.replaceChild(span, input);
          updateStorageFromDOM();
        }
      } else if (e.key === "Escape") {
        taskContent.replaceChild(span, input);
      }
    });

    input.addEventListener("blur", () => {
      taskContent.replaceChild(span, input);
    });
  });

  // Toggle done when clicked
  span.addEventListener("click", () => {
    span.classList.toggle("done");
    updateStorageFromDOM();
  });

  taskContent.appendChild(span);
  
  // Create task info section for category, tags, and date
  const taskInfo = document.createElement("div");
  taskInfo.className = "task-info";
  
  // Add category if present
  if (task.category) {
    const categoryChip = document.createElement("span");
    categoryChip.className = "category-chip";
    categoryChip.textContent = task.category;
    taskInfo.appendChild(categoryChip);
  }
  
  // Add tags if present
  if (task.tags && task.tags.length > 0) {
    task.tags.forEach(tag => {
      const tagChip = document.createElement("span");
      tagChip.className = "tag-chip";
      tagChip.textContent = "#" + tag;
      taskInfo.appendChild(tagChip);
    });
  }
  
  // Add due date if present
  if (task.dueDate) {
    const dueDateElement = document.createElement("span");
    dueDateElement.className = "due-date";
    
    const dueDate = new Date(task.dueDate);
    dueDateElement.textContent = dueDate.toLocaleDateString('en-GB');
    
    // Check if overdue
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (dueDate < today && !task.done) {
      dueDateElement.classList.add("overdue");
    } else if (dueDate <= tomorrow && !task.done) {
      dueDateElement.classList.add("due-soon");
    }
    
    taskInfo.appendChild(dueDateElement);
  }
  
  // Add task info if there's any content
  if (taskInfo.children.length > 0) {
    taskContent.appendChild(taskInfo);
  }
  
  li.appendChild(taskContent);
  list.appendChild(li);
}

// DATA PERSISTENCE
function getTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
} 

function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
}

function updateStorageFromDOM() {
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

// FILTERING
function applyFilter(mode, value) {
  document.querySelectorAll('#todo-list li').forEach(li => {
    const span = li.querySelector('span');
    const isDone = span.classList.contains('done');
    const dueDateElement = li.querySelector('.due-date');
    const categoryChip = li.querySelector('.category-chip');
    const tagChips = li.querySelectorAll('.tag-chip');
    
    let isOverdue = false;
    if (dueDateElement && dueDateElement.classList.contains('overdue')) {
      isOverdue = true;
    }
    
    let shouldShow = true;
    
    if (mode === 'all') {
      shouldShow = true;
    } else if (mode === 'done') {
      shouldShow = isDone;
    } else if (mode === 'todo') {
      shouldShow = !isDone;
    } else if (mode === 'overdue') {
      shouldShow = isOverdue;
    } else if (mode === 'category') {
      shouldShow = categoryChip && categoryChip.textContent === value;
    } else if (mode === 'tag') {
      shouldShow = false;
      tagChips.forEach(chip => {
        if (chip.textContent === '#' + value) {
          shouldShow = true;
        }
      });
    }
    
    li.style.display = shouldShow ? '' : 'none';
  });

  // Visual active indicator
  if (mode !== 'category' && mode !== 'tag') {
    document.querySelectorAll('.category-filter, .tag-filter').forEach(btn => {
      btn.classList.remove('active');
    });
    
    [filterAll, filterDone, filterTodo, filterOverdue].forEach(btn => btn.classList.remove('active'));
    
    if (mode === 'all') filterAll.classList.add('active');
    if (mode === 'done') filterDone.classList.add('active');
    if (mode === 'todo') filterTodo.classList.add('active');
    if (mode === 'overdue') filterOverdue.classList.add('active');
  } else {
    [filterAll, filterDone, filterTodo, filterOverdue].forEach(btn => {
      btn.classList.remove('active');
    });
  }
}

// DATE MANAGEMENT
function updateDueDateStatus() {
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

// APP INITIALIZATION
function loadCategoriesAndTags() {
  const savedCategories = localStorage.getItem('categories');
  if (savedCategories) {
    allCategories = JSON.parse(savedCategories);
    updateCategoryList();
    updateCategoryFilters();
  }
  
  const savedTags = localStorage.getItem('tags');
  if (savedTags) {
    allTags = JSON.parse(savedTags);
    updateTagFilters();
  }
  
  const tasks = getTasksFromStorage();
  tasks.forEach(task => {
    if (task.tags && task.tags.length > 0) {
      task.tags.forEach(tag => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    }
    
    if (task.category && !allCategories.includes(task.category)) {
      allCategories.push(task.category);
    }
  });
  
  if (allTags.length > 0) {
    updateTagFilters();
  }
  
  if (allCategories.length > 0) {
    updateCategoryList();
    updateCategoryFilters();
  }
}

// START APP
loadCategoriesAndTags();
getTasksFromStorage().forEach(task => {
  addTaskToDOM(task);
});

applyFilter('all');
updateDueDateStatus();

setInterval(updateDueDateStatus, 60000);