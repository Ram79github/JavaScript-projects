const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];

let dragElement = null; // dragged element is stored here

// Function to update task count and local storage
function updateBoard() {
  const taskData = {};
  
  columns.forEach((col) => {
    const tasksInColumn = col.querySelectorAll(".task");
    const countElement = col.querySelector(".heading .right");
    countElement.textContent = tasksInColumn.length;

    taskData[col.id] = Array.from(tasksInColumn).map((task) => {
      return {
        title: task.querySelector("h2").textContent,
        description: task.querySelector("p").textContent,
      };
    });
  });

  localStorage.setItem("task", JSON.stringify(taskData));
}

// Function to create a task element
// Applies the necessary CSS classes, content, and event listeners
function createTaskElement(title, description) {
  const div = document.createElement("div");
  div.classList.add("task"); // Required for styling and counting
  div.setAttribute("draggable", "true");
  
  div.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
    <button class="delete-btn">Delete</button>
  `;

  // Drag Events
  div.addEventListener("dragstart", () => {
    dragElement = div;
  });

  div.addEventListener("dragend", () => {
    dragElement = null;
    updateBoard();
  });

  // Delete Event
  div.querySelector(".delete-btn").addEventListener("click", () => {
    div.remove();
    updateBoard(); // Update count and storage after deletion
  });

  return div;
}

// Load tasks from local storage
function loadTasks() {
  const savedTaskData = localStorage.getItem("task");
  if (savedTaskData) {
    const data = JSON.parse(savedTaskData);
    for (const colId in data) {
      const column = document.querySelector(`#${colId}`);
      if (column && data[colId]) {
        data[colId].forEach((taskData) => {
          const taskElement = createTaskElement(taskData.title, taskData.description);
          column.appendChild(taskElement);
        });
      }
    }
  }
  updateBoard(); // Initial count text setup
}

// Add drop events to columns
columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault(); // Necessary to allow dropping
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("hover-over");
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
    if (dragElement) {
      column.appendChild(dragElement);
      updateBoard(); // Update count and storage after dropping
    }
  });
});

// Modal open and close logic
const toggleModalBtn = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addNewTaskBtn = document.querySelector("#add-new-task");
const taskTitleInput = document.querySelector("#task-title");
const taskDescInput = document.querySelector("#task-description");

function closeModal() {
  modal.classList.remove("active");
  taskTitleInput.value = "";
  taskDescInput.value = "";
}

toggleModalBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

modalBg.addEventListener("click", closeModal);

addNewTaskBtn.addEventListener("click", () => {
  const title = taskTitleInput.value.trim();
  const desc = taskDescInput.value.trim();
  
  if (title) { // Add only if title is provided
    const taskElement = createTaskElement(title, desc);
    todo.appendChild(taskElement);
    updateBoard();
    closeModal();
  }
});

// Initialize Board
loadTasks();
