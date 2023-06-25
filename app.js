// JS Todos Exercise
// Part 1
// For this assignment you will be combining your knowledge of DOM access and events to build a todo app!

// As a user, you should be able to:

// Add a new todo (by submitting a form)
// Mark a todo as completed (cross out the text of the todo)
// Remove a todo
// Part 2
// Now that you have a functioning todo app, save your todos in localStorage! Make sure that when the page refreshes, the todos on the page remain there.

// when the page is loaded, do the following
document.addEventListener("DOMContentLoaded", function () {
  let todoForm = this.querySelector("#newTodoForm");
  let todoList = this.querySelector("#todoList");

  // a function that stores the current state of the to do list
  function storeTodoList() {
    localStorage.setItem("storedList", null);
    let todoStorage = [];
    let todoItems = document.querySelectorAll("li");

    // if there is a list on the page, its length will be greater than 0
    // if there is no list, this will be skipped
    if (todoItems.length > 0) {
      for (i = 0; i < todoItems.length; i++) {
        let item = todoItems[i];
        let itemText = null;
        // when pulling the itemText, the X from the remove button is included so this is removed using slice
        itemText = item.innerText.slice(0, item.innerText.length - 1);
        // each item in the list is stored as an array with item text and item state
        if (item.classList.contains("incomplete")) {
          todoStorage.push([itemText, "incomplete"]);
        } else if (item.classList.contains("complete")) {
          todoStorage.push([itemText, "complete"]);
        }
        // the to do list array is saved to localStorage as a string
        localStorage.setItem("storedList", JSON.stringify(todoStorage));
      }
    }
  }

  // a function that rebuilds the to do list from localStorage on page load
  function recallTodoList() {
    let storedList = JSON.parse(localStorage.getItem("storedList"));
    let listItemTaskValue = null;
    let listItemState = null;

    // if there is a list in local storage, this value will not be null
    if (storedList !== null) {
      for (i = 0; i < storedList.length; i++) {
        listItem = storedList[i];
        listItemTaskValue = listItem[0];
        listItemState = listItem[1];
        addListItem(listItemTaskValue, listItemState, false);
      }
    } else {
    }
    storeTodoList();
  }

  // a function that adds a task to the list
  // this function is called when adding a task from the form and when rebuilding the list from localStorage
  function addListItem(taskValue, state, store) {
    let todoItem = document.createElement("li");

    // the completion state is added to the to do item
    // when adding from recallTodoList, this will be the state from localStorage
    // when adding from form, this will be incomplete by default
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

    // clear the form after a task is added
    todoForm.reset();

    todoItem.addEventListener("click", function (e) {
      let targetTag = e.target.tagName;
      // clicking on the task (remove) button removes the list item
      if (targetTag === "BUTTON") {
        e.target.parentNode.remove();
        // clicking on the task text toggles the item complete or incomplete
      } else if (targetTag === "LI") {
        if (e.target.classList.contains("incomplete")) {
          e.target.style.textDecoration = "line-through";
          e.target.classList.add("complete");
          e.target.classList.remove("incomplete");
        } else if (todoItem.classList.contains("complete")) {
          e.target.style.textDecoration = "none";
          e.target.classList.add("incomplete");
          e.target.classList.remove("complete");
        }
      }
      // whenever an item is clicked, update the stored to do list in localStorage
      storeTodoList();
    });

    // when adding an item, the to do list may be stored in localStorage if the store flag is true
    // when adding an item from recallTodoList, this flag is false
    // when adding an item from the form, this flag is true
    if (store) {
      storeTodoList();
    }
  }

  // when the form is submitted, the form input is handled
  todoForm.addEventListener("submit", function (event) {
    // by default, submitting a form refreshses a page, so this default action is disabled
    event.preventDefault();
    let taskValue = document.querySelector("#task").value;
    // if the form valus is not blank, add the item to the list
    if (taskValue !== "") {
      addListItem(taskValue, "incomplete", true);
    }
  });
  recallTodoList();
});
