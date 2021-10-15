let todo = [];
const key = "SIMPLE_TODO_LIST";
const input = document.getElementById("input-feild");
const activityContainer = document.querySelector(".list-activity");

function removeData(value) {
  const tempTodo = [];
  todo.forEach(function (el) {
    if (el !== value) {
      tempTodo.push(el);
    }
  });
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
      <button onclick="removeData('${el}')">X</button>
    </div>`;
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

if (todo !== null) {
  useStorage("GET");
}
