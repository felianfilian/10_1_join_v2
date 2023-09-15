let task = {
  title: "",
  description: "",
  assignedcontacts: [{ name: "peter" }],
  date: "",
  prio: "",
  category: "",
  subtasks: [{ title: "update page" }],
};

let contacts = [];

selectedPrio = "";
colId = 1;

async function addTaskInit() {
  contacts = JSON.parse(await getItem("contacts"));
  setTimeout(() => {
    generateContactAdd();
  }, 200);
}

function generateContactAdd() {
  document.getElementById("contact-options").innerHTML += `
  <div class="contact-choice">
    <div class="contact-avatar">HP</div>
    <div>Harry Potter</div>
    <img class="btn-icon" src="./icons/icon_box.svg" alt="">
  </div>
  `;
}

/**
 * clear all form elements
 */
function clearForm() {
  getElements();
  task.title.value = "";
  task.description.value = "";
  task.assignedContacts = [];
  task.date.value = "";
  resetPrioColors();
  selectedPrio = "";
  task.prio = "";
  task.category.value = "";
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
