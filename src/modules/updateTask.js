import resetIndex from './resetIndex.js';

const clearCompletedTask = () => {
  let todoArr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  todoArr = todoArr.filter((todo) => {
    if (todo.completedStatus !== true) {
      return true;
    }
    return false;
  });
  localStorage.setItem('tasks', JSON.stringify(todoArr));
  resetIndex();
  window.location.reload();
};

export default clearCompletedTask;