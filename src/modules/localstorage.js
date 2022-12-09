const addToLocalStorage = (task, completedStatus, index) => {
  const todo = { task, completedStatus, index };

  const todoArr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

  todoArr.push(todo);
  localStorage.setItem('tasks', JSON.stringify(todoArr));
};

const removeFromLocalStorage = (index) => {
  let todoArr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

  todoArr = todoArr.filter((todo) => {
    if (todo.index !== index) {
      return true;
    }
    return false;
  });

  localStorage.setItem('tasks', JSON.stringify(todoArr));
  window.location.reload();
};

const editLocalStorage = (task, status, index) => {
  let todoArr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  todoArr = todoArr.map((todo) => {
    if (todo.index === index) {
      todo.task = task;
      todo.completedStatus = status;
    }
    return todo;
  });
  localStorage.setItem('tasks', JSON.stringify(todoArr));
};

export {
  addToLocalStorage, removeFromLocalStorage, editLocalStorage,
};