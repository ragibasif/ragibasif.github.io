const NAME = "Ragib Asif";
const YEAR = new Date().getFullYear();
const CONTAINERS = {
  title: "title-container",
  header: "header-container",
  nav: "navigation-container",
  projects: "projects-container",
  footer: "footer-container",
};

function renderLayout() {
  renderTitle(NAME);
  renderHeader(NAME);
  renderNav();
  renderProjects();
  renderFooter();
}

function renderTitle(title) {
  const titleContainer = document.getElementById(CONTAINERS.title);
  titleContainer.innerText = title;
}

function renderHeader(name) {
  const headerContainer = document.getElementById(CONTAINERS.header);
  const mainHeader = document.createElement("h1");
  mainHeader.innerText = name;
  headerContainer.appendChild(mainHeader);
}

function renderNav() {
  const pageLinks = [
    {
      title: "Home",
      id: CONTAINERS.header,
    },
    {
      title: "Projects",
      id: CONTAINERS.projects,
    },
    {
      title: "Contact",
      id: CONTAINERS.footer,
    },
  ];
  const navigationContainer = document.getElementById(CONTAINERS.nav);
  const allLinksList = document.createElement("ul");
  pageLinks.forEach((link) => {
    const itemLi = document.createElement("li");
    const itemA = document.createElement("a");
    itemA.href = `#${link.id}`;
    itemA.innerText = `${link.title}`;
    itemLi.appendChild(itemA);
    allLinksList.appendChild(itemLi);
  });
  navigationContainer.appendChild(allLinksList);
}

function renderProjects() {
  // create header and list container
  const projectsContainer = document.getElementById(CONTAINERS.projects);
  const projectsHeader = document.createElement("h2");
  projectsHeader.innerText = "Projects";
  const projectsList = document.createElement("ul");
  projectsList.classList.add("projects");
  projectsContainer.appendChild(projectsHeader);
  projectsContainer.appendChild(projectsList);
  // Fetch the JSON file with the projects information
  fetch("../assets/data/projects.json")
    .then((response) => response.json())
    .then((data) => {
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

// Dynamically update the copyright year to be the current year.
function renderCopyright(name, year) {
  const copyrightOwner = name;
  const currentYear = year;
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

function renderFooter() {
  const footerContainer = document.getElementById(CONTAINERS.footer);
  const socials = document.createElement("ul");
  socials.classList.add("socials");
  const copyright = document.createElement("div");
  copyright.id = "copyright";
  footerContainer.appendChild(socials);
  footerContainer.appendChild(copyright);

  renderSocials();
  renderCopyright(NAME, YEAR);
}

renderLayout();
