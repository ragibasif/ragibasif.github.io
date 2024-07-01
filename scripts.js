// **********************************************************************
//  nav behavior starts here
// **********************************************************************
const nav = document.querySelector("nav");
const burger = document.querySelector(".burger");
const navHome = document.getElementById("nav-home");
const navProjects = document.getElementById("nav-projects");
const navAbout = document.getElementById("nav-about");
const navContact = document.getElementById("nav-contact");

function navToggler() {
  nav.classList.toggle("nav-active");
}

burger.addEventListener("click", () => {
  navToggler();
});

navHome.addEventListener("click", () => {
  navToggler();
});

navProjects.addEventListener("click", () => {
  navToggler();
});
navAbout.addEventListener("click", () => {
  navToggler();
});
navContact.addEventListener("click", () => {
  navToggler();
});

// **********************************************************************
//  nav behavior stops here
// **********************************************************************

// **********************************************************************
//  footer dynamic copyright year getter below
// **********************************************************************

const currentYear = new Date().getFullYear();
document.getElementById("copyright-year").textContent = currentYear;

// **********************************************************************
//  footer dynamic copyright year getter above
// **********************************************************************

// **********************************************************************
//  home page hover effects start
// **********************************************************************

// effect for my name
// magic star
let index = 0,
  interval = 1000;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const animate = (star) => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
};

for (const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);

    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3));
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let freq = null;

document.getElementById("hacked").onmouseover = (event) => {
  let iteration = 0;

  clearInterval(freq);

  freq = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(freq);
    }

    iteration += 1 / 3;
  }, 30);
};

// links hover effects

const enhance = (id) => {
  const element = document.getElementById(id),
    text = element.innerText.split("");

  element.innerText = "";

  text.forEach((value, index) => {
    const outer = document.createElement("span");

    outer.className = "outer";

    const inner = document.createElement("span");

    inner.className = "inner";

    inner.style.animationDelay = `${rand(-5000, 0)}ms`;

    const letter = document.createElement("span");

    letter.className = "letter";

    letter.innerText = value;

    letter.style.animationDelay = `${index * 1000}ms`;

    inner.appendChild(letter);

    outer.appendChild(inner);

    element.appendChild(outer);
  });
};

enhance("github-link");
enhance("linkedin-link");
enhance("email-link");

// **********************************************************************
//  home page hover effects end
// **********************************************************************

// **********************************************************************
//  cursor star and glow trail effect starts here
// **********************************************************************

// effect only works on the home/first page

let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition,
};

const config = {
  glowDuration: 100,
  maximumGlowPointSpacing: 5,
};

const withUnit = (value, unit) => `${value}${unit}`,
  px = (value) => withUnit(value, "px"),
  ms = (value) => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
    diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
};

const calcElapsedTime = (start, end) => end - start;

const appendElement = (element) => document.body.appendChild(element),
  removeElement = (element, delay) =>
    setTimeout(() => document.body.removeChild(element), delay);

const createGlowPoint = (position) => {
  const glow = document.createElement("div");

  glow.className = "glow-point";

  glow.style.left = px(position.x);
  glow.style.top = px(position.y);

  appendElement(glow);

  removeElement(glow, config.glowDuration);
};

const determinePointQuantity = (distance) =>
  Math.max(Math.floor(distance / config.maximumGlowPointSpacing), 1);

const createGlow = (last, current) => {
  const distance = calcDistance(last, current),
    quantity = determinePointQuantity(distance);

  const dx = (current.x - last.x) / quantity,
    dy = (current.y - last.y) / quantity;

  Array.from(Array(quantity)).forEach((_, index) => {
    const x = last.x + dx * index,
      y = last.y + dy * index;

    createGlowPoint({ x, y });
  });
};

const updateLastMousePosition = (position) => (last.mousePosition = position);

const adjustLastMousePosition = (position) => {
  if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

const handleOnMove = (e) => {
  const mousePosition = { x: e.clientX, y: e.clientY };

  adjustLastMousePosition(mousePosition);

  createGlow(last.mousePosition, mousePosition);

  updateLastMousePosition(mousePosition);
};

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);

// **********************************************************************
//  cursor star and glow trail effect ends here
// **********************************************************************
