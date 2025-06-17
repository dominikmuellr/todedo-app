// Task Filter Module

let activeFilterFn = () => true; // Default to "all"

// Filter Definitions
export const filterFns = {
    all: () => true,
    pending: task => !task.done,
    completed: task => task.done,
    overdue: task => !task.done && task.dueDate && new Date(task.dueDate) < new Date().setHours(0,0,0,0),
    category: categoryName => task => task.category === categoryName,
    tag: tagName => task => task.tags && task.tags.includes(tagName)
};

// Filter Management
export function setActiveFilter(filterFn) {
    activeFilterFn = filterFn;
}

export function getActiveFilter() {
    return activeFilterFn;
}

// Button UI Management
export function setActiveFilterButton(activeButton) {
    const filterBar = document.getElementById('filter-bar');
    if (filterBar) {
        filterBar.querySelectorAll('button, .category-filter, .tag-filter').forEach(button => {
            button.classList.remove('active', 'bg-primary', 'text-on-primary');
        });
    }
    
    if (activeButton) {
        activeButton.classList.add('active', 'bg-primary', 'text-on-primary');
    }
}

// Filter Application
export function applyFilter(filterType, filterValue) {
    try {
        import('./tasks.js').then(Tasks => {
            let filterFn;
            
            if (filterType === 'all') {
                filterFn = filterFns.all;
            } else if (filterType === 'pending') {
                filterFn = filterFns.pending;
            } else if (filterType === 'completed') {
                filterFn = filterFns.completed;
            } else if (filterType === 'overdue') {
                filterFn = filterFns.overdue;
            } else if (filterType === 'category') {
                filterFn = filterFns.category(filterValue);
            } else if (filterType === 'tag') {
                filterFn = filterFns.tag(filterValue);
            } else {
                filterFn = filterFns.all;
            }
            
            setActiveFilter(filterFn);
            Tasks.renderTasks(filterFn);
        });
    } catch (error) {
        console.error("Error applying filter:", error);
    }
}

// Setup Filter Buttons
export function setupFilterButtons(allBtn, todoBtn, doneBtn, overdueBtn) {
    if (allBtn) {
        allBtn.addEventListener('click', function() { 
            const filter = filterFns.all;
            setActiveFilter(filter);
            setActiveFilterButton(allBtn); 
            import('./tasks.js').then(Tasks => {
                Tasks.renderTasks(filter);
            });
        });
    }
    
    if (todoBtn) {
        todoBtn.addEventListener('click', function() {
            const filter = filterFns.pending;
            setActiveFilter(filter);
            setActiveFilterButton(todoBtn); 
            import('./tasks.js').then(Tasks => {
                Tasks.renderTasks(filter);
            });
        });
    }
    
    if (doneBtn) {
        doneBtn.addEventListener('click', function() { 
            const filter = filterFns.completed;
            setActiveFilter(filter);
            setActiveFilterButton(doneBtn); 
            import('./tasks.js').then(Tasks => {
                Tasks.renderTasks(filter);
            });
        });
    }
    
    if (overdueBtn) {
        overdueBtn.addEventListener('click', function() {
            const filter = filterFns.overdue;
            setActiveFilter(filter);
            setActiveFilterButton(overdueBtn); 
            import('./tasks.js').then(Tasks => {
                Tasks.renderTasks(filter);
            });
        });
    }
    
    // Set initial filter and active button
    setActiveFilter(filterFns.all);
    setActiveFilterButton(allBtn);
}