contacts = [
  {
    name: "peter pan",
    email: "peter@pan.test",
    phone: "123456789",
  },
];

async function contactsInit() {
  try {
    let contacts = await getItem("contacts");
    contacts = JSON.parse(newTodos);
  } catch {
    console.log("no data found on server");
  }
  generateContactList();
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
