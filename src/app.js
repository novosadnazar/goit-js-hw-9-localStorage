const nameInput = document.querySelector("#name");
const surnameInput = document.querySelector("#surname");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
const addBtn = document.querySelector("#addBtn");
const contactList = document.querySelector("#contactList");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function renderContacts() {
  contactList.innerHTML = "";
  contacts.forEach((contact, index) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.classList.add("contact-info");
    info.innerHTML = `
      <strong>${contact.name} ${contact.surname}</strong>
      <span> номер телефону: ${contact.phone}</span>
      <span> email: ${contact.email}</span>
    `;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const editBtn = document.createElement("button");
    editBtn.textContent = "редагувати";
    editBtn.title = "Редагувати";
    editBtn.addEventListener("click", () => editContact(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "видалити";
    deleteBtn.title = "Видалити";
    deleteBtn.addEventListener("click", () => deleteContact(index));

    actions.append(editBtn, deleteBtn);
    li.append(info, actions);
    contactList.appendChild(li);
  });
}

function addContact() {
  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !surname || !phone) {
    alert("Ім’я, прізвище та телефон обов’язкові!");
    return;
  }

  const newContact = { name, surname, phone, email };
  contacts.push(newContact);
  saveContacts();
  clearInputs();
  renderContacts();
}

function editContact(index) {
  const contact = contacts[index];
  const newName = prompt("Нове ім’я:", contact.name);
  const newSurname = prompt("Нове прізвище:", contact.surname);
  const newPhone = prompt("Новий телефон:", contact.phone);
  const newEmail = prompt("Новий email:", contact.email);

  contacts[index] = {
    name: newName || contact.name,
    surname: newSurname || contact.surname,
    phone: newPhone || contact.phone,
    email: newEmail || contact.email,
  };

  saveContacts();
  renderContacts();
}

function deleteContact(index) {
  if (confirm("Видалити цей контакт?")) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
  }
}

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function clearInputs() {
  nameInput.value = "";
  surnameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
}

addBtn.addEventListener("click", addContact);
renderContacts();
