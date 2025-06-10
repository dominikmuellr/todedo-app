// tags.js - Tag management
import * as Storage from './storage.js';
import { applyFilter } from './filters.js';

let allTags = [];

// Initialize tags
export function init(savedTags = []) {
  allTags = savedTags;
  updateTagFilters();
}

// Extract hashtags from text
export function extractTags(text) {
  const tags = [];
  const tagRegex = /#(\w+)/g;
  let match;
  
  while ((match = tagRegex.exec(text)) !== null) {
    const tag = match[1].toLowerCase();
    tags.push(tag);
    
    // Add to global tags list if new
    if (!allTags.includes(tag)) {
      allTags.push(tag);
      updateTagFilters();
    }
  }
  
  return tags;
}

// Update tag filter buttons
export function updateTagFilters() {
  const tagFiltersContainer = document.getElementById("tag-filters");
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
  
  Storage.saveTagsToStorage(allTags);
}

// Delete a tag
export function deleteTag(tag) {
  const index = allTags.indexOf(tag);
  if (index !== -1) {
    allTags.splice(index, 1);
  }
  
  Storage.saveTagsToStorage(allTags);
  
  updateTagFilters();
  
  const tasks = Storage.getTasksFromStorage();
  let tasksUpdated = false;
  
  tasks.forEach(task => {
    if (task.tags && task.tags.includes(tag)) {
      task.tags = task.tags.filter(t => t !== tag);
      tasksUpdated = true;
    }
  });
  
  if (tasksUpdated) {
    Storage.saveTasksToStorage(tasks);
    
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

// Get all tags
export function getTags() {
  return [...allTags];
}