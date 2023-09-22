let editContacts = [];
let editCategory = "";
let editSubtasks = [];

/**
 * fill the edit task form
 */
function fillTaskEdit(index) {
  let element = todos[index];
  document.getElementById("edit-task-title").value = element.title;
  document.getElementById("edit-task-description").value = element.description;
  editGenerateContactAdd();
  selectPrio(element.prio, "edit-");
  document.getElementById("edit-task-date").value = element.date;
  editGenerateCategoryAdd();
  editSubtasks = element.subtasks;
  editRenderSubtasks(editSubtasks);
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
    editContacts.splice(index, 1);
  } else {
    contactOpt.classList.add("contact-choice-selected");
    contactCB.src = "./icons/icon_box_checked_white.svg";
    editContacts.push(contacts[index]);
  }
  editGenerateChosenContacts();
  toggleOff("edit-contact-options");
}

/**
 * generate a list of the chosen contacts
 */
function editGenerateChosenContacts() {
  document.getElementById("edit-addTask-chosen-contacts").innerHTML = "";
  editContacts.forEach((contact) => {
    document.getElementById("edit-addTask-chosen-contacts").innerHTML += `
    <div class="contact-avatar" style="background-color: ${
      contact.color
    }">${generateInitials(contact.name)}</div>
    `;
  });
}

/**
 * generate category list for dropdown
 */
function editGenerateCategoryAdd() {
  document.getElementById("edit-category-options").innerHTML = "";
  categories.forEach((category, index) => {
    document.getElementById("edit-category-options").innerHTML += `
    <div id="edit-category-opt-${index}" class="contact-choice" onclick="selectCategory(${index})">
      <div class="category-color" style="background-color: ${category.color};">
      </div>
      <div style="flex-grow: 1;">${category.name}</div>
    </div>
    `;
  });
}

/**
 * add new subtask
 */
function editAddSubtask() {
  let subtaskTitle = document.getElementById("edit-task-add-subtask");
  if (subtaskTitle.value == "") {
    showMessage("Type a subtask title please!", "#FF3D00");
  } else {
    task.subtasks.push({
      title: subtaskTitle.value,
      status: false,
    });
  }
  editRenderSubtasks(editSubtasks);
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
  editSubtasks.splice(index, 1);
  console.log(editSubtasks);
  editRenderSubtasks(editSubtasks);
}

/**
 * save edited task to server
 */
function editTask() {
  alert(
    document.getElementById("edit-task-title").value +
      "\n" +
      document.getElementById("edit-task-description").value +
      "\n" +
      editContacts +
      "\n" +
      document.getElementById("edit-task-date").value +
      "\n" +
      selectedPrio +
      "\n" +
      editSubtasks
  );
}
