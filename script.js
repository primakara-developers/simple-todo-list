let todo = [];
const key = "SIMPLE_TODO_LIST";
const input = document.getElementById("input-feild");
const activityContainer = document.querySelector(".list-activity");

function getData() {
  activityContainer.innerHTML = "";
  todo.forEach(function (data, i) {
    activityContainer.innerHTML += `
      <div class="activity">
      <p>${i + 1}. ${data.todo}</p>
      <button class="del-btn" onclick="removeData(${data.id})">X</button>
    </div>`;
  });
}

function removeData(todoId) {
  const tempTodo = [];

  for (let i = 0; i < todo.length; i++) {
    if (todo[i].id != todoId) {
      tempTodo.push(todo[i]);
    }
  }
  todo = tempTodo;

  useStorage("SET");
  getData();
}

function useStorage(mode) {
  if (typeof localStorage !== undefined) {
    switch (mode) {
      case "SET":
        localStorage.setItem(key, JSON.stringify(todo));
        break;
      case "GET":
        if (localStorage.getItem(key) !== null) {
          todo = JSON.parse(localStorage.getItem(key));
        }
        getData();
        break;
    }
  }
}

function addData() {
  todo.push({ id: Date.now(), todo: input.value });
  useStorage("SET");
  getData();
}

useStorage("GET");
