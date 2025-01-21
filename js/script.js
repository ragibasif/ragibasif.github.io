const NAME = "Ragib Asif";
const YEAR = new Date().getFullYear();
const SOCIALS = "../assets/data/socials.json";
const PROJECTS = "../assets/data/projects.json";
const CONTAINERS = {
  title: "title-container",
  header: "header-container",
  nav: "navigation-container",
  projects: "projects-container",
  copyright: "copyright-container",
  socials: "socials-container",
  footer: "footer-container",
};

function externalLink(item, url, text) {
  item.href = url;
  item.target = "_blank";
  item.rel = "noopener noreferrer";
  item.innerText = text;
  return item;
}

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
  const navLinks = [
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
  allLinksList.classList.add("nav-links");
  navLinks.forEach((link) => {
    const listItem = document.createElement("li");
    const itemA = document.createElement("a");
    itemA.href = `#${link.id}`;
    itemA.innerText = `${link.title}`;
    listItem.appendChild(itemA);
    allLinksList.appendChild(listItem);
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
  fetch(PROJECTS)
    .then((response) => response.json())
    .then((data) => {
      // Populate the projects list
      data.projects.forEach((project) => {
        const listItem = document.createElement("li");
        const header = document.createElement("h3");
        const primary = document.createElement("a");
        const secondary = document.createElement("a");
        const description = document.createElement("p");
        const technologies = document.createElement("p");
        header.innerText = `${project.name}`;
        externalLink(primary, project.primary, "Demo");
        externalLink(secondary, project.secondary, "Code");
        description.innerText = `${project.description}`;
        technologies.innerText = `Technologies: ${project.technologies.join(
          ", "
        )}`;
        listItem.appendChild(header);
        listItem.appendChild(primary);
        listItem.appendChild(secondary);
        listItem.appendChild(description);
        listItem.appendChild(technologies);

        projectsList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching projects:", error));
}

function renderSocials() {
  const socialsContainer = document.getElementById(CONTAINERS.socials);
  const socialsList = document.createElement("ul");
  socialsList.classList.add("nav-links");
  // Fetch the JSON file containing the socials information and links
  fetch(SOCIALS)
    .then((response) => response.json())
    .then((data) => {
      // Populate the socials list
      data.socials.forEach((social) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        externalLink(link, social.url, social.name);
        listItem.appendChild(link);
        socialsList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching socials:", error));
  socialsContainer.appendChild(socialsList);
}

// Dynamically update the copyright year to be the current year.
function renderCopyright(name, year) {
  const copyrightOwner = name;
  const currentYear = year;
  const copyrightText = document.createElement("p");
  copyrightText.innerHTML = `&copy; ${currentYear} ${copyrightOwner}. All rights reserved.`;
  const copyrightContainer = document.getElementById(CONTAINERS.copyright);
  copyrightContainer.append(copyrightText);
}

function renderFooter() {
  renderSocials();
  renderCopyright(NAME, YEAR);
}

renderLayout();
