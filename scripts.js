// Dark Mode
document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");

  darkModeToggle.addEventListener("click", () => {
    const body = document.body;
    body.classList.toggle("dark-mode");
  });

  // Sticky Navbar
  const navbar = document.getElementsByClassName("navbar");

  if (navbar) {
    const sticky = navbar.offsetTop;

    function stickyNavbar() {
      if (window.scrollY >= sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
  }
  window.onscroll = function () {
    stickyNavbar();
  };
});
