// JS Todos Exercise
// Part 1
// For this assignment you will be combining your knowledge of DOM access and events to build a todo app!

// As a user, you should be able to:

// Add a new todo (by submitting a form)
// Mark a todo as completed (cross out the text of the todo)
// Remove a todo
// Part 2
// Now that you have a functioning todo app, save your todos in localStorage! Make sure that when the page refreshes, the todos on the page remain there.

document.addEventListener("DOMContentLoaded", function () {
  let todoForm = this.querySelector("#newTodoForm");
  let todoList = this.querySelector("#todoList");
  // let todoStorage = [];
  // // console.log("hoooo");

  function recallTodoList() {
    console.log("recallTodoList");
  }

  function storeTodoList() {
    let todoStorage = [];
    todoItems = document.querySelectorAll("li");
    console.log(todoItems);
    console.log(todoItems.length);

    for (i = 0; i < todoItems.length; i++) {
      let item = todoItems[i];
      let itemText = null;
      itemText = item.innerText.toString().slice(0, item.innerText.length - 1);
      console.log(itemText);
      if (item.classList.contains("incomplete")) {
        // console.log(itemText);
        todoStorage.push([itemText, "incomplete"]);
      } else if (item.classList.contains("complete")) {
        todoStorage.push([itemText, "complete"]);
      }
      localStorage.setItem("storedList", JSON.stringify(todoStorage));
    }

    // return todoStorage;
  }

  function recallTodoList() {
    let storedList = JSON.parse(localStorage.getItem("storedList"));
    let listItemState = null;
    console.log("recallTodoList");
    console.log("storedList", storedList);
    for (i = 0; i < storedList.length; i++) {
      listItem = storedList[i];
      listItemTaskValue = listItem[0];
      console.log("listItemTaskValue", listItemTaskValue);
      listItemState = listItem[1];
      addListItem(listItemTaskValue, listItemState);
    }
  }

  function addListItem(taskValue, state) {
    let todoItem = document.createElement("li");
    todoItem.classList.add(state);
    let removeButton = document.createElement("button");

    removeButton.innerText = "X";
    removeButton.style.marginLeft = "10px";
    todoItem.innerText = taskValue;
    todoItem.append(removeButton);
    todoList.append(todoItem);
    storeTodoList();

    todoForm.reset();

    todoItem.addEventListener("click", function (e) {
      let targetTag = e.target.tagName;
      console.log(targetTag);
      if (targetTag === "BUTTON") {
        e.target.parentNode.remove();
      } else if (targetTag === "LI") {
        if (e.target.classList.contains("incomplete")) {
          e.target.style.textDecoration = "line-through";
          e.target.classList.add("complete");
          e.target.classList.remove("incomplete");
          // console.log(e.target.classList);
        } else if (todoItem.classList.contains("complete")) {
          e.target.style.textDecoration = "none";
          e.target.classList.add("incomplete");
          e.target.classList.remove("complete");
          // console.log(e.target.classList);
        }
      }
    });
  }

  recallTodoList();

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let taskValue = document.querySelector("#task").value;

    addListItem(taskValue, "incomplete");
  });
});
