import resetIndex from './resetIndex.js';

const checkboxClicked = () => {
  const checkboxes = document.querySelectorAll('.checkb');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      if (checkbox.checked === true) {
        const todoTask = e.target.nextElementSibling.childNodes[0];
        todoTask.style.textDecoration = 'line-through';
        const todoArticle = e.target.parentElement.parentElement;
        const { index } = todoArticle.dataset;
        const todoArr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        todoArr.filter((todo) => {
          if (todo.index === index) {
            todo.completedStatus = true;
          }
          return false;
        });
        localStorage.setItem('tasks', JSON.stringify(todoArr));
      } else {
        const todoTask = e.target.nextElementSibling.childNodes[0];
        todoTask.style.textDecoration = 'none';
        const todoArticle = e.target.parentElement.parentElement;
        const { index } = todoArticle.dataset;
        const todoArr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        todoArr.filter((todo) => {
          if (todo.index === index) {
            todo.completedStatus = false;
          }
          return false;
        });
        localStorage.setItem('tasks', JSON.stringify(todoArr));
      }
    });
  });
};

// clear button
const clearCompletedTask = () => {
  const clearBtn = document.querySelector('.clear-btn');
  clearBtn.addEventListener('click', () => {
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
  });
};

export { checkboxClicked, clearCompletedTask };