let task = {
  title: "",
  description: "",
  taskAssigned: [],
  date: "",
  prio: "",
  category: "",
  subtasks: [],
};

assignedContacts = [];
selectedPrio = "urgent";

/**
 * clear all form elements
 */
function clearForm() {
  getElements();
  task.title.value = "";
  task.description.value = "";
  task.date.value = "";
  task.category.value = "";
  task.subtasks.value = [];
  resetPrioColors();
  task.prio = "";
  showMessage("Form cleared");
}

/**
 * get all form elements
 */
function getElements() {
  task.title = document.getElementById("task-title");
  task.description = document.getElementById("task-description");
  task.taskAssigned = assignedContacts;
  task.date = document.getElementById("task-date");
  task.prio = selectedPrio;
  task.category = document.getElementById("task-category");
  task.subtasks = document.getElementById("task-subtasks");
}

function addTaskValidation() {
  alert("validate inputs");
}

/**
 * add a task to a specific column
 * @param colId id of the board column
 */
function addTask(colId) {
  addTaskValidation();
  alert(colId);
}

function selectPrio(prioId) {
  task.prio = prioId;
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
