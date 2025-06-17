// Task Management Module
import * as Storage from './storage.js';
import { getDateDisplayInfo } from './datePickerUtils.js';
import { createTagChipsHTML } from './tags.js';
import * as DatePickerUtils from './datePickerUtils.js';
import { getActiveFilter } from './filters.js';

// Task ID Generation
export function generateId() {
  return Date.now().toString() + Math.random().toString(36).substring(2, 5);
}

// Task Creation
export function addTask(taskText, dueDate, category = '', tags = []) {
    const newTask = {
        id: generateId(),
        text: taskText,
        done: false,
        dueDate: dueDate ? dueDate.toISOString() : null,
        category: category || null,
        tags: tags || []
    };

    const tasks = Storage.getTasksFromStorage();
    tasks.push(newTask);
    Storage.saveTasksToStorage(tasks);
    
    renderTasks();
}

// Task Deletion
export function deleteTask(taskId) {
    let tasks = Storage.getTasksFromStorage();
    tasks = tasks.filter(t => t.id !== taskId);
    Storage.saveTasksToStorage(tasks);
    renderTasks();
}

// Task Rendering
export function renderTasks(filterFunction) {
    const todoList = document.getElementById('todo-list');
    if (!todoList) return;

    const filterFn = filterFunction || getActiveFilter();
    const tasks = Storage.getTasksFromStorage();
    const filteredTasks = tasks.filter(filterFn);

    todoList.innerHTML = '';

    if (filteredTasks.length === 0) {
        todoList.innerHTML = `<div class="empty-state">No tasks here!</div>`;
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'todo-item flex flex-col py-3 px-1 border-b border-outline-variant w-full box-border m-0 last:border-b-0 bg-surface-container-low rounded-lg mb-3 shadow-sm';
        li.dataset.id = task.id;
        if (task.done) {
            li.classList.add('task-done-visual');
        }

        let datePillHtml = '';
        if (task.dueDate) {
            try {
                const dueDateObj = new Date(task.dueDate);
                const displayInfo = getDateDisplayInfo(dueDateObj);
                datePillHtml = `<span class="due-date-pill px-2.5 py-1 rounded-lg font-medium ${displayInfo.className}" data-iso-date="${task.dueDate}">${displayInfo.text}</span>`;
            } catch (err) {
                console.error("Error processing date:", err);
            }
        }

        let categoryChipHtml = '';
        if (task.category) {
            categoryChipHtml = `<span class="category-chip bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-lg">${task.category}</span>`;
        }

        let tagsHtml = '';
        try {
            tagsHtml = task.tags ? createTagChipsHTML(task.tags) : '';
        } catch (err) {
            console.error("Error creating tag chips:", err);
        }
        
        const taskTextWithoutTags = task.text ? task.text.replace(/#\w+/g, '').trim() : 'Unnamed task';

        li.innerHTML = `
            <div class="task-content w-full flex flex-col gap-1">
                <div class="task-top-row flex justify-between items-center w-full">
                    <span class="task-text flex-grow break-words cursor-pointer text-on-surface text-lg ${task.done ? 'done' : ''}">${taskTextWithoutTags}</span>
                    <button class="delete-task-btn bg-transparent border-none text-on-surface-variant text-xl cursor-pointer p-1 ml-2 flex items-center justify-center rounded-full h-7 w-7 transition duration-200 hover:text-error hover:bg-error-container" aria-label="Delete task">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <div class="task-info flex flex-wrap items-center gap-1.5 mt-1 text-xs">
                    ${categoryChipHtml}
                    ${tagsHtml}
                    ${datePillHtml}
                </div>
            </div>
        `;
        todoList.appendChild(li);

        const taskText = li.querySelector('.task-text');
        if (taskText) {
            taskText.addEventListener('click', () => {
                toggleTaskDone(task.id);
            });
        }

        const deleteBtn = li.querySelector('.delete-task-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                deleteTask(task.id);
            });
        }
    });

    setupTaskDateEditing();
}

// Task Status Toggle
export function toggleTaskDone(taskId) {
  const tasks = Storage.getTasksFromStorage();
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return;

  tasks[taskIndex].done = !tasks[taskIndex].done;
  Storage.saveTasksToStorage(tasks);
  renderTasks();
}

// Task Date Editing Setup
export function setupTaskDateEditing() {
    document.querySelectorAll('#todo-list .due-date-pill').forEach(datePill => {
        try {
            const newPill = datePill.cloneNode(true);
            datePill.parentNode.replaceChild(newPill, datePill);
            
            newPill.classList.add('has-date-listener');
            
            newPill.addEventListener('click', (e) => {
                try {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const taskItem = newPill.closest('li[data-id]');
                    if (!taskItem) {
                        console.error("Could not find parent task item");
                        return;
                    }
                    
                    const taskId = taskItem.dataset.id;
                    
                    document.querySelectorAll('.temp-native-date-input').forEach(input => {
                        try {
                            input.remove();
                        } catch (err) {
                            console.error("Error removing input:", err);
                        }
                    });
                    
                    const tempInput = document.createElement('input');
                    tempInput.type = 'date';
                    tempInput.id = `temp-date-input-${taskId}`;
                    tempInput.classList.add('temp-native-date-input');
                    
                    if (newPill.dataset.isoDate) {
                        try {
                            tempInput.value = newPill.dataset.isoDate.substring(0, 10);
                        } catch (err) {
                            console.error("Error setting date value:", err);
                        }
                    }
                    
                    document.body.appendChild(tempInput);
                    const pillRect = newPill.getBoundingClientRect();
                    tempInput.style.position = 'fixed';
                    tempInput.style.top = `${pillRect.top}px`;
                    tempInput.style.left = `${pillRect.left}px`;
                    tempInput.style.zIndex = '1000';
                    
                    setTimeout(() => {
                        try {
                            tempInput.focus();
                            if (tempInput.showPicker) {
                                tempInput.showPicker();
                            } else {
                                tempInput.click();
                            }
                        } catch (err) {
                            console.error("Error showing date picker:", err);
                        }
                    }, 10);
                    
                    tempInput.addEventListener('change', () => {
                        try {
                            if (tempInput.value) {
                                const selectedDate = new Date(tempInput.value + 'T00:00:00');
                                updateTaskDate(taskId, selectedDate);
                            }
                            tempInput.remove();
                        } catch (err) {
                            console.error("Error handling date change:", err);
                        }
                    });
                    
                    tempInput.addEventListener('blur', () => {
                        setTimeout(() => {
                            try {
                                if (tempInput.parentNode) {
                                    tempInput.remove();
                                }
                            } catch (err) {
                                console.error("Error removing temp input:", err);
                            }
                        }, 200);
                    });
                } catch (err) {
                    console.error("Error handling date pill click:", err);
                }
            });
        } catch (err) {
            console.error("Error setting up date pill:", err);
        }
    });
}

// Task Date Update
export function updateTaskDate(taskId, newDate) {
    try {
        const tasks = Storage.getTasksFromStorage();
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex !== -1) {
            tasks[taskIndex].dueDate = newDate.toISOString();
            Storage.saveTasksToStorage(tasks);
            renderTasks();
        }
    } catch (err) {
        console.error("Error updating task date:", err);
    }
}

//# sourceMappingURL=tasks.js.map

