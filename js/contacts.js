let newContact = [];
contacts = [];

let actualContactId;

/**
 * initial load of contacts page
 */
async function contactsInit() {
  setTimeout(() => {
    generateContactList();
  }, 200);
}

/**
 * generate lsit with contacts from the server
 */
function generateContactList() {
  document.getElementById("contact-items").innerHTML = "";
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  let firstLetter = "";
  contacts.forEach((contact, index) => {
    if (firstLetter != contact.name[0]) {
      firstLetter = contact.name[0];
      document.getElementById("contact-items").innerHTML += `
      <div class="contact-alphabet">${firstLetter}</div>
      `;
    }
    document.getElementById("contact-items").innerHTML += generateContactItem(
      contact,
      index
    );
  });
}

/**
 * create single contact for the contact list
 * @param initials generated initials
 * @param name
 * @param email
 * @returns html code
 */
function generateContactItem(contact, index) {
  return `
    <div class="contact-item" onclick="showContactDetails(${index})">
      <div class="contact-list-avatar" style="background-color: ${
        contact.color
      }">${generateInitials(contact.name)}</div>
      <div>
        <p>${contact.name}</p>
        <p>${contact.email}</p>
      </div>
    </div>
    `;
}

/**
 * show detail page for a single contact
 * @param  index id in the contacts array
 */
function showContactDetails(index) {
  let contact = contacts[index];
  document.getElementById("contact-details").innerHTML = `
  <div class="contact-details-header">
        <div id="contact-details-avatar" style="background-color: ${
          contact.color
        }">${generateInitials(contact.name)}</div>
        <div class="contact-details-menu">
          <div id="contact-details-name">${contact.name}</div>

          <div class="contact-details-btn-container">
            <span class="contact-details-btn " onclick="toggleOnOff('editContact-overlay'); openEditContact(${index})">
              <img class="btn-icon" src="icons/icon_edit.svg">
              Edit
            </span>
            <span class="contact-details-btn " onclick="deleteContact(${index})">
              <img class="btn-icon" src="icons/icon_bucket.svg">
              Delete
            </span>
          </div>
        </div>
      </div>
      <div>
        <p>Contact Information</p>
        <br>
        <p><b>Email</b></p>
        <p>${contact.email}</p>
        <p><b>Phone</b></p>
        <p>${contact.phone}</p>
      </div>
  `;
}

/**
 * clear all form inputs of the add contact form
 */
function clearContactForm() {
  document.getElementById("contact-name").value = "";
  document.getElementById("contact-email").value = "";
  document.getElementById("contact-phone").value = "";
}

/**
 * create new contact and save it to the server
 */
function addContact() {
  newContact = {
    name: document.getElementById("contact-name").value,
    email: document.getElementById("contact-email").value,
    phone: document.getElementById("contact-phone").value,
    color: generateRandomColor(),
  };
  contacts.push(newContact);
  setItem("contacts", JSON.stringify(contacts));
  toggleOnOff("addContact-overlay");
  showMessage("Contact added");
  generateContactList();
  clearContactForm();
}

/**
 * open the edit contact overlay
 */
function openEditContact(index) {
  actualContactId = index;
  document.getElementById("edit-contact-name").value = contacts[index].name;
  document.getElementById("edit-contact-email").value = contacts[index].email;
  document.getElementById("edit-contact-phone").value = contacts[index].phone;
}

/**
 * edit contact details
 */
function editContact() {
  tempContact = {
    name: document.getElementById("edit-contact-name").value,
    email: document.getElementById("edit-contact-email").value,
    phone: document.getElementById("edit-contact-phone").value,
    color: generateRandomColor(),
  };
  contacts[actualContactId] = tempContact;
  setItem("contacts", JSON.stringify(contacts));
  toggleOnOff("editContact-overlay");
  showMessage("Contact changed");
  generateContactList();
}

/**
 * delete single contact
 * @param index of the contact
 */
function deleteContact(index) {
  contacts.splice(index, 1);
  setItem("contacts", JSON.stringify(contacts));
  showMessage("Contact deleted", "#FF3D00");
  generateContactList();
}
