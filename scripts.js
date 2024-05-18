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

// retrieve json with projects

fetch("./projects.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("projects-container");
    data.forEach((item) => {
      // Create a card element
      const card = document.createElement("div");
      card.classList.add("card");

      // Create a title element
      const title = document.createElement("h2");
      title.classList.add("card-title");
      title.textContent = item.title;

      // Create a description element
      //   const description = document.createElement("p");
      //   description.classList.add("card-description");
      //   description.textContent = item.description;
      // Create a website element
      const website = document.createElement("a");
      website.classList.add("card-website");
      website.href = item.website;
      website.target = "_blank";
      website.textContent = "Website";
      // Create a code element
      const code = document.createElement("a");
      code.classList.add("card-code");
      code.href = item.code;
      code.target = "_blank";
      code.textContent = "Code";
      // Create a image element
      const image = document.createElement("img");
      image.classList.add("card-image");
      image.src = item.image;
      // Create a tools element
      const tools = document.createElement("p");
      tools.classList.add("card-tools");
      tools.textContent = item.tools;

      // Append title and description to the card
      card.appendChild(title);
      card.appendChild(image);
      //   card.appendChild(description);
      card.appendChild(website);
      card.appendChild(code);
      card.appendChild(tools);

      // Append the card to the container
      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching the JSON data:", error));
