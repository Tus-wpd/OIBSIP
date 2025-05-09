
let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    createdAt: new Date(),
    completedAt: null
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const pendingList = document.getElementById("pendingTasks");
  const completedList = document.getElementById("completedTasks");
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text} <small>(${task.createdAt.toLocaleString()})</small></span>
      <span>
        ${task.completed ? '' : `<button onclick="completeTask(${task.id})">Complete</button>`}
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </span>
    `;
    li.className = task.completed ? "completed" : "";
    (task.completed ? completedList : pendingList).appendChild(li);
  });
}

function completeTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: true, completedAt: new Date() } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function editTask(id) {
  const newText = prompt("Edit task:", tasks.find(task => task.id === id).text);
  if (newText !== null && newText.trim() !== "") {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText.trim() } : task
    );
    renderTasks();
  }
}
