import './style.css';

const data = [
    {
        description: `go shopping`,
        completed: false,
        index: 1
    },
    {
        description: `watch football`,
        completed: true,
        index: 2
    },
    {
        description: `complete today's project`,
        completed: false,
        index: 3
    },
    {
        description: `go for a walk`,
        completed: true,
        index: 4
    }
];

const listContainer = document.querySelector('.todo-list');

window.addEventListener('DOMContentLoaded', ()=> {
    listString = data.map((list)=> {
        return `<article>
        <div class="inp-p">
            <input type="checkbox">
            <p>${list.description}</p>
        </div>
        <i class="fa-solid fa-ellipsis-vertical"></i>
    </article>`
    })
    .join('');
    listContainer.innerHTML = listString;
    
});
