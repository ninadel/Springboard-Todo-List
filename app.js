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

  function storeTodoList() {
    localStorage.setItem("storedList", null);
    let todoStorage = [];
    let todoItems = document.querySelectorAll("li");
    console.log("todoItems", todoItems);
    console.log(todoItems.length);

    if (todoItems.length > 0) {
      for (i = 0; i < todoItems.length; i++) {
        let item = todoItems[i];
        let itemText = null;
        itemText = item.innerText.slice(0, item.innerText.length - 1);
        console.log("itemText", itemText);
        console.log("item classlist", item.classList);
        if (item.classList.contains("incomplete")) {
          todoStorage.push([itemText, "incomplete"]);
          console.log("storing incomplete");
        } else if (item.classList.contains("complete")) {
          todoStorage.push([itemText, "complete"]);
          console.log("storing complete");
        }
        localStorage.setItem("storedList", JSON.stringify(todoStorage));
        console.log("localStorage", localStorage);
      }
    }
  }

  function recallTodoList() {
    let storedList = JSON.parse(localStorage.getItem("storedList"));
    let listItemTaskValue = null;
    let listItemState = null;
    if (storedList !== null) {
      console.log("recallTodoList");
      console.log("storedList", storedList);
      for (i = 0; i < storedList.length; i++) {
        listItem = storedList[i];
        listItemTaskValue = listItem[0];
        console.log("listItemTaskValue", listItemTaskValue);
        listItemState = listItem[1];
        addListItem(listItemTaskValue, listItemState, false);
      }
    } else {
      console.log("skipping recall");
    }
    console.log("storing after recall");
    storeTodoList();
  }

  function addListItem(taskValue, state, store) {
    let todoItem = document.createElement("li");
    todoItem.classList.add(state);
    let removeButton = document.createElement("button");

    removeButton.innerText = "X";
    removeButton.style.marginLeft = "10px";
    todoItem.innerText = taskValue;
    todoItem.append(removeButton);
    todoList.append(todoItem);
    todoItem.setAttribute("class", state);
    if (todoItem.classList.contains("complete")) {
      todoItem.style.textDecoration = "line-through";
    }

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
          console.log(
            "classList after completing incomplete",
            e.target.classList
          );
        } else if (todoItem.classList.contains("complete")) {
          e.target.style.textDecoration = "none";
          e.target.classList.add("incomplete");
          e.target.classList.remove("complete");
          console.log("classList after toggling complete", e.target.classList);
        }
      }
      storeTodoList();
    });
    if (store) {
      storeTodoList();
    }
  }

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let taskValue = document.querySelector("#task").value;
    if (taskValue !== "") {
      addListItem(taskValue, "incomplete", true);
    }
  });

  recallTodoList();
});
