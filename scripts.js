const body = document.body;
const nav = document.querySelector("nav");
const burger = document.querySelector(".burger");
const linkedin = document.getElementById("linkedin");
const github = document.getElementById("github");
const mail = document.getElementById("mail");

function navToggler() {
  nav.classList.toggle("nav-active");
}

burger.addEventListener("click", () => {
  navToggler();
});

// retrieve json with projects

fetch("./projects.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("cards");
    data.forEach((item) => {
      // Create a card element
      const card = document.createElement("div");
      card.classList.add("card");

      // Create a title element
      const title = document.createElement("h2");
      title.classList.add("card-title");
      title.textContent = item.title;

      // Create a website element
      const website = document.createElement("a");
      website.classList.add("card-website");
      website.href = item.website;
      website.target = "_blank";
      website.textContent = "Website";
      // Create a code element
      const code = document.createElement("a");
      code.classList.add("card-code");
      code.href = item.code;
      code.target = "_blank";
      code.textContent = "Code";
      // Create a image element
      const image = document.createElement("img");
      image.classList.add("card-image");
      image.src = item.image;
      // Create a tools element
      const tools = document.createElement("p");
      tools.classList.add("card-tools");
      tools.textContent = item.tools;

      // Append title and description to the card
      card.appendChild(title);
      card.appendChild(image);
      card.appendChild(website);
      card.appendChild(code);
      card.appendChild(tools);

      // Append the card to the container
      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching the JSON data:", error));

linkedin.addEventListener("mouseenter", () => {
  linkedin.classList.add("rotate");
});
linkedin.addEventListener("mouseleave", () => {
  linkedin.classList.remove("rotate");
});
github.addEventListener("mouseenter", () => {
  github.classList.add("rotate");
});
github.addEventListener("mouseleave", () => {
  github.classList.remove("rotate");
});
mail.addEventListener("mouseenter", () => {
  mail.classList.add("rotate");
});
mail.addEventListener("mouseleave", () => {
  mail.classList.remove("rotate");
});

const currentYear = new Date().getFullYear();
document.getElementById("copyright-year").textContent = currentYear;

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

//  home page hover effect

// const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

// cursor follower

// Select the circle element
const circleElement = document.querySelector(".circle");

// Create objects to track mouse position and custom cursor position
const mouse = { x: 0, y: 0 }; // Track current mouse position
const previousMouse = { x: 0, y: 0 }; // Store the previous mouse position
const circle = { x: 0, y: 0 }; // Track the circle position

// Initialize variables to track scaling and rotation
let currentScale = 0; // Track current scale value
let currentAngle = 0; // Track current angle value

// Update mouse position on the 'mousemove' event
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
const speed = 0.17;

// Start animation
const tick = () => {
  // MOVE
  // Calculate circle movement based on mouse position and smoothing
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;
  // Create a transformation string for cursor translation
  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  // SQUEEZE
  // 1. Calculate the change in mouse position (deltaMouse)
  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
  // Update previous mouse position for the next frame
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;
  // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
  const mouseVelocity = Math.min(
    Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
    150
  );
  // 3. Convert mouse velocity to a value in the range [0, 0.5]
  const scaleValue = (mouseVelocity / 150) * 0.5;
  // 4. Smoothly update the current scale
  currentScale += (scaleValue - currentScale) * speed;
  // 5. Create a transformation string for scaling
  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  // ROTATE
  // 1. Calculate the angle using the atan2 function
  const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
  // 2. Check for a threshold to reduce shakiness at low mouse velocity
  if (mouseVelocity > 20) {
    currentAngle = angle;
  }
  // 3. Create a transformation string for rotation
  const rotateTransform = `rotate(${currentAngle}deg)`;

  // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
  circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

  // Request the next frame to continue the animation
  window.requestAnimationFrame(tick);
};

// Start the animation loop
tick();
