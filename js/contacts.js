let newContact = [];
contacts = [];

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
  console.log(contacts);
  contacts.forEach((contact, index) => {
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
            <span class="contact-details-btn " onclick="alert('edit')">
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

function addContact() {
  newContact = {
    name: document.getElementById("contact-name").value,
    email: document.getElementById("contact-email").value,
    phone: document.getElementById("contact-phone").value,
    color: generateRandomColor(),
  };
  contacts.push(newContact);
  setItem("contacts", JSON.stringify(contacts));
  showMessage("Contact added");
  toggleOnOff("addContact-overlay");
  generateContactList();
}

function deleteContact(index) {
  contacts.splice(index, 1);
  setItem("contacts", JSON.stringify(contacts));
  showMessage("Contact deleted", "#FF3D00");
  generateContactList();
}
