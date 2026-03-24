const inp = document.getElementById("inp");
const btn = document.getElementById("btn");
const list = document.getElementById("list");
const menuBtn = document.getElementById("menu-btn");
const dropdown = document.getElementById("dropdown");
const themeToggle = document.getElementById("theme-toggle");

let tasks = [];

// Load previous tasks
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  renderTasks();
}

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    // Fixed the '.' which caused CSS to skip styling it
    deleteBtn.classList.add("remove-btn");

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Add task logic
function addTask() {
  const value = inp.value.trim();
  if (value === "") {
    alert("Please enter a task");
    return;
  }
  tasks.push(value);
  saveTasks();
  renderTasks();
  inp.value = "";
  inp.focus();
}
//add task when button is clicked
btn.addEventListener("click", addTask);

//add task when enter key is pressed
inp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

//Additional feature nod needed but i added it
// Three dot menu toggle functionality

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent immediate closing
  dropdown.classList.toggle("show");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && !menuBtn.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});

// Initialize dark mode from localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// Toggle dark mode and save
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  dropdown.classList.remove("show");
});

// Start app
loadTasks();
