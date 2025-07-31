// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Ragib Asif",
  EMAIL: "ragib.asif30@myhunter.cuny.edu",
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "A minimal and lightweight blog and portfolio.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const NOTES: Metadata = {
  TITLE: "Notes",
  DESCRIPTION: "A collection of notes on topics I am studying.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};


export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "My work history.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "GitHub",
    HREF: "https://github.com/ragibasif"
  },
  { 
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/ragibasif",
  },
  { 
    NAME: "YouTube",
    HREF: "https://www.youtube.com/@ragib_asif",
  }
];