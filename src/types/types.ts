export type Site = {
  NAME: string;
  DESCRIPTION: string;
  HREF: string;
  AUTHOR: string;
  LOCALE: string;
  FEATURED_POSTS_COUNT: number;
  POSTS_PER_PAGE: number;
};

export type Nav = {
  NAME: string;
  HREF: string;
};

export type Socials = {
  NAME: string;
  HREF: string;
};

export type Projects = {
  NAME: string;
  DESCRIPTION: string;
  REPO: string;
  DEMO: string;
};

export type Work = {
  TITLE: string;
  COMPANY: string;
  LOCATION: string;
  START: string;
  END: string;
  DESCRIPTION: string;
};