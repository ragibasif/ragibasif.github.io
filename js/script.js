// Dynamically update the copyright year to be the current year.
const copyrightOwner = "Ragib Asif";
const currentYear = new Date().getFullYear();
const copyrightText = document.getElementById("copyright");
copyrightText.innerHTML = `&copy; ${currentYear} ${copyrightOwner}. All rights reserved.`;

// Fetch the JSON file containing the socials information and links
fetch("../assets/data/socials.json")
  .then((response) => response.json())
  .then((data) => {
    const socialsList = document.getElementById("socials");

    // Populate the socials list
    data.socials.forEach((social) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      <a href="${social.url}" target="_blank" rel="noopener noreferrer">&rarrhk;${social.name}</a>`;
      socialsList.appendChild(listItem);
    });
  })
  .catch((error) => console.error("Error fetching socials:", error));
