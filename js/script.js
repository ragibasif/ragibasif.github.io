// Dynamically update the copyright year to be the current year.
function renderCopyright() {
  const copyrightOwner = "Ragib Asif";
  const currentYear = new Date().getFullYear();
  const copyrightContainer = document.getElementById("copyright");
  const copyrightText = document.createElement("p");
  copyrightText.innerHTML = `&copy; ${currentYear} ${copyrightOwner}. All rights reserved.`;
  copyrightContainer.append(copyrightText);
}

function renderSocials() {
  // Fetch the JSON file containing the socials information and links
  fetch("../assets/data/socials.json")
    .then((response) => response.json())
    .then((data) => {
      const socialsList = document.querySelector(".socials");

      // Populate the socials list
      data.socials.forEach((social) => {
        const list = document.createElement("li");
        const link = document.createElement("a");
        link.href = `${social.url}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerHTML = `${social.name}`;
        list.appendChild(link);
        socialsList.appendChild(list);
      });
    })
    .catch((error) => console.error("Error fetching socials:", error));
}

function renderProjects() {
  // Fetch the JSON file with the projects information
  fetch("../assets/data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      const projectsList = document.querySelector(".projects");

      // Populate the projects list
      data.projects.forEach((project) => {
        const list = document.createElement("li");
        const header = document.createElement("h3");
        const demo = document.createElement("a");
        const code = document.createElement("a");
        const description = document.createElement("p");
        const technologies = document.createElement("p");
        header.innerText = `${project.name}`;
        demo.href = `${project.primary}`;
        demo.target = "_blank";
        demo.rel = "noopener norefferrer";
        demo.innerText = "Demo";
        code.href = `${project.secondary}`;
        code.target = "_blank";
        code.rel = "noopener norefferrer";
        code.innerText = "Code";
        description.innerText = `${project.description}`;
        technologies.innerText = `Technologies: ${project.technologies.join(
          ", "
        )}`;
        list.appendChild(header);
        list.appendChild(demo);
        list.appendChild(code);
        list.appendChild(description);
        list.appendChild(technologies);

        projectsList.appendChild(list);
      });
    })
    .catch((error) => console.error("Error fetching projects:", error));
}

renderCopyright();
renderSocials();
renderProjects();
