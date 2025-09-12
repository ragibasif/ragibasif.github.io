import type { Site, Nav, Socials, Projects, Work } from "@/types/types";

export const SITE: Site = {
    NAME: "Ragib Asif",
    DESCRIPTION: "Personal blog and portfolio of Ragib Asif.",
    HREF: "https://ragibasif.github.io/",
    AUTHOR: "Ragib Asif",
    LOCALE: "en-US",
    FEATURED_POSTS_COUNT: 3,
    POSTS_PER_PAGE: 4,
};

export const NAV: Nav[] = [
    {
        NAME: "Home",
        HREF: "/",
    },
    {
        NAME: "Blog",
        HREF: "/blog",
    },
]

export const SOCIALS: Socials[] = [
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
    },
    {
        NAME: "Email",
        HREF: "mailto:ragibasif@tuta.io",
    },
    {
        NAME: 'RSS',
        HREF: '/rss.xml',
    },
]


export const PROJECTS: Projects[] = [
    {
        NAME: "Watchdog",
        DESCRIPTION: "Dynamic memory debugger for C.",
        REPO: "https://github.com/ragibasif/watchdog",
        DEMO: "https://github.com/ragibasif/watchdog",
    },

]

export const WORK: Work[] = [
    {
        TITLE: "WIP",
        COMPANY: "WIP",
        LOCATION: "WIP",
        START: "WIP",
        END: "WIP",
        DESCRIPTION: "WIP",
    },
]
