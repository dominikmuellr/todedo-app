// Main Application File
import * as Tasks from './tasks.js';
import * as Categories from './categories.js';
import * as Tags from './tags.js';
import * as Filters from './filters.js';
import * as Storage from './storage.js';
import * as RandomTitle from './randomTitle.js';
import * as DatePickerUtils from './datePickerUtils.js';

// Error Handling
function showError(message) {
    try {
        const existingErrorElem = document.getElementById('app-error-message');
        if (existingErrorElem) {
            existingErrorElem.textContent = message;
            existingErrorElem.classList.remove('hidden');
            return;
        }

        const errorElem = document.createElement('div');
        errorElem.id = 'app-error-message';
        errorElem.className = 'bg-error-container text-on-error-container px-4 py-3 rounded-lg mb-4 max-w-md mx-auto text-center';
        errorElem.textContent = message;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'ml-2 font-bold hover:text-on-error-container/80';
        closeBtn.onclick = () => errorElem.remove();
        
        errorElem.appendChild(closeBtn);
        
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            appContainer.parentNode.insertBefore(errorElem, appContainer);
        } else {
            document.body.insertBefore(errorElem, document.body.firstChild);
        }
        
        setTimeout(() => {
            if (errorElem.parentNode) {
                errorElem.remove();
            }
        }, 7000);
    } catch (error) {
        console.error("Error showing error message:", error);
    }
}

let isInitialized = false;

// App Initialization
function initApp() {
    if (isInitialized) return;
    
    console.log("Initializing app...");
    
    try {
        RandomTitle.setRandomTitle('app-title');
        DatePickerUtils.initNativeDatePicker('due-date-input', 'toggle-date-btn', 'selected-dates');

        // DOM Element Selection
        const todoForm = document.getElementById('todo-form');
        const todoInput = document.getElementById('todo-input');
        const categoryInput = document.getElementById('category-input');
        const tagInput = document.getElementById('tag-input');

        const toggleDateBtn = document.getElementById('toggle-date-btn');
        const toggleCategoryBtn = document.getElementById('toggle-category-btn');

        const filterAllBtn = document.getElementById('filter-all');
        const filterTodoBtn = document.getElementById('filter-todo');
        const filterDoneBtn = document.getElementById('filter-done');
        const filterOverdueBtn = document.getElementById('filter-overdue');

        // Date Button Handler
        if (toggleDateBtn) {
            toggleDateBtn.addEventListener('click', function(e) {
                try {
                    e.preventDefault();
                    if (DatePickerUtils.isDatePickerOpen()) {
                        DatePickerUtils.closeDatePicker();
                    } else {
                        DatePickerUtils.openDatePicker();
                        if(categoryInput) categoryInput.classList.add('hidden');
                        if(toggleCategoryBtn) {
                            toggleCategoryBtn.classList.remove('active');
                            toggleCategoryBtn.innerHTML = `<i class="fas fa-tags mr-2"></i>Category`;
                        }
                    }
                } catch (error) {
                    console.error("Error toggling date picker:", error);
                    showError("Could not open date picker: " + error.message);
                }
            });
        } else {
            console.error("toggleDateBtn not found!");
            showError("Error initializing: Date button not found.");
        }

        // Category Button Handler
        if (toggleCategoryBtn) {
            toggleCategoryBtn.addEventListener('click', function(e) {
                try {
                    e.preventDefault();
                    if (!categoryInput) {
                        console.error("categoryInput element not found for toggleCategoryBtn");
                        return;
                    }
                    
                    const existingModal = document.getElementById('category-modal-container');
                    if (existingModal) {
                        existingModal.remove();
                        return;
                    }
                    
                    const container = document.createElement('div');
                    container.id = 'category-modal-container';
                    container.className = 'category-modal';
                    
                    const title = document.createElement('h3');
                    title.textContent = 'Enter Category';
                    title.className = 'modal-title';
                    
                    const clonedInput = categoryInput.cloneNode(true);
                    clonedInput.classList.remove('hidden');
                    clonedInput.classList.add('category-modal-input');
                    
                    const buttonsDiv = document.createElement('div');
                    buttonsDiv.className = 'modal-button-container';
                    
                    const cancelBtn = document.createElement('button');
                    cancelBtn.textContent = 'Cancel';
                    cancelBtn.className = 'modal-button modal-cancel-btn';
                    
                    const confirmBtn = document.createElement('button');
                    confirmBtn.textContent = 'Confirm';
                    confirmBtn.className = 'modal-button modal-confirm-btn';
                    
                    buttonsDiv.appendChild(cancelBtn);
                    buttonsDiv.appendChild(confirmBtn);
                    
                    container.appendChild(title);
                    container.appendChild(clonedInput);
                    container.appendChild(buttonsDiv);
                    
                    document.body.appendChild(container);
                    clonedInput.focus();
                    
                    cancelBtn.addEventListener('click', () => {
                        container.remove();
                    });
                    
                    confirmBtn.addEventListener('click', () => {
                        if (clonedInput.value) {
                            categoryInput.value = clonedInput.value;
                            toggleCategoryBtn.classList.add('active');
                            toggleCategoryBtn.innerHTML = `<i class="fas fa-tags mr-2"></i>${clonedInput.value || 'Category'}`;
                        } else {
                            categoryInput.value = '';
                            toggleCategoryBtn.classList.remove('active');
                            toggleCategoryBtn.innerHTML = `<i class="fas fa-tags mr-2"></i>Category`;
                        }
                        container.remove();
                    });
                    
                    toggleCategoryBtn.classList.add('active');
                    DatePickerUtils.closeDatePicker();
                } catch (error) {
                    console.error("Error toggling category input:", error);
                    showError("Could not open category selector: " + error.message);
                }
            });
        } else {
            console.error("toggleCategoryBtn not found!");
            showError("Error initializing: Category button not found.");
        }

        // Form Submission Handler
        if (todoForm) {
            todoForm.addEventListener('submit', function(e) {
                try {
                    e.preventDefault();
                    
                    const taskText = todoInput.value.trim();
                    
                    if (!taskText) {
                        return;
                    }
                    
                    const dueDate = DatePickerUtils.getSelectedDate();
                    const category = categoryInput ? categoryInput.value.trim() : '';
                    
                    const tags = (Tags && typeof Tags.getSelectedTags === 'function') ? Tags.getSelectedTags() : [];
                    
                    Tasks.addTask(taskText, dueDate, category, tags);
                    Tasks.renderTasks(Filters.getActiveFilter());
                    
                    todoInput.value = '';
                    DatePickerUtils.resetDatePicker();
                    if (categoryInput) categoryInput.value = '';
                    
                    if (Tags && typeof Tags.resetTagInput === 'function') {
                        Tags.resetTagInput();
                    }
                    
                    todoInput.focus();
                } catch (error) {
                    console.error("Error adding task:", error);
                    showError("There was a problem adding your task. Please try again.");
                }
            });
        } else {
            console.error("todoForm not found!");
            showError("Error initializing: Form not found.");
        }

        // Filter Button Handlers
        if (filterAllBtn && filterTodoBtn && filterDoneBtn && filterOverdueBtn) {
            Filters.setupFilterButtons(filterAllBtn, filterTodoBtn, filterDoneBtn, filterOverdueBtn);
        } else {
            console.error("Filter buttons not found!");
            showError("Error initializing: Filter buttons not found.");
        }

        // Initial Render
        Tasks.renderTasks();
        
        isInitialized = true;
        console.log("App successfully initialized");
    } catch (error) {
        console.error("Failed to initialize app:", error);
        showError("Application initialization failed. Please refresh the page or check the console for details.");
    }
}

// Window Load Event
window.addEventListener('load', initApp);

// Export Functions
export { 
    initApp,
    showError
};