// Setup Event Listener for Page Load
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM Elements
  const addButton = document.getElementById("add-task-button");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Create the addTask Function
  function addTask() {
    // Retrieve and trim the value from the task input field
    const taskText = taskInput.value.trim();

    // Check if taskText is not empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new li element and set its textContent to taskText
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create a new button element for removing the task
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    // Assign an onclick event to the remove button
    removeButton.onclick = function () {
      taskList.removeChild(li);
    };

    // Append the remove button to the li element, then append the li to taskList
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Clear the task input field
    taskInput.value = "";
  }

  // Attach Event Listeners
  addButton.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Initial setup can be placed here if needed, but typically not necessary to call addTask on load
});
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage
  loadTasks();

  // Add task on button click
  addButton.addEventListener("click", () => {
    addTask(taskInput.value.trim());
  });

  // Add task on Enter key press
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask(taskInput.value.trim());
    }
  });

  function addTask(taskText, save = true) {
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create new task element
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.textContent = taskText;

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";
    removeButton.addEventListener("click", () => {
      removeTask(taskText);
    });

    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Save to Local Storage if required
    if (save) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Clear the input field
    taskInput.value = "";
  }

  function removeTask(taskText) {
    // Remove task from the DOM
    const tasks = Array.from(taskList.children);
    tasks.forEach((task) => {
      if (task.textContent.includes(taskText)) {
        taskList.removeChild(task);
      }
    });

    // Update Local Storage
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false)); // 'false' prevents saving duplicates
  }
});
