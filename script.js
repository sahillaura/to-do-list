// Get references to the DOM elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

// Add task to the list
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText, false);

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
}

// Create a task element
function createTaskElement(text, completed) {
  const li = document.createElement("li");
  const taskSpan = document.createElement("span");
  taskSpan.textContent = text;
  if (completed) {
    taskSpan.classList.add("completed");
  }

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.onclick = () => toggleComplete(taskSpan);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.onclick = () => deleteTask(li, text);

  li.appendChild(taskSpan);
  li.appendChild(completeButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

// Toggle task completion
function toggleComplete(taskSpan) {
  taskSpan.classList.toggle("completed");

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find(t => t.text === taskSpan.textContent);
  task.completed = !task.completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task
function deleteTask(taskElement, taskText) {
  taskElement.remove();

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const updatedTasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
