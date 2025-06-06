const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const filterAll = document.getElementById("filter-all");
const filterDone = document.getElementById("filter-done");
const filterTodo = document.getElementById("filter-todo");

// Handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = input.value.trim();
  if (task === "") return;

  addTaskToDOM(task);
  input.value = "";
  updateStorageFromDOM();
});

//filter buttons
filterAll.addEventListener('click', () => applyFilter('all'));
filterDone.addEventListener('click', () => applyFilter('done'));
filterTodo.addEventListener('click', () => applyFilter('todo'));

function addTaskToDOM(taskText, isDone = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  // Add done class if task is marked as done
  if (isDone) {
    span.classList.add('done')
  }

  // Toggle done when clicked
  span.addEventListener("click", () => {
    span.classList.toggle("done");
    updateStorageFromDOM();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateStorageFromDOM();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Load tasks from localStorage on page load

function getTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from storage and add to DOM
function updateStorageFromDOM() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const done = li.querySelector('span').classList.contains('done');
    tasks.push({ text, done });
});
saveTasksToStorage(tasks);
}

// Filter tasks
function applyFilter(mode) {
  document.querySelectorAll('#todo-list li').forEach(li => {
    const span = li.querySelector('span');
    const isDone = span.classList.contains('done');

    if (mode === 'all') {
      li.style.display = '';
    } else if (mode === 'done') {
      li.style.display = isDone ? '' : 'none';
    } else if (mode === 'todo') {
      li.style.display = isDone ? 'none' : '';
    }
  });

  //visual active indicator
  [filterAll, filterDone, filterTodo].forEach(btn => btn.classList.remove('active'));
  if (mode === 'all') filterAll.classList.add('active');
  if (mode === 'done') filterDone.classList.add('active');
  if (mode === 'todo') filterTodo.classList.add('active');
}

getTasksFromStorage().forEach(task => {
  addTaskToDOM(task.text, task.done);
  applyFilter('all');
});