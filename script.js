let todo = [];
const key = "SIMPLE_TODO_LIST";
const input = document.getElementById("input-feild");
const activityContainer = document.querySelector(".list-activity");

function removeData(todoId) {
  const tempTodo = [];

  for (let i = 0; i < todo.length; i++) {
    if (i != todoId) {
      tempTodo.push(todo[i]);
    }
  }
  todo = tempTodo;

  useStorage("SET");
  getData();
}

function getData() {
  activityContainer.innerHTML = "";
  todo.forEach(function (el, i) {
    activityContainer.innerHTML += `
      <div class="activity">
      <p>${i + 1}. ${el}</p>
      <button class="del-btn" todoId="${i}">X</button>
    </div>`;
  });

  const buttons = activityContainer.querySelectorAll(".del-btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      const todoId = e.target.getAttribute("todoId");
      removeData(todoId);
    });
  });
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

document.getElementById("save-btn").addEventListener("click", function () {
  todo.push(input.value);

  useStorage("SET");
  getData();
});

useStorage("GET");
