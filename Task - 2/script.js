function showSection(id) {
  document.querySelectorAll("section").forEach((s) => (s.style.display = "none"));
  document.getElementById(id).style.display = "flex";
  document.querySelectorAll("nav button").forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name || !email || !message) {
    alert("All fields are required!");
    return;
  }
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address!");
    return;
  }
  alert("Form submitted successfully!");
  this.reset();
});

const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task === "") {
    alert("Enter a task!");
    return;
  }
  const li = document.createElement("li");
  li.innerHTML = `${task} <button class="deleteBtn">X</button>`;
  taskList.appendChild(li);
  taskInput.value = "";
});

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) e.target.parentElement.remove();
});
