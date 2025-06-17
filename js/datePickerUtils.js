// Date picker utilities using NATIVE HTML <input type="date">

let dateInputElement;
let toggleButtonElem;
let selectedDatesContainerElem;

// Initialization
export function initNativeDatePicker(dateInputId, toggleBtnId, selectedDatesContainerId) {
    dateInputElement = document.getElementById(dateInputId);
    toggleButtonElem = document.getElementById(toggleBtnId);
    selectedDatesContainerElem = document.getElementById(selectedDatesContainerId);

    if (!dateInputElement || !toggleButtonElem) {
        console.error("Required elements not found for date picker");
        return;
    }
    
    dateInputElement.type = "date";
    dateInputElement.classList.add('date-picker-input');
    dateInputElement.classList.add('hidden');
    
    const newDateInput = dateInputElement.cloneNode(true);
    if (dateInputElement.parentNode) {
        dateInputElement.parentNode.replaceChild(newDateInput, dateInputElement);
        dateInputElement = newDateInput;
    }
    
    const newToggleBtn = toggleButtonElem.cloneNode(true);
    if (toggleButtonElem.parentNode) {
        toggleButtonElem.parentNode.replaceChild(newToggleBtn, toggleButtonElem);
        toggleButtonElem = newToggleBtn;
    }
    
    toggleButtonElem.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isDatePickerOpen()) {
            closeDatePicker();
        } else {
            openDatePicker();
        }
    });
    
    dateInputElement.addEventListener('change', function(e) {
        if (this.value) {
            try {
                const selectedDate = new Date(this.value + 'T00:00:00');
                
                displaySelectedDatePill(selectedDate);
                
                toggleButtonElem.classList.add('active');
                const displayInfo = getDateDisplayInfo(selectedDate);
                toggleButtonElem.innerHTML = `<i class="far fa-calendar mr-2"></i>${displayInfo.text}`;
                
                closeDatePicker();
            } catch (err) {
                console.error("Error handling date change:", err);
            }
        }
    });
    
    closeDatePicker();
}

// Open Date Picker
export function openDatePicker() {
    if (!dateInputElement) {
        console.error("Date input element not found");
        return;
    }
    
    closeDatePicker();
    
    const container = document.createElement('div');
    container.id = 'date-picker-container';
    container.className = 'date-picker-modal';
    
    const title = document.createElement('h3');
    title.textContent = 'Pick a date';
    title.className = 'modal-title';
    
    const clonedInput = document.createElement('input');
    clonedInput.id = 'temp-date-input';
    clonedInput.type = 'date';
    clonedInput.className = 'date-picker-modal-input';
    clonedInput.value = dateInputElement.value || '';
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'modal-button-container';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'modal-button modal-cancel-btn';
    cancelBtn.type = 'button';
    
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm';
    confirmBtn.className = 'modal-button modal-confirm-btn';
    confirmBtn.type = 'button';
    
    buttonsDiv.appendChild(cancelBtn);
    buttonsDiv.appendChild(confirmBtn);
    
    container.appendChild(title);
    container.appendChild(clonedInput);
    container.appendChild(buttonsDiv);
    
    document.body.appendChild(container);
    
    setTimeout(() => {
        try {
            clonedInput.focus();
            if (clonedInput.showPicker) {
                clonedInput.showPicker();
            } else {
                clonedInput.click();
            }
        } catch (e) {
            console.error("Error showing date picker:", e);
        }
    }, 200);
    
    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.remove();
        closeDatePicker();
    });
    
    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (clonedInput.value) {
            dateInputElement.value = clonedInput.value;
            const selectedDate = safelyParseDate(clonedInput.value + 'T00:00:00');
            if (selectedDate) {
                displaySelectedDatePill(selectedDate);
                
                toggleButtonElem.classList.add('active');
                const displayInfo = getDateDisplayInfo(selectedDate);
                toggleButtonElem.innerHTML = `<i class="far fa-calendar mr-2"></i>${displayInfo.text}`;
            }
        }
        container.remove();
        closeDatePicker();
    });
    
    container.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    document.addEventListener('click', function handleOutsideClick(e) {
        if (!container.contains(e.target)) {
            container.remove();
            closeDatePicker();
            document.removeEventListener('click', handleOutsideClick);
        }
    });
    
    toggleButtonElem.classList.add('active');
}

// Close Date Picker
export function closeDatePicker() {
    if (dateInputElement) {
        dateInputElement.classList.add('hidden');
    }
    
    const container = document.getElementById('date-picker-container');
    if (container) {
        container.remove();
    }
}

// Check if Date Picker is Open
export function isDatePickerOpen() {
    const isInputVisible = dateInputElement && !dateInputElement.classList.contains('hidden');
    const isModalOpen = !!document.getElementById('date-picker-container');
    
    return isInputVisible || isModalOpen;
}

// Get Selected Date
export function getSelectedDate() {
    if (dateInputElement && dateInputElement.value) {
        return safelyParseDate(dateInputElement.value + 'T00:00:00');
    }
    return null;
}

// Reset Date Picker
export function resetDatePicker() {
    if (dateInputElement) {
        dateInputElement.value = '';
        dateInputElement.classList.add('hidden');
    }
    
    if (toggleButtonElem) {
        toggleButtonElem.classList.remove('active');
        toggleButtonElem.innerHTML = '<i class="far fa-calendar mr-2"></i>Due Date';
    }
    
    if (selectedDatesContainerElem) {
        selectedDatesContainerElem.innerHTML = '';
        selectedDatesContainerElem.classList.add('hidden');
    }
}

// Display Selected Date Pill
function displaySelectedDatePill(date) {
    if (!selectedDatesContainerElem) return;
    
    const displayInfo = getDateDisplayInfo(date);
    
    selectedDatesContainerElem.innerHTML = `
        <span class="form-date-pill inline-flex items-center text-sm px-2.5 py-1 rounded-full ${displayInfo.className}">
            ${displayInfo.text}
            <button type="button" class="pill-delete-btn ml-1.5">&times;</button>
        </span>
    `;
    selectedDatesContainerElem.classList.remove('hidden');
    
    const deleteBtn = selectedDatesContainerElem.querySelector('.pill-delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            resetDatePicker();
        });
    }
}

// Get Date Display Information
export function getDateDisplayInfo(date) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);
        
        if (dateOnly.getTime() === today.getTime()) {
            return { text: 'Today', className: 'bg-primary-container text-on-primary-container' };
        } else if (dateOnly.getTime() === tomorrow.getTime()) {
            return { text: 'Tomorrow', className: 'bg-secondary-container text-on-secondary-container' };
        } else if (dateOnly < today) {
            return { text: formatDate(dateOnly), className: 'bg-error-container text-on-error-container' };
        } else {
            return { text: formatDate(dateOnly), className: 'bg-tertiary-container text-on-tertiary-container' };
        }
    } catch (err) {
        console.error("Error getting date display info:", err);
        return { text: 'Invalid date', className: 'bg-error-container text-on-error-container' };
    }
}

// Format Date
function formatDate(date) {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Safe Date Parsing
export function safelyParseDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return null;
        }
        return date;
    } catch (err) {
        console.error("Error parsing date:", err);
        return null;
    }
}

// Initialize on document ready to handle any automatic initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded in datePickerUtils.js");
});