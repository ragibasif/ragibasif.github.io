// script.js
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Function to set dark mode
const setDarkMode = (isDarkMode) => {
  if (isDarkMode) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
};

// Check user preference from localStorage
const savedDarkMode = localStorage.getItem("darkMode") === "true";

// Initialize dark mode based on user preference
setDarkMode(savedDarkMode);

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
  const isDarkMode = body.classList.toggle("dark-mode");
  // Save user preference
  localStorage.setItem("darkMode", isDarkMode);
});
