// **********************************************************************
//  nav behavior starts here
// **********************************************************************
const nav = document.querySelector("nav");
const burger = document.querySelector(".burger");

function navToggler() {
  nav.classList.toggle("nav-active");
}

burger.addEventListener("click", () => {
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
