// Dynamically update the copyright year to be the current year.
function makeCopyright() {
  const copyrightOwner = "Ragib Asif";
  const currentYear = new Date().getFullYear();
  const copyrightText = document.getElementById("copyright");
  copyrightText.innerHTML = `<p>&copy; ${currentYear} ${copyrightOwner}. All rights reserved.</p>`;
}

function makeSocials() {
  // Fetch the JSON file containing the socials information and links
  fetch("../assets/data/socials.json")
    .then((response) => response.json())
    .then((data) => {
      const socialsList = document.querySelector(".socials");

      // Populate the socials list
      data.socials.forEach((social) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
      <a href="${social.url}" target="_blank" rel="noopener noreferrer">&rarrhk;${social.name}</a>`;
        socialsList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching socials:", error));
}

function makeProjects() {
  // Fetch the JSON file with the projects information
  fetch("../assets/data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      const projectsList = document.querySelector(".projects");

      // Populate the projects list
      data.projects.forEach((project) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <h3>${project.name}</h3>
        <a href="${
          project.primary
        }" target="_blank" rel="noopener noreferrer">&rarrhk;Demo</a>
        <a href="${
          project.secondary
        }" target="_blank" rel="noopener noreferrer">&rarrhk;Code</a>
        <p>${project.description}</p>
        <p class="technologies">Technologies: ${project.technologies.join(
          ", "
        )}</p>
      `;
        projectsList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching projects:", error));
}

function makePresentations() {
  // Fetch the JSON file with the projects information
  fetch("../assets/data/presentations.json")
    .then((response) => response.json())
    .then((data) => {
      const presentationsList = document.querySelector(".presentations");

      // Populate the projects list
      data.presentations.forEach((presentation) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <h3>${presentation.name}</h3>
        <a href="${presentation.slides}" target="_blank" rel="noopener noreferrer">&rarrhk;Slides</a>
        <p>${presentation.description}</p>
      `;
        presentationsList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching presentations:", error));
}

makeCopyright();
makeSocials();
makeProjects();
makePresentations();
