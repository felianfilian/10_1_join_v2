let eeditContacts = [];

let editCategory = "";
let editSubtasks = [];

/**
 * fill the edit task form
 */
function fillTaskEdit(index) {
  let element = todos[index];
  document.getElementById("edit-task-title").value = element.title;
  document.getElementById("edit-task-description").value = element.description;
  selectPrio(element.prio, "edit-");
  document.getElementById("edit-task-date").value = element.date;
  editSubtasks = element.subtasks;
  editRenderSubtasks(editSubtasks);
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
      document.getElementById("edit-task-date").value +
      "\n" +
      selectedPrio +
      "\n" +
      editSubtasks
  );
}
