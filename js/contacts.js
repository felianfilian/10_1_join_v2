contacts = [
  {
    name: "peter pan",
    email: "peter@pan.test",
    phone: "123456789",
  },
];

async function contactsInit() {
  generateContactList();
}

async function generateContactList() {
  document.getElementById("contact-list").innerHTML += generateContactItem(
    "SM",
    "Super Mario",
    "super@mario.toad"
  );
}

async function generateContactItem(initials, name, email) {
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
