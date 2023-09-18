let newContact = [];
contacts = [
  {
    name: "peter pan",
    email: "peter@pan.test",
    phone: "123456789",
  },
];

async function contactsInit() {
  setTimeout(() => {
    generateContactList();
  }, 200);
}

/**
 * generate lsit with contacts from the server
 */
function generateContactList() {
  document.getElementById("contact-list").innerHTML += generateContactItem(
    "SM",
    "Super Mario",
    "super@mario.toad"
  );
}

/**
 * create single contact for the contact list
 * @param initials generated initials
 * @param name
 * @param email
 * @returns html code
 */
function generateContactItem(initials, name, email) {
  return `
    <div class="contact-item">
      <div class="contact-avatar">${initials}</div>
      <div>
        <div>${name}</div>
        <div>${email}</div>
      </div>
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
  //setItem("contacts", JSON.stringify(newContact))
}
