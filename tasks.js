function PageIndex(page) {
  localStorage.setItem("pageindex", page);
}
document.addEventListener("DOMContentLoaded", function () {
  var link0 = document.getElementById("home");
  // onClick's logic below:
  link0.addEventListener("click", function () {
    PageIndex("-1");
  });
});
function checkies() {
  (checkboxes = document.querySelectorAll("input[type=checkbox]")),
    (checkboxArray = Array.from(checkboxes));
  checkboxArray.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      for (var i = 1; i <= localStorage.getItem("listLength"); i++) {
        task_id = "todo_" + i.toString();
        validate(task_id);
      }
    });
  });
}

const submitForm = document.querySelector(".add");
const addButton = document.querySelector(".add-todo");
const todoList = document.querySelector(".todos");
const list = document.querySelectorAll(".todos li");
flag = 0;
if (parseInt(localStorage.getItem("listLength")) >= 1) {
  for (i = 1; i <= localStorage.getItem("listLength"); i++) {
    task_id = "todo_" + i.toString();
    const html = `<li id="${i}">
                  <input type="checkbox" id="todo_${i}">
                  <label id="Todo_${i}" for="todo_${i}">
                 <span class="check"></span>
                    ${localStorage.getItem("todo" + i.toString())}
                  </label>
                  <i class="bi bi-trash delete" ></i>
                </li>`;
    todoList.innerHTML += html;
    flag = 1;
  }
  for (i = 1; i <= localStorage.getItem("listLength"); i++) {
    task_id = "todo_" + i.toString();
    remcheck(task_id);
  }
}

if ((flag = 0)) {
  localStorage.setItem("listLength", list.length);
}

const generateTemplate = (todo) => {
  for (i = 1; i < localStorage.getItem("listLength"); i++) {
    task_id = "todo_" + i.toString();
    validate(task_id);
  }
  localStorage.setItem(
    "todo" + localStorage.getItem("listLength").toString(),
    todo
  );
  const html = `<li id="${localStorage.getItem("listLength")}">
                  <input type="checkbox" id="todo_${localStorage.getItem(
                    "listLength"
                  )}">
                  <label id="Todo_${localStorage.getItem(
                    "listLength"
                  )}" for="todo_${localStorage.getItem("listLength")}">
                    <span class="check"></span>
                    ${todo}
                  </label>
                  <i class="bi bi-trash delete" ></i>
                </li>`;
  todoList.innerHTML += html;
  for (i = 1; i < localStorage.getItem("listLength"); i++) {
    task_id = "todo_" + i.toString();
    remcheck(task_id);
  }
};

function addTodos(e) {
  e.preventDefault();
  const todo = submitForm.add.value.trim();
  if (todo.length) {
    if (localStorage.getItem("listLength") == null) {
      localStorage.setItem("listLength", 1);
      generateTemplate(todo);
    } else if (localStorage.getItem("listLength") < 10) {
      localStorage.setItem(
        "listLength",
        parseInt(localStorage.getItem("listLength")) + 1
      );
      generateTemplate(todo);
    }
    if (localStorage.getItem("listLength") == 10) {
      texttask.disabled = true;
    }
    submitForm.reset();
    checkies();
  }
}

submitForm.addEventListener("submit", addTodos);
addButton.addEventListener("click", addTodos);

function deleteTodos(e) {
  submitForm.reset();
  if (e.target.classList.contains("delete")) {
    elementid = e.target.parentElement.id;
    localStorage.setItem("todo_" + elementid.toString(), 0);
    e.target.parentElement.remove();
    for (
      i = parseInt(elementid) + 1;
      i <= localStorage.getItem("listLength");
      i++
    ) {
      document.getElementById(i.toString()).id = (i - 1).toString();
      document
        .getElementById("Todo_" + i.toString())
        .setAttribute("for", "todo_" + (i - 1).toString());
      document.getElementById("Todo_" + i.toString()).id =
        "Todo_" + (i - 1).toString();
      document.getElementById("todo_" + i.toString()).id =
        "todo_" + (i - 1).toString();
      localStorage.setItem(
        "todo" + (i - 1).toString(),
        localStorage.getItem("todo" + i.toString())
      );
      localStorage.setItem(
        "todo_" + (i - 1).toString(),
        localStorage.getItem("todo_" + i.toString())
      );
    }
    localStorage.removeItem(
      "todo" + localStorage.getItem("listLength").toString()
    );
    localStorage.setItem(
      "listLength",
      parseInt(localStorage.getItem("listLength")) - 1
    );
  }
  texttask.disabled = false;
  checkies();
}

todoList.addEventListener("click", deleteTodos);
//to check if a task was checked
function validate(elementid) {
  if (document.getElementById(elementid).checked) {
    localStorage.setItem(elementid, 1);
  } else {
    localStorage.setItem(elementid, 0);
  }
}
//to remember which tasks were checked
function remcheck(elementid) {
  if (localStorage.getItem(elementid) == 1) {
    document.getElementById(elementid).checked = true;
  }
}
delete_all = document.getElementById("reset");
delete_all.addEventListener("click", function () {
  for (i = 1; i <= localStorage.getItem("listLength"); i++) {
    localStorage.removeItem("todo_" + i.toString());
    localStorage.removeItem("todo" + i.toString());
  }
  localStorage.setItem("listLength", 0);
  todoList.innerHTML = "";
  texttask.disabled = false;
});