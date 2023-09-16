let task = {
  step: "col-1",
  title: "",
  description: "",
  assignedcontacts: [],
  date: "",
  prio: "",
  category: [],
  subtasks: [{ title: "update page" }],
};

let contacts = [];

selectedPrio = "";
colId = 1;

/**
 * initial load of add task
 */
async function addTaskInit() {
  contacts = JSON.parse(await getItem("contacts"));
  contacts.push(
    {
      name: "Sailor Moon",
      email: "sailor@moon.test",
      color: "#26bd46",
    },
    {
      name: "Super Mario",
      email: "super@mario.test",
      color: "#FF3D00",
    }
  );
  categories = JSON.parse(await getItem("categories"));
  setTimeout(() => {
    generateContactAdd();
    generateCategoryAdd();
  }, 200);
}

/**
 * generate contact list for dropdown
 */
function generateContactAdd() {
  document.getElementById("contact-options").innerHTML = "";
  contacts.forEach((contact, index) => {
    document.getElementById("contact-options").innerHTML += `
    <div id="contact-opt-${index}" class="contact-choice" onclick="addContactToTask(${index})">
      <div class="contact-avatar" style="background-color: ${contact.color}">
      ${generateInitials(contact.name)}</div>
      <div style="flex-grow: 1;">${contact.name}</div>
      <img id="contact-cb-${index}" class="btn-icon" src="./icons/icon_box.svg" alt="">
    </div>
    `;
  });
  document.getElementById("contact-options").innerHTML += `
    <button type="button" class="button-black" onclick="alert('add contact')">
        Add Contact
        <img
        class="btn-icon"
        src="./icons/icon_person_white.svg"
      ></img>
    </button>
    `;
}

/**
 * select contact in the addTask list
 * @param index index inside the contacts array
 */
function addContactToTask(index) {
  let contactOpt = document.getElementById("contact-opt-" + index);
  let contactCB = document.getElementById("contact-cb-" + index);
  if (contactOpt.classList.contains("contact-choice-selected")) {
    contactOpt.classList.remove("contact-choice-selected");
    contactCB.src = "./icons/icon_box.svg";
    task.assignedcontacts.splice(index, 1);
  } else {
    contactOpt.classList.add("contact-choice-selected");
    contactCB.src = "./icons/icon_box_checked_white.svg";
    task.assignedcontacts.push(contacts[index]);
  }
  generateChosenContacts();
}

/**
 * generate a list of the chosen contacts
 */
function generateChosenContacts() {
  document.getElementById("addTask-chosen-contacts").innerHTML = "";
  task.assignedcontacts.forEach((contact) => {
    document.getElementById("addTask-chosen-contacts").innerHTML += `
    <div class="contact-avatar" style="background-color: ${
      contact.color
    }">${generateInitials(contact.name)}</div>
    `;
  });
}

/**
 * generate category list for dropdown
 */
function generateCategoryAdd() {
  document.getElementById("category-options").innerHTML = "";
  categories.forEach((category, index) => {
    document.getElementById("category-options").innerHTML += `
    <div id="category-opt-${index}" class="contact-choice" onclick="selectCategory(${index})">
      <div class="category-color" style="background-color: ${category.color};">
      </div>
      <div style="flex-grow: 1;">${category.name}</div>
    </div>
    `;
  });
  document.getElementById("category-options").innerHTML += `
    <button type="button" class="button-black" onclick="alert('add category')">
        Add New Category
        <img
        class="btn-icon"
        src="./icons/icon_person_white.svg"
      ></img>
    </button>
    `;
}

function selectCategory(index) {
  document.getElementById("category-dd-text").innerHTML =
    categories[index].name;
  document.getElementById("category-dd-text").style.color = "#fff";
  document.getElementById("category-dd").style.backgroundColor =
    categories[index].color;
  task.category = categories[index];
  toggleOnOff("category-options");
}

/**
 * clear all form elements
 */
function clearForm() {
  getElements();
  task.title.value = "";
  task.description.value = "";

  task.assignedcontacts = [];
  generateContactAdd();
  generateCosenContacts();
  document.getElementById("contact-options").classList.add("d-none");

  task.date.value = "";
  resetPrioColors();
  selectedPrio = "";
  task.prio = "";
  task.category = [];
  task.subtasks = [];
  showMessage("Form cleared !");
}

/**
 * get all form elements
 */
function getElements() {
  task.title = document.getElementById("task-title");
  task.description = document.getElementById("task-description");
  task.date = document.getElementById("task-date");
  task.prio = selectedPrio;
  task.category = document.getElementById("task-category");
}

function addTaskValidation() {
  if (task.prio == "") {
    showMessage("Set Prio please", "#FF3D00");
    return false;
  } else {
    return true;
  }
}

function setColID(id) {
  colId = id;
}

/**
 * add a task to a specific column
 * @param colId id of the board column
 */
function addTask() {
  getElements();
  if (addTaskValidation()) {
    alert(
      "title: " +
        task.title.value +
        "\n" +
        "description: " +
        task.description.value +
        "\n" +
        "assigned to: " +
        task.assignedcontacts +
        "\n" +
        "date: " +
        task.date.value +
        "\n" +
        "prio: " +
        task.prio +
        "\n" +
        "category: " +
        task.category.value +
        "\n" +
        "subtasks: " +
        task.subtasks
    );
  }
}

function selectPrio(prioId) {
  selectedPrio = prioId;
  resetPrioColors();
  if (prioId == "urgent") {
    document.getElementById("prio01").style.backgroundColor = "#FF3D00";
    document.getElementById("prio01").style.color = "#fff";
  } else if (prioId == "medium") {
    document.getElementById("prio02").style.backgroundColor = "#FFA800";
    document.getElementById("prio02").style.color = "#fff";
  } else if (prioId == "low") {
    document.getElementById("prio03").style.backgroundColor = "#7AE229";
    document.getElementById("prio03").style.color = "#fff";
  }
}

function resetPrioColors() {
  document.getElementById("prio01").style.color = "#000";
  document.getElementById("prio02").style.color = "#000";
  document.getElementById("prio03").style.color = "#000";
  document.getElementById("prio01").style.backgroundColor = "#fff";
  document.getElementById("prio02").style.backgroundColor = "#fff";
  document.getElementById("prio03").style.backgroundColor = "#fff";
}
