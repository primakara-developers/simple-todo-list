const key = "SIMPLE_TODO_LIST";
const input = document.getElementById("input-feild");
const activityContainer = document.querySelector(".list-activity");

function accesStorage(action, todoData = null) {
  if (action === "GET") {
    return JSON.parse(localStorage.getItem(key));
  } else if (action === "SET" && todoData !== null) {
    localStorage.setItem(key, JSON.stringify(todoData));
  }
}

function getData() {
  activityContainer.innerHTML = "";

  const todo = accesStorage("GET");

  todo.forEach(function (data, i) {
    activityContainer.innerHTML += `
    <div class="activity">
      <p>${i + 1}. ${data.todo}</p>
      <div class="container-btn">
          <button class="del-btn" onclick="removeData(${data.id})">X</button>
          <button class="edit-btn" onclick="editData(${data.id})">Edit</button>
      </div>
    </div>`;
  });
}

function editData(todoId) {
  const displayPopup = document.querySelector(".popup-display");
  const okBtn = document.getElementById("ok-btn");
  const editInput = document.getElementById("edit-input");
  const todo = accesStorage("GET");

  displayPopup.style.display = "block";

  okBtn.addEventListener("click", function () {
    todo.forEach(function (data) {
      if (data.id === todoId) {
        data.todo = editInput.value;
      }
    });

    accesStorage("SET", todo);
    displayPopup.style.display = "none";
    getData();
  });
}

function addData() {
  const todo = accesStorage("GET");
  todo.push({ id: Date.now(), todo: input.value });
  accesStorage("SET", todo);
  getData();
}

function removeData(todoId) {
  const tempTodo = [];
  const todo = accesStorage("GET");

  todo.forEach((data) => {
    if (data.id != todoId) {
      tempTodo.push(data);
    }
  });

  accesStorage("SET", tempTodo);
  getData();
}

if (accesStorage("GET") === null) {
  accesStorage("SET", []);
}

getData();
