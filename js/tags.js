// Tag Management Module
import * as Storage from './storage.js';
import { applyFilter } from './filters.js';

let allTags = [];

// Tag Initialization
export function initTags(savedTags = []) {
  allTags = savedTags;
  updateTagFilters();
}

// Tag Extraction
export function extractTags(text) {
  const tags = [];
  const tagRegex = /#(\w+)/g;
  let match;
  
  while ((match = tagRegex.exec(text)) !== null) {
    const tag = match[1].toLowerCase();
    tags.push(tag);
    
    if (!allTags.includes(tag)) {
      allTags.push(tag);
      updateTagFilters();
    }
  }
  
  return tags;
}

// Tag Filter UI
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

// Tag Deletion
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

// Tag Rendering
export function createTagChipsHTML(tagsArray) {
    if (!tagsArray || tagsArray.length === 0) return '';
    return tagsArray.map(tag =>
        `<span class="tag-chip bg-tertiary-container text-on-tertiary-container px-2.5 py-1 rounded-lg">#${tag}</span>`
    ).join('');
}

// Tag Retrieval
export function getTags() {
  return [...allTags];
}

// Form Tag Management
let selectedTags = [];

export function getSelectedTags() {
    return selectedTags;
}

export function addTag(tagText) {
    if (tagText && !selectedTags.includes(tagText)) {
        selectedTags.push(tagText);
        renderSelectedTags();
    }
}

export function removeTag(tagText) {
    selectedTags = selectedTags.filter(tag => tag !== tagText);
    renderSelectedTags();
}

export function resetTagInput() {
    selectedTags = [];
    const tagContainer = document.getElementById('selected-tags');
    if (tagContainer) {
        tagContainer.innerHTML = '';
    }
}

function renderSelectedTags() {
    const tagContainer = document.getElementById('selected-tags');
    if (!tagContainer) return;
    
    tagContainer.innerHTML = '';
    
    selectedTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag-chip';
        tagElement.textContent = tag;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'pill-delete-btn';
        deleteButton.innerHTML = '&times;';
        deleteButton.addEventListener('click', () => removeTag(tag));
        
        tagElement.appendChild(deleteButton);
        tagContainer.appendChild(tagElement);
    });
}