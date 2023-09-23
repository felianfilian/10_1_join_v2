let changedTask = {
  step: "col-1",
  title: "",
  description: "",
  assignedcontacts: [],
  date: "",
  prio: "",
  category: "",
  subtasks: [],
};

let selectedPrio = "";
let todoId = 0;

/**
 * fill the edit task form
 */
function fillTaskEdit(index) {
  todoId = index;
  let element = todos[index];
  changedTask.step = element.step;
  document.getElementById("edit-task-title").value = element.title;
  document.getElementById("edit-task-description").value = element.description;
  editGenerateContactAdd();
  selectPrio(element.prio, "edit-");
  document.getElementById("edit-task-date").value = element.date;
  editGenerateCategoryAdd();
  setCategory(index);
  changedTask.subtasks = element.subtasks;
  editRenderSubtasks(changedTask.subtasks);
}

/**
 * generate contact list for dropdown
 */
function editGenerateContactAdd() {
  document.getElementById("edit-contact-options").innerHTML = "";
  contacts.forEach((contact, index) => {
    document.getElementById("edit-contact-options").innerHTML += `
    <div id="edit-contact-opt-${index}" class="contact-choice" onclick="editAddContactToTask(${index})">
      <div class="contact-avatar" style="background-color: ${contact.color}">
      ${generateInitials(contact.name)}</div>
      <div style="flex-grow: 1;">${contact.name}</div>
      <img id="edit-contact-cb-${index}" class="btn-icon" src="./icons/icon_box.svg" alt="">
    </div>
    `;
  });
  document.getElementById("edit-contact-options").innerHTML += `
    <button type="button" class="button-black" onclick="toggleOnOff('edit-addContact-overlay');">
        Add Contact
        <img
        class="btn-icon-img"
        src="./icons/icon_person_white.svg"
      ></img>
    </button>
    `;
}

/**
 * create new contact at addTask and save it to the server
 */
function editTaskAddContact() {
  newContact = {
    name: document.getElementById("edit-contact-name").value,
    email: document.getElementById("edit-contact-email").value,
    phone: document.getElementById("edit-contact-phone").value,
    color: generateRandomColor(),
  };
  contacts.push(newContact);
  setItem("contacts", JSON.stringify(contacts));
  toggleOnOff("edit-addContact-overlay");
  showMessage("Contact added");
  editGenerateContactAdd();
}

/**
 * select contact in the addTask list
 * @param index index inside the contacts array
 */
function editAddContactToTask(index) {
  let contactOpt = document.getElementById("edit-contact-opt-" + index);
  let contactCB = document.getElementById("edit-contact-cb-" + index);
  if (contactOpt.classList.contains("contact-choice-selected")) {
    contactOpt.classList.remove("contact-choice-selected");
    contactCB.src = "./icons/icon_box.svg";
    changedTask.assignedcontacts.splice(index, 1);
  } else {
    contactOpt.classList.add("contact-choice-selected");
    contactCB.src = "./icons/icon_box_checked_white.svg";
    changedTask.assignedcontacts.push(contacts[index]);
  }
  editGenerateChosenContacts();
  toggleOff("edit-contact-options");
}

/**
 * generate a list of the chosen contacts
 */
function editGenerateChosenContacts() {
  document.getElementById("edit-addTask-chosen-contacts").innerHTML = "";
  changedTask.assignedcontacts.forEach((contact) => {
    document.getElementById("edit-addTask-chosen-contacts").innerHTML += `
    <div class="contact-avatar" style="background-color: ${
      contact.color
    }">${generateInitials(contact.name)}</div>
    `;
  });
}

/**
 * show loaded category
 * @param index
 */
function setCategory(index) {
  document.getElementById("edit-category-dd-text").innerHTML =
    todos[index].category.name;
  document.getElementById("edit-category-dd-text").style.color = "#fff";
  document.getElementById("edit-category-dd").style.backgroundColor =
    todos[index].category.color;
  changedTask.category = todos[index].category;
}

/**
 * generate category list for dropdown
 */
function editGenerateCategoryAdd() {
  document.getElementById("edit-category-options").innerHTML = "";
  categories.forEach((category, index) => {
    document.getElementById("edit-category-options").innerHTML += `
    <div id="edit-category-opt-${index}" class="contact-choice" onclick="editSelectCategory(${index})">
      <div class="category-color" style="background-color: ${category.color};">
      </div>
      <div style="flex-grow: 1;">${category.name}</div>
    </div>
    `;
  });
}

/***
 * dropdown ctaegory selection
 */
function editSelectCategory(index) {
  document.getElementById("edit-category-dd-text").innerHTML =
    categories[index].name;
  document.getElementById("edit-category-dd-text").style.color = "#fff";
  document.getElementById("edit-category-dd").style.backgroundColor =
    categories[index].color;
  changedTask.category = categories[index];
  toggleOnOff("edit-category-options");
}

/**
 * reset dropdown title on close
 */
function resetCategoryDropdown() {
  document.getElementById("category-dd-text").innerHTML = "Select Category";
  document.getElementById("category-dd-text").style.color = "#000";
  document.getElementById("category-dd").style.backgroundColor = "#fff";
}

/**
 * add new subtask
 */
function editAddSubtask() {
  let subtaskTitle = document.getElementById("edit-task-add-subtask");
  if (subtaskTitle.value == "") {
    showMessage("Type a subtask title please!", "#FF3D00");
  } else {
    changedTask.subtasks.push({
      title: subtaskTitle.value,
      status: false,
    });
  }
  editRenderSubtasks(changedTask.subtasks);
  subtaskTitle.value = "";
}

/**
 * render all added subtask
 */
function editRenderSubtasks(element) {
  document.getElementById("edit-add-subtask-list").innerHTML = "";
  element.forEach((subtask, index) => {
    document.getElementById("edit-add-subtask-list").innerHTML += `
    <div class="add-subtask-item" style="justify-content: space-between;">
      <div>
        ${subtask.title}  
      </div>
      <img class="button-icon" type="button" src="./icons/icon_bucket.svg" alt="X" onclick="editDeleteAddedSubtask(${index});">
    </div>
    `;
  });
}

/**
 * delete subtask
 * it is not actually saved to the server
 * @param index subtask index
 */
function editDeleteAddedSubtask(index) {
  changedTask.subtasks.splice(index, 1);
  editRenderSubtasks(changedTask.subtasks);
}

/**
 * save edited task to server
 */
async function editTask() {
  changedTask.title = document.getElementById("edit-task-title").value;
  changedTask.description = document.getElementById(
    "edit-task-description"
  ).value;
  changedTask.date = document.getElementById("edit-task-date").value;
  changedTask.prio = selectedPrio;

  todos[todoId] = changedTask;
  await setItem("todos", JSON.stringify(todos));
  showMessage("Task added");
  boardInit();
  mainLoad("main-content", "./templates/board.html");
}
