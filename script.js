const key = "SIMPLE_TODO_LIST";
const input = document.getElementById("input-feild");
const activityContainer = document.querySelector(".list-activity");

// function to acces local storage
function accesStorage(action, todoData = null) {
  if (action === "GET") {
    return JSON.parse(localStorage.getItem(key));
  } else if (action === "SET" && todoData !== null) {
    localStorage.setItem(key, JSON.stringify(todoData));
  }
}

//  function for read opration
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

//function to run a custom prompt while running an update operation
function editData(todoId) {
  const modal = document.querySelector(".prompt-display");
  const okBtn = document.getElementById("ok-btn");
  const inputModal = document.getElementById("input-modal");
  const massage = document.querySelector(".prompt-container span");
  const closeIcon = document.querySelector(".close-icon");

  // first capture the value from local storage to manipulate
  const todo = accesStorage("GET");

  // pop up custom prompt
  modal.style.display = "flex";

  // reset the contents of the input field and span message
  inputModal.value = "";
  massage.innerHTML = "";

  // if the close icon is clicked then remove the custom prompt
  closeIcon.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // if the ok button is clicked then do the update operation
  okBtn.addEventListener("click", function () {
    massage.innerHTML = "";

    // check if the input field is empty
    if (inputModal.value === "") {
      // then show message
      massage.innerHTML = "You're not input anything!";
    } else {
      // search activity by Id, then replace the activity with the entered activity
      todo.forEach((data) => {
        if (data.id === todoId) {
          data.todo = inputModal.value;
        }
      });

      // local storage content update
      accesStorage("SET", todo);
      getData();

      // get rid of the custom prompt again
      modal.style.display = "none";
    }
  });
}

// function for create opration
function addData() {
  const todo = accesStorage("GET");
  todo.push({ id: Date.now(), todo: input.value });
  accesStorage("SET", todo);
  getData();
  input.value = "";
}

// function for delete opration
function removeData(todoId) {
  const confirm = document.querySelector(".confirm-display");
  const yesBtn = document.querySelector(".yes-btn");
  const noBtn = document.querySelector(".no-btn");

  // show custom confirm
  confirm.style.display = "flex";

  // if yes button onclick, then do delete opration
  yesBtn.addEventListener("click", function () {
    const tempTodo = [];
    const todo = accesStorage("GET");

    todo.forEach((data) => {
      if (data.id != todoId) {
        tempTodo.push(data);
      }
    });

    accesStorage("SET", tempTodo);
    getData();

    confirm.style.display = "none";
  });

  // if no button onclick, then close custom confirm without do delete opration
  noBtn.addEventListener("click", function () {
    confirm.style.display = "none";
  });
}

// for the first time check the local storage null or not
// if null, then fill the local storage with empty array
if (accesStorage("GET") === null) {
  accesStorage("SET", []);
}

// if local storage not empty, then get the data
getData();
