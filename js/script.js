let users = [
  {
    name: "super mario",
    email: "super@mario.toad",
    password: "1234",
    color: "#32a852",
  },
];
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
let categories = [];

const monthsName = [
  null,
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

// waiting time to show message and change page
let messageDelay = 2200;

let userColor = "";
let userIndex = -1;
let userName = "";

/**
 * main inital load
 */
async function mainInit() {
  mainLoad("main-content", "./templates/summary.html");

  loadServerData();
  setTimeout(() => {
    getUserData();
    updateHeader();
    document.addEventListener("click", closeAvatarMenuOutside);
  }, 200);
}

/**
 * initial load of index html
 */
function indexLoad() {
  loadServerData();
  mainLoad("index-content", "./templates/login.html", 1300);
}

/**
 * get data from the remote storage
 */
async function loadServerData() {
  userIndex = localStorage.getItem("activeID");
  users = JSON.parse(await getItem("users"));
  todos = JSON.parse(await getItem("todos"));
  for (let i = 0; i < todos.length; i++) {
    todos[i].id = i;
  }
  categories = JSON.parse(await getItem("categories"));
}

/**
 * load of inline page content
 * @param target elent of the page
 * @param page url of the content
 * @param time delay time
 */
function mainLoad(target, page, time = 0) {
  setTimeout(() => {
    document.getElementById(target).innerHTML = `
  <div w3-include-html="${page}"></div>
  `;
    includeHTML();
  }, time);
}

/**
 * load a complete page
 * @param page url of the page
 * @param time delay time
 */
function loadFullPage(page, time = 0) {
  setTimeout(() => {
    window.location.href = page;
  }, time);
}

/**
 * get user data from the server
 * setup guest user if needed
 */
function getUserData() {
  if (userIndex == -1 || userIndex == null) {
    userName = "Guest";
    userColor = "#29abe2";
  } else {
    if (users.length > 0) {
      if (users[userIndex].hasOwnProperty("name")) {
        userName = users[userIndex].name;
      } else {
        userName = "Mr Nobody";
      }
      if (users[userIndex].hasOwnProperty("color")) {
        userColor = users[userIndex].color;
      } else {
        userColor = "#22ab5b";
      }
    }
  }
}

/**
 * show actual user in the header
 */
function updateHeader() {
  let initials = generateInitials(userName);
  document.getElementById("avatar-initials").innerHTML = initials;
  document.querySelector(".header-avatar").style.backgroundColor = userColor;
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
 * login logic
 * set user id in local storage
 */
function login() {
  let loginEmail = document.getElementById("login-email").value;
  let loginPassword = document.getElementById("login-password").value;
  if (
    users.find(
      (user) => user.email == loginEmail && user.password == loginPassword
    )
  ) {
    let userId = users.findIndex((user) => user.email == loginEmail);
    showMessage(`Welcome ${users[userId]["name"]}`);
    localStorage.setItem("activeID", userId);
    loadFullPage("./main.html", messageDelay);
  } else {
    showMessage(`User not Found`, "#FF3D00");
  }
}

/**
 * login for guest users
 */
function loginGuest() {
  event.preventDefault();
  showMessage("Logged in as Guest");
  localStorage.setItem("activeID", -1);
  loadFullPage("./main.html", messageDelay);
}

/**
 * Sign Up and save data to remoteStorage
 */
async function signUp() {
  let signupName = document.getElementById("signup-name").value;
  let signupEmail = document.getElementById("signup-email").value;
  let signupPassword = document.getElementById("signup-password").value;
  let signupPasswordConfirm = document.getElementById(
    "signup-password-confirm"
  ).value;

  if (
    users.find((user) => user.name == signupName || user.email == signupEmail)
  ) {
    showMessage("User already exist", "#FF3D00");
  } else {
    if (checkPasswordConfirm(signupPassword, signupPasswordConfirm)) {
      let user = {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        color: generateRandomColor(),
      };
      users.push(user);

      await setItem("users", JSON.stringify(users));
      showMessage("You signed up successfully");
      loadFullPage("../index.html", messageDelay);
    }
  }
}

/**
 * check if entered password is the same
 * @returns true or false
 */
function checkPasswordConfirm(pass01, pass02) {
  if (pass01 != pass02) {
    showMessage("Not the same password", "#FF3D00");
    passwordConfirm = document.getElementById("signup-password-confirm").value =
      "";
    return false;
  }
  return true;
}

/**
 * send email for password reset
 */
function sendPasswordRequest() {
  showMessage("An E-Mail has been send to you");
  loadFullPage("../index.html", messageDelay);
}

/**
 * change the password of the user
 */
function resetPassword(userId) {
  showMessage("You reset your Password");
  loadFullPage("../index.html", messageDelay);
}

/**
 * show message box
 */
function showMessage(message, bgColor = "#2a3647") {
  document.getElementById("message-card").innerHTML = message;
  document.getElementById("message-card").style.backgroundColor = bgColor;
  document.getElementById("message-box").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("message-box").classList.add("d-none");
  }, messageDelay);
}

/**
 * generate random color
 * @returns color code
 */
function generateRandomColor() {
  // Adjust this value to control darkness
  const min = 50;
  // Adjust this value to control lightness
  const max = 200;
  const red = Math.floor(Math.random() * (max - min + 1)) + min;
  const green = Math.floor(Math.random() * (max - min + 1)) + min;
  const blue = Math.floor(Math.random() * (max - min + 1)) + min;
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * show users for debug
 */
function showUserStorage() {
  users.forEach((user) => {
    console.log(user);
  });
}

/**
 * turn the display style on or off
 * @param id id selector of the element
 */
function toggleOnOff(id) {
  let element = document.getElementById(id);
  if (element.classList.contains("d-none")) {
    element.classList.remove("d-none");
  } else {
    element.classList.add("d-none");
  }
}

/**
 * close geader menu on click outside
 * @param  event
 */
function closeAvatarMenuOutside(event) {
  let avatarMenu = document.getElementById("avatar-menu");
  let avatarHeader = document.getElementById("header-avatar");
  if (!avatarHeader.contains(event.target)) {
    avatarMenu.classList.add("d-none");
  }
}

/**
 * reset all dta from the server
 * hidden function
 */
function resetServerData() {
  categories = [
    {
      name: "User Story",
      color: "#0038FF",
    },
    {
      name: "Technical Task",
      color: "#1FD7C1",
    },
  ];
  setItem("users", []);
  setItem("todos", []);
  setItem("contacts", []);
  setItem("categories", categories);
  alert("Data ressetted");
}

///////////////////////////
// SUMMARY

/**
 * update summary data
 */
async function updateSummaryCounter() {
  setTimeout(() => {
    updateSummaryGreeting();

    document.getElementById("task-board-counter").innerHTML = todos.length;
    let todoProgress = todos.filter((t) => t["step"] == "col-02");
    document.getElementById("todo-inprogress-counter").innerHTML =
      todoProgress.length;
    let todoAwait = todos.filter((t) => t["step"] == "col-03");
    document.getElementById("todo-await-counter").innerHTML = todoAwait.length;
    let todoOpen = todos.filter((t) => t["step"] == "col-01");
    document.getElementById("todo-open-counter").innerHTML = todoOpen.length;
    let todoDone = todos.filter((t) => t["step"] == "col-04");
    document.getElementById("todo-done-counter").innerHTML = todoDone.length;

    let todoUrgent = todos.filter((t) => t["prio"][0] == "URGENT");
    document.getElementById("todo-prio-counter").innerHTML = todoUrgent.length;

    //document.getElementById("next-date").innerHTML = getNextDate(todoUrgent);
  }, 200);
}

/**
 * update name for internal pages
 */
async function updateSummaryGreeting() {
  if (localStorage.getItem("activeID") == -1) {
    userName = "Guest";
  } else {
    userName = users[localStorage.getItem("activeID")].name;
  }
  document.getElementById("sum-greet").innerHTML = getGreeting();
  document.getElementById("sum-name").innerHTML = userName;
}

/**
 * get greeting string from actual time
 * @returns greeting time
 */
function getGreeting() {
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  if (currentHour >= 0 && currentHour < 12) {
    return "Good Morning,";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good Afternoon,";
  } else if (currentHour >= 18) {
    return "Good Evening,";
  } else {
    return "Hello,";
  }
}
