// tasks.js - Task management functionality
import * as Storage from './storage.js';

// Generate a unique ID for a task
export function generateId() {
  return Date.now().toString() + Math.random().toString(36).substring(2, 5);
}

// Create a new task and add it to the DOM and storage
export function createTask(text, dueDate, category, tags) {
  const newTask = {
    id: generateId(),
    text: text,
    done: false,
    dueDate: dueDate ? dueDate.toISOString() : null,
    category: category || null,
    tags: tags || []
  };

  addTaskToDOM(newTask);
  Storage.saveTaskToStorage(newTask);
  
  return newTask;
}

// Add a task to the DOM
export function addTaskToDOM(task) {
  const list = document.getElementById("todo-list");
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
          Storage.updateStorageFromDOM();
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
    Storage.updateStorageFromDOM();
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