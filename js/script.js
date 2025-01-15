// Dynamically update the copyright year to be the current year.
function makeCopyright() {
  const copyrightOwner = "Ragib Asif";
  const currentYear = new Date().getFullYear();
  const copyrightText = document.getElementById("copyright");
  copyrightText.innerHTML = `&copy; ${currentYear} ${copyrightOwner}. All rights reserved.`;
}

function makeSocials() {
  // Fetch the JSON file containing the socials information and links
  fetch("../assets/data/socials.json")
    .then((response) => response.json())
    .then((data) => {
      const socialsList = document.querySelector(".socials");

      // Populate the socials list
      data.socials.forEach((social) => {
        const listItem = document.createElement("p");
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
          project.demo
        }" target="_blank" rel="noopener noreferrer">&rarrhk;Demo</a>
        <a href="${
          project.code
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

makeCopyright();
makeSocials();
makeProjects();
