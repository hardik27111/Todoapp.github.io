//Selector
const todoinput = document.querySelector(".todo-input");
const addtodo = document.querySelector(".add-todo");
const todolist = document.querySelector(".todo-list");
const filtertodo = document.querySelector(".todotype");

//Event Listeners
addtodo.addEventListener("click", Todo);
todolist.addEventListener("click", deleteitem);
filtertodo.addEventListener("click", filteroption);

//Functions
function Todo(event) {
  event.preventDefault();
  const Div = document.createElement("div");
  Div.classList.add("todo");

  const newlist = document.createElement("li");
  newlist.innerText = todoinput.value;
  newlist.classList.add("list-item");
  Div.appendChild(newlist);

  storge(todoinput.value);

  const complete = document.createElement("button");
  complete.innerHTML = '<i class="fas fa-check-circle"></i>';
  complete.classList.add("complete-btn");
  Div.appendChild(complete);

  const delet = document.createElement("button");
  delet.innerHTML = '<i class="fas fa-trash"></i>';
  delet.classList.add("delet-btn");
  Div.appendChild(delet);

  todolist.appendChild(Div);
  todoinput.value = "";
}

function deleteitem(e) {
  const item = e.target;

  if (item.classList[0] === "delet-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("fall");
    remove(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filteroption(e) {
  const type = todolist.childNodes;
  type.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function storge(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function remove(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoindex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoindex),1);
  localStorage.setItem("todos", JSON.stringify(todos));

}
