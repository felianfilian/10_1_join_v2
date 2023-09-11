let users = [];
let todos = [
  {
    assignedContact: ["Jessica J. Rooker"],
    category: "User Stories",
    categoryColor: "#7046D0",
    contactColor: ["hsl(288, 99%, 42%)"],
    date: "2023-09-22",
    description: "recreate CSS Design Kochwelt",
    id: 0,
    prio: ["LOW", "./icons/priority_low.svg"],
    step: "col-01",
    subtasks: [{}],
    title: "CSS Design",
  },
];

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
function mainLoad(target, page) {
  document.getElementById(target).innerHTML = `
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

/**
 * generate 2 characters from the first character of the first and last name
 * @param name full name as string
 * @returns 2 characters as initial string
 */
function generateInitials(name) {
  let initials = name.split(" ");
  if (initials.length == 1) {
    return initials[0][0].toUpperCase() + initials[0][1].toUpperCase();
  } else if (initials.length == 2) {
    return initials[0][0].toUpperCase() + initials[1][0].toUpperCase();
  } else if (initials.length >= 3) {
    return (
      initials[0][0].toUpperCase() +
      initials[initials.length - 1][0].toUpperCase()
    );
  } else {
    return "__";
  }
}

/**
 * Sign Up
 */
function singUp() {
  let signupName = document.getElementById("signup-name").value;
  let signupEmail = document.getElementById("signup-email").value;
  let signupPassword = document.getElementById("signup-password").value;
}

/**
 * show message box
 */
function showMessage(message) {
  document.getElementById("message-card").innerHTML = message;
  document.getElementById("message-box").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("message-box").classList.add("d-none");
  }, 2000);
}
