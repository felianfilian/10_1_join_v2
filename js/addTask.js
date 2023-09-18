/**
 * step = col-1 to col-4
 * assignedcontacts = name, email, phone, color
 * date = yyyy-mm-dd
 * category = name, color
 * subtasks = title, status
 */
let task = {
  step: "col-1",
  title: "",
  description: "",
  assignedcontacts: [],
  date: "",
  prio: "",
  category: "",
  subtasks: [],
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
        class="btn-icon-img"
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
  // OPTIONAL category add
  //   document.getElementById("category-options").innerHTML += `
  //     <button type="button" class="button-black" onclick="alert('add category')">
  //         Add New Category
  //         <img
  //         class="btn-icon-img"
  //         src="./icons/icon_person_white.svg"
  //       ></img>
  //     </button>
  //     `;
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

function resetCategoryDropdown() {
  document.getElementById("category-dd-text").innerHTML = "Select Category";
  document.getElementById("category-dd-text").style.color = "#000";
  document.getElementById("category-dd").style.backgroundColor = "#fff";
}

/**
 * add new subtask
 */
function addSubtask() {
  let subtaskTitle = document.getElementById("task-add-subtask");
  if (subtaskTitle.value == "") {
    showMessage("Type a subtask title please!", "#FF3D00");
  } else {
    task.subtasks.push({
      title: subtaskTitle.value,
      status: false,
    });
  }
  renderSubtasks();
  subtaskTitle.value = "";
}

/**
 * render all added subtask
 */
function renderSubtasks() {
  document.getElementById("add-subtask-list").innerHTML = "";
  task.subtasks.forEach((subtask, index) => {
    document.getElementById("add-subtask-list").innerHTML += `
    <div class="add-subtask-item">
      <div>
        ${subtask.title} - ${subtask.status}
      </div>
      <img class="button-icon" src="./icons/icon_bucket.svg" alt="X" onclick="deleteAddedSubtask(${index})">
    </div>
    `;
  });
}

function deleteAddedSubtask(index) {
  task.subtasks.splice(index, 1);
  renderSubtasks();
}

/**
 * clear all form elements
 */
function clearForm(info = true) {
  getElements();
  task.title.value = "";
  task.description.value = "";

  task.assignedcontacts = [];
  generateContactAdd();
  generateChosenContacts();
  document.getElementById("contact-options").classList.add("d-none");

  task.date.value = "";
  resetPrioColors();
  selectedPrio = "";
  task.prio = "";

  task.category = "";
  generateCategoryAdd();
  resetCategoryDropdown();

  task.subtasks = [];
  renderSubtasks();
  if (info) {
    showMessage("Form cleared !");
  }
}

/**
 * get all form elements
 */
function getElements() {
  task.title = document.getElementById("task-title");
  task.description = document.getElementById("task-description");
  task.date = document.getElementById("task-date");
  task.prio = selectedPrio;
}

/**
 * extra form validation
 * @returns true or false
 */
function addTaskValidation() {
  if (task.prio == "") {
    showMessage("Set Prio please", "#FF3D00");
    return false;
  } else {
    return true;
  }
}

/**
 * set column where the task should be added
 * @param id column id
 */
function setColID(id) {
  colId = id;
}

/**
 * add a task to a specific column
 * @param colId id of the board column
 */
async function addTask() {
  getElements();
  if (addTaskValidation()) {
    // alert(
    //   "title: " +
    //     task.title.value +
    //     "\n" +
    //     "description: " +
    //     task.description.value +
    //     "\n" +
    //     "assigned to: " +
    //     task.assignedcontacts +
    //     "\n" +
    //     "date: " +
    //     task.date.value +
    //     "\n" +
    //     "prio: " +
    //     task.prio +
    //     "\n" +
    //     "category: " +
    //     task.category +
    //     "\n" +
    //     "subtasks: " +
    //     task.subtasks
    // );
    task.title = document.getElementById("task-title").value;
    task.description = document.getElementById("task-description").value;
    task.date = document.getElementById("task-date").value;
    todos.push(task);
    await setItem("todos", JSON.stringify(todos));
    clearForm(false);
    showMessage("Task added");
  }
}

/**
 * show selected prio and save to local task
 * @param prioId name of the prio
 */
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

/**
 * reset colors of the prio buttons
 */
function resetPrioColors() {
  document.getElementById("prio01").style.color = "#000";
  document.getElementById("prio02").style.color = "#000";
  document.getElementById("prio03").style.color = "#000";
  document.getElementById("prio01").style.backgroundColor = "#fff";
  document.getElementById("prio02").style.backgroundColor = "#fff";
  document.getElementById("prio03").style.backgroundColor = "#fff";
}
