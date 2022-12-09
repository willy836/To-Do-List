import './style.css';
import {
  addToLocalStorage, removeFromLocalStorage, editLocalStorage,
} from './modules/localstorage.js';
import resetIndex from './modules/resetIndex.js';
import clearCompletedTask from './modules/updateTask.js';

const listContainer = document.querySelector('.list-container');
const form = document.querySelector('.form');
const todoInput = document.querySelector('.to-do');
const todoList = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-btn');

// add task function
const addTask = (e) => {
  e.preventDefault();
  const todoArr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  const task = todoInput.value;
  const completedStatus = false;
  const index = (todoArr.length + 1).toString();
  if (task) {
    const article = document.createElement('article');
    article.className = 'article';
    const attr = document.createAttribute('data-index');
    attr.value = index;
    article.setAttributeNode(attr);
    article.innerHTML = `<div class="inp-p">
    <input type="checkbox" class="checkb">
    <div class="todo-desc"><p class="todo-item">${task}</p></div>
</div>
<div class="icons">
    <i class="fa-solid fa-ellipsis-vertical"></i>
    <i class="fa-solid fa-trash-clock fa-trash"></i>
</div>`;
    const checkboxes = article.querySelectorAll('.checkb');
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
    const optionBtn = article.querySelector('.fa-ellipsis-vertical');
    const deleteBtn = article.querySelector('.fa-trash');
    optionBtn.addEventListener('click', (e) => {
      optionBtn.classList.add('hide-optionBtn');
      deleteBtn.classList.add('show-trash');
      const editTodo = e.target.parentElement.previousElementSibling.lastElementChild.childNodes[0];

      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.className = 'edit-input';

      article.classList.add('edit-article');
      editInput.value = editTodo.textContent;
      const editIndex = e.target.parentElement.parentElement.dataset.index;
      editInput.focus();

      const descDiv = e.target.parentElement.previousElementSibling.lastElementChild;
      descDiv.removeChild(editTodo);
      descDiv.appendChild(editInput);

      editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          editTodo.textContent = editInput.value;

          descDiv.appendChild(editTodo);
          descDiv.removeChild(editInput);
          article.classList.remove('edit-article');
          optionBtn.classList.remove('hide-optionBtn');
          deleteBtn.classList.remove('show-trash');
        }

        editLocalStorage(editTodo.textContent, completedStatus, editIndex);
      });
    });
    deleteBtn.addEventListener('click', (e) => {
      const todo = e.target.parentElement.parentElement;
      const { index } = todo.dataset;
      todoList.removeChild(todo);
      if (todoList.children.length === 0) {
        listContainer.classList.remove('show-container');
      }

      removeFromLocalStorage(index);

      resetIndex();
    });

    todoList.appendChild(article);
    listContainer.classList.add('show-container');
    todoInput.value = '';

    const taskObj = {};
    taskObj.desc = task;
    taskObj.completed = false;
    taskObj.index = index;

    addToLocalStorage(task, completedStatus, index);
  }
};

form.addEventListener('submit', addTask);

clearBtn.addEventListener('click', clearCompletedTask);

window.addEventListener('DOMContentLoaded', () => {
  const todoArr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  if (todoArr.length > 0) {
    todoArr.forEach((todo) => {
      const article = document.createElement('article');
      article.className = 'article';
      const attr = document.createAttribute('data-index');
      attr.value = todo.index;

      article.setAttributeNode(attr);
      article.innerHTML = `<div class="inp-p">
          <input type="checkbox" class="checkb">
          <div class="todo-desc"><p class="todo-item">${todo.task}</p></div>
      </div>
      <div class="icons">
          <i class="fa-solid fa-ellipsis-vertical"></i>
          <i class="fa-solid fa-trash-clock fa-trash"></i>
      </div>`;
      const checkboxes = article.querySelectorAll('.checkb');
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

      const optionBtn = article.querySelector('.fa-ellipsis-vertical');
      const deleteBtn = article.querySelector('.fa-trash');
      optionBtn.addEventListener('click', (e) => {
        optionBtn.classList.add('hide-optionBtn');
        deleteBtn.classList.add('show-trash');
        const editTodo = e.target.parentElement.previousElementSibling
          .lastElementChild.childNodes[0];
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';

        article.classList.add('edit-article');
        editInput.value = editTodo.textContent;
        const editIndex = e.target.parentElement.parentElement.dataset.index;
        editInput.focus();

        const descDiv = e.target.parentElement.previousElementSibling.lastElementChild;
        descDiv.removeChild(editTodo);
        descDiv.appendChild(editInput);

        editInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            editTodo.textContent = editInput.value;

            descDiv.appendChild(editTodo);
            descDiv.removeChild(editInput);
            article.classList.remove('edit-article');
            optionBtn.classList.remove('hide-optionBtn');
            deleteBtn.classList.remove('show-trash');
          }

          editLocalStorage(editTodo.textContent, false, editIndex);
        });
      });
      deleteBtn.addEventListener('click', (e) => {
        const todo = e.target.parentElement.parentElement;
        const { index } = todo.dataset;
        todoList.removeChild(todo);
        if (todoList.children.length === 0) {
          listContainer.classList.remove('show-container');
        }

        removeFromLocalStorage(index);

        resetIndex();
        window.location.reload();
      });
      todoList.appendChild(article);
      listContainer.classList.add('show-container');
    });
  }
});
