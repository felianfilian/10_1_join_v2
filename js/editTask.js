/**
 * fill the edit task form
 */
function fillTaskEdit(index) {
  let element = todos[index];
  document.getElementById("edit-task-title").value = element.title;
  document.getElementById("edit-task-description").value = element.description;
  selectPrio(element.prio, "edit-");
  document.getElementById("edit-task-date").value = element.date;
}

function editTask() {
  alert(
    document.getElementById("edit-task-title").value +
      "\n" +
      document.getElementById("edit-task-description").value +
      "\n" +
      document.getElementById("edit-task-date").value
  );
}
