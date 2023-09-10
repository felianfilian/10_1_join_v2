/**
 * initial load of index html
 */
function indexLoad() {
  setTimeout(() => {
    loadHTML("index-content", "./templates/login.html");
  }, 1300);
}

/**
 * load of main content
 */
function mainLoad(page) {
  document.getElementById("main-content").innerHTML = `
  <div w3-include-html="${page}"></div>
  `;
  includeHTML();
}

/**
 * show and hide the header menu
 */
function toggleAvatarMenu() {
  if (document.getElementById("avatar-menu").classList.contains("d-none")) {
    document.getElementById("avatar-menu").classList.remove("d-none");
  } else {
    document.getElementById("avatar-menu").classList.add("d-none");
  }
}

/**
 * Loading HTML Pages
 */
function loadHTML(divElement, htmlPath) {
  const targetElement = document.getElementById(divElement);
  // Fetch the content from another HTML file.
  fetch(htmlPath)
    .then((response) => response.text())
    .then((html) => {
      // Insert the fetched HTML content into the target element.
      targetElement.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error fetching content:", error);
      targetElement.innerHTML = "Page not available";
    });
}
