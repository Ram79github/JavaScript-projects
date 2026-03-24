const toggleBtn = document.getElementById("toggle");
const rootElement = document.documentElement;

// Check if there is a saved theme in local storage
const savedTheme = localStorage.getItem("theme");

// Apply the saved theme or fallback to the system preference
if (savedTheme) {
  rootElement.setAttribute("data-theme", savedTheme);
}

// Add click event listener to the toggle button
toggleBtn.addEventListener("click", () => {
  // Determine the current theme
  let currentTheme = rootElement.getAttribute("data-theme");

  // If no data-theme is set, figure out the OS default
  if (!currentTheme) {
    currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Toggle the theme
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // Apply the new theme to the root element (HTML tag)
  rootElement.setAttribute("data-theme", newTheme);

  // Save the user's choice in local storage
  localStorage.setItem("theme", newTheme);
});
