const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

//Prevents from reloading the page
form .addEventListener('submit', function (e) {
  e.preventDefault();

  //Add task to list but without spaces before and after
  const task = input.value.trim();
  //If task is empty, do nothing
  if (task === '') return;

  //Add task and reset
  addTaskToDOM(task);
  input.value = '';
}