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

function generateContactList() {
  document.getElementById("contact-list").innerHTML += generateContactItem(
    "SM",
    "Super Mario",
    "super@mario.toad"
  );
}

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
