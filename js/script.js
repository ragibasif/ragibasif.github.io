// Constants
const NAME = "Ragib Asif";
const YEAR = new Date().getFullYear();
const SOCIALS = [
  {
    name: "GitHub",
    url: "https://github.com/ragibasif",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/ragibasif",
  },
  {
    name: "Email",
    url: "mailto:ragib.asif30@myhunter.cuny.edu",
  },
];

const PROJECTS = [
  {
    name: "NYC Motor Vehicle Crash Analysis",
    description:
      "This project is an analysis of NYC vehicle crash data, focusing on the trend of crashes over time. Using Python and powerful data visualization libraries, this project aims to uncover patterns in crash occurrences and identify key insights.",
    link: "https://ragibasif.github.io/NYC-mvc-crashes/",
    technologies: [
      "Python",
      "Pandas",
      "Seaborn",
      "Matplotlib",
      "JavaScript",
      "HTML",
      "CSS",
    ],
  },
  {
    name: "Music Visualizer",
    description:
      "An audio visualizer for a small selection of German songs. This website allows users to play songs with an engaging visualizer. It offers intuitive controls for playing, pausing, and navigating through songs. The design is aesthetically pleasing, easy to navigate, and fully responsive across all devices.",
    link: "https://ragibasif.github.io/music-visualizer/",
    technologies: ["JavaScript", "HTML", "CSS"],
  },
];

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
  item.classList.add("hover-lines");
  return item;
}

function renderMainHeader() {
  const headerContainer = document.getElementById(CONTAINERS.header);
  const mainHeader = document.createElement("h1");
  mainHeader.innerText = NAME;
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
    itemA.classList.add("hover-lines");
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
  // Populate the projects list
  PROJECTS.forEach((project) => {
    const listItem = document.createElement("li");
    const header = document.createElement("h3");
    const link = document.createElement("a");
    const description = document.createElement("p");
    const technologies = document.createElement("p");
    externalLink(link, project.link, project.name);
    header.appendChild(link);
    description.innerText = `${project.description}`;
    technologies.innerText = `${project.technologies.join(", ")}`;
    technologies.style.fontStyle = "Italic";
    listItem.appendChild(header);
    listItem.appendChild(description);
    listItem.appendChild(technologies);

    projectsList.appendChild(listItem);
  });
}

function renderSocials() {
  const socialsContainer = document.getElementById(CONTAINERS.socials);
  const socialsList = document.createElement("ul");
  socialsList.classList.add("nav-links");
  // Populate the socials list
  SOCIALS.forEach((social) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    externalLink(link, social.url, social.name);
    listItem.appendChild(link);
    socialsList.appendChild(listItem);
  });
  socialsContainer.appendChild(socialsList);
}

// Dynamically update the copyright year to be the current year.
function renderCopyright() {
  const copyrightOwner = NAME;
  const currentYear = YEAR;
  const copyrightText = document.createElement("p");
  copyrightText.innerHTML = `&copy; ${currentYear} ${copyrightOwner}. All rights reserved.`;
  const copyrightContainer = document.getElementById(CONTAINERS.copyright);
  copyrightContainer.append(copyrightText);
}

function renderLayout() {
  renderMainHeader();
  renderNav();
  renderProjects();
  renderSocials();
  renderCopyright();
}

renderLayout();
