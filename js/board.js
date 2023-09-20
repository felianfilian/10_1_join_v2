let currentDraggedElement;

let colBoardId = {
  "col-1": "Todo",
  "col-2": "In<br>Progress",
  "col-3": "Await<br>Feedback",
  "col-4": "Done",
};
let prioImg = {
  urgent: "./icons/priority_urgent.svg",
  medium: "./icons/priority_medium.svg",
  low: "./icons/priority_low.svg",
};

let btnLeft = "<div></div>";
let btnRight = "";

function boardInit() {
  loadServerData();
  setTimeout(() => {
    updateBoard();
  }, 200);
}

/**
 * update all board elements
 * fill the columns with tasks
 */
function updateBoard() {
  let col = [];
  if (todos.length > 0) {
    for (let i = 1; i <= 4; i++) {
      col[i - 1] = todos.filter((t) => t["step"] == "col-" + i);
      document.getElementById("col-" + i).innerHTML = "";
      if (col[i - 1].length == 0) {
        document.getElementById("col-" + i).innerHTML = generateEmptyTodo();
      }
      col[i - 1].forEach((todo) => {
        const element = todo;
        document.getElementById("col-" + i).innerHTML += generateTodo(
          element,
          i
        );
      });
    }
  }
}

/**
 * generate todo elements
 * @param {*} element todo data from the server
 * @returns html code for the task
 */
function generateTodo(element, col) {
  generateMobileColChnage(element, col);
  return `
  <div draggable='true' ondragstart='startDragging(${element.id})' class='todo'>
  <div class="btns-change-col">
    ${btnLeft}
    ${btnRight}
  </div>
  <div onclick="openEditTaskOverlay(${element.id})">
    <div  class="todo-category-container">
      <div class="todo-category" style="background-color:${
        element.category.color
      }">${element.category.name}
      </div>  
    </div> 
    <div class="todo-title">
      ${firstCharToUpperCase(element.title)}
    </div>
    <div class="todo-content mb-16">
      ${firstCharToUpperCase(element["description"])}
    </div>
    ${generateSubtasks(element)}
    <div class="todo-footer">
      <div class="todo-avatar-container">
        ${generateContacts(element)}
      </div>
      <img src="${prioImg[element.prio]}">
    </div>
  </div>
    `;
}

/**
 * generate column change buttons for mobile
 * @param element  todo element
 * @param col actual column
 */
function generateMobileColChnage(element, col) {
  colChangeId = element.id;
  if (col == 1) {
    btnLeft = "<div></div>";
    btnRight = generateChangeButton(
      "col-2",
      "icons/arrow_right_default.svg",
      "right"
    );
  } else if (col == 2) {
    btnLeft = generateChangeButton(
      "col-1",
      "icons/arrow_left_default.svg",
      "left"
    );
    btnRight = generateChangeButton(
      "col-3",
      "icons/arrow_right_default.svg",
      "right"
    );
  } else if (col == 3) {
    btnLeft = generateChangeButton(
      "col-2",
      "icons/arrow_left_default.svg",
      "left"
    );
    btnRight = generateChangeButton(
      "col-4",
      "icons/arrow_right_default.svg",
      "right"
    );
  } else if (col == 4) {
    btnLeft = generateChangeButton(
      "col-3",
      "icons/arrow_left_default.svg",
      "left"
    );
    btnRight = "<div></div>";
  }
}

function generateChangeButton(col, imgSrc, dir) {
  if (dir == "left") {
    return `
  <div class="btn-col" onclick="mobileMoveTo('${col}', ${colChangeId})">
  <img src=${imgSrc}>  
  ${colBoardId[col]}
  </div>
  `;
  } else {
    return `
  <div class="btn-col" onclick="mobileMoveTo('${col}', ${colChangeId})">
    ${colBoardId[col]}
    <img src=${imgSrc}>
  </div>
  `;
  }
}

/**
 * generate contact list for the board tasks
 * @param {*} element todo data from the server
 * @returns html code with all generated contacs
 */
function generateContacts(element) {
  let contactList = "";
  if (element["assignedcontacts"].length > 0) {
    for (let i = 0; i < element["assignedcontacts"].length; i++) {
      initials = generateInitials(element["assignedcontacts"][i]["name"]);
      contactColor = element["assignedcontacts"][i]["color"];
      contactList += `<div class="todo-avatar" style="background-color: ${contactColor}; left:${
        i * 30
      }px">${initials}</div>`;
      if (i >= 4) {
        break;
      }
    }
    return contactList;
  } else {
    return `<div class="no-avatar" style="background-color: #FF4646;">No Contacts</div>`;
  }
}

/**
 * generate contact list for the board tasks
 * @param {*} element todo data from the server
 * @returns html code with all generated contacs
 */
function generateFullContacts(element) {
  let contactList = "";
  if (element["assignedcontacts"].length > 0) {
    for (let i = 0; i < element["assignedcontacts"].length; i++) {
      initials = generateInitials(element["assignedcontacts"][i]["name"]);
      contactColor = element["assignedcontacts"][i]["color"];
      contactList += `<div class="todo-full-avatar" style="background-color: ${contactColor}; left:${
        i * 30
      }px">${initials}</div>`;
      if (i >= 4) {
        break;
      }
    }
    return contactList;
  } else {
    return `<div class="no-avatar" style="background-color: #FF4646;">No Contacts</div>`;
  }
}

/**
 * generate html code with all the subtask from the element
 * @param {*} element todo data from the server
 * @returns html code with generated subtasks
 */
function generateSubtasks(element) {
  if (element.subtasks.length > 0) {
    let finishedTasks = element["subtasks"].filter((t) => t["status"] == true);
    let progress = (100 / element.subtasks.length) * finishedTasks.length;
    return `<div class="todo-subtasks">
    <div class="status-bar">
      <div class="status-progress" style="width: ${progress}%"></div>
    </div>
    ${finishedTasks.length}/${element.subtasks.length} Subtasks</div>`;
  } else {
    return "";
  }
}

/**
 * generate html code for empty columns
 * @returns empty task element
 */
function generateEmptyTodo() {
  return `
  <div class='emptyTodo'>
  <p>No Todos</p>
  </div>
    `;
}

/**
 * drag an drop logic
 * @param id id of the dragged element
 */
function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * change column and category for the dragged element
 * @param {*} category new category for the element
 */
function moveTo(category) {
  todos[currentDraggedElement]["step"] = category;
  updateBoard();
  saveBoard();
}

/**
 * change column and category for the dragged element
 * @param category new category for the element
 * @param element actual element
 */
function mobileMoveTo(category, element) {
  todos[element]["step"] = category;
  updateBoard();
  saveBoard();
}

/**
 * add or remove highlight while dragging
 * @param id id of the dragged element
 */
function highlight(id) {
  document.getElementById(id).classList.add("col-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("col-highlight");
}

/**
 * save actual data to the server
 */
async function saveBoard() {
  await setItem("todos", JSON.stringify(todos));
}

// make the first character of a string (element) uppercase
function firstCharToUpperCase(element) {
  return element.charAt(0).toUpperCase() + element.slice(1);
}

/**
 * search logic for the kanban
 */
function searchTasks() {
  let col = [];
  let substring = document.getElementById("board-search").value.toLowerCase();

  for (let i = 1; i <= 4; i++) {
    console.log(todos["title"]);
    col[i - 1] = todos.filter(
      (t) =>
        t["step"] == "col-" + i &&
        (t["title"].toLowerCase().includes(substring) ||
          t["description"].toLowerCase().includes(substring))
    );
    console.log(col[i - 1]);
    document.getElementById("col-" + i).innerHTML = "";
    if (col[i - 1].length == 0) {
      document.getElementById("col-" + i).innerHTML = generateEmptyTodo();
    }
    col[i - 1].forEach((todo) => {
      document.getElementById("col-" + i).innerHTML += generateTodo(todo);
    });
  }
}

/**
 * edit task overlay
 * @param index of the edited task
 */
function openEditTaskOverlay(index) {
  element = todos[index];
  toggleOnOff("show-task-overlay");
  document.getElementById("board-edit-task-content").innerHTML = `
  <div class="todo-category-container">
    <div class="todo-category" style="background-color:${
      element.category.color
    }">${element.category.name}
    </div>  
  </div> 
  <div class="todo-title">
    ${firstCharToUpperCase(element.title)}
  </div>
  <div class="todo-content">
    ${firstCharToUpperCase(element["description"])}
  </div>
  <div class="d-flex">
    <p>Due date: </p>
    <p>${element.date}</p>
  </div>  
  <div class="d-flex">
    <p>Priority: </p>
    <p>${element.prio}</p>
    <img src="${prioImg[element.prio]}">
  </div>  
  <p>Assigned to:</p>
  <div class="d-flex gap-8">
      ${generateFullContacts(element)}
  </div>
  <p>Subtasks:</p>
  <div class="d-flex gap-8">
    <div id="check-subtask-container">    
    ${setTimeout(() => {
      renderCheckSubtasks(element);
    }, 200)}  
  </div>
  

  <div class="d-flex pos-br">
    <span class="contact-details-btn " onclick="toggleOn('edit-task');toggleOff('show-task'); fillTaskEdit(${index});">
      <img class="btn-icon" src="icons/icon_edit.svg">
      Edit
    </span>
    <span class="contact-details-btn " onclick="deleteTodo(${index})">
      <img class="btn-icon" src="icons/icon_bucket.svg">
      Delete
    </span>
  </div>
    `;
}

/**
 * delete todo from the server
 * @param index of the todo
 */
function deleteTodo(index) {
  todos.splice(index, 1);
  setItem("todos", JSON.stringify(todos));
  toggleOnOff("show-task-overlay");
  updateBoard();
  showMessage("Task deleted", "#FF3D00");
}

/**
 * render subtask that can be checked
 */
function renderCheckSubtasks(element) {
  document.getElementById("check-subtask-container").innerHTML = "";
  let subtasks = element.subtasks;
  subtasks.forEach((subtask, index) => {
    document.getElementById("check-subtask-container").innerHTML += `
    <div class="add-subtask-item c-pointer" onclick="checkSubtask(${index})">
      <img id="subtask-cb${index}" class="button-icon mr-16" src="${showCheckbox(
      index
    )}" alt="X" >  
      <div>
        ${subtask.title}
      </div>
    </div>
    `;
  });
}

/**
 * set a subtask to checked or unchecked
 * @param index
 */
function checkSubtask(index) {
  if (element.subtasks[index].status == false) {
    element.subtasks[index].status = true;
  } else {
    element.subtasks[index].status = false;
  }
  setItem("todos", JSON.stringify(todos));
  renderCheckSubtasks(element);
  updateBoard();
}

/**
 * show unchecked or checked box
 * @param index of subtask
 */
function showCheckbox(index) {
  if (element.subtasks[index].status == false) {
    return "./icons/icon_box.svg";
  } else {
    return "./icons/icon_box_checked.svg";
  }
}

/**
 * fill the edit task form
 */
function fillTaskEdit(index) {
  let element = todos[index];
  document.getElementById("edit-task-title").value = element.title;
  // document.getElementById("edit-task-description").text = element.description;
  selectPrio(element.prio, "edit-");
  //document.getElementById("edit-task-date").value = element.date;
}
