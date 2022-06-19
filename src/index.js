import './style.css';
import { todos } from './todos.js';
import { editDOM } from './editDOM.js';

const addBtn = document.querySelector('.add');
const delBtn = document.querySelector('.del');

const addTask = () => {
    const myTask = new Task('newtask');
    myProjects.addTask(myTask);
    console.log(myProjects);
};

const delTask = () => {
    myProjects.deleteTask(0);
    console.log(myProjects);
};

addBtn.addEventListener('click', addTask);
delBtn.addEventListener('click', delTask);

const addProjBtn = document.querySelector('.add-proj');
const projContainer = document.querySelector('.projects');
const projectInput = document.getElementById('project-name');

const addProj = () => {
    console.log('adding proj');
    myTodos.addProject(projectInput.value);
    display.render(myTodos.getProjectTitles());
};

const delProj = (e) => {
    if(e.target.classList.contains('del')) {
        console.log('deleting proj');
        const project = e.target.parentElement;
        const index = [...projContainer.children].indexOf(project);
        myTodos.delProject(index);
        display.render(myTodos.getProjectTitles());
    }
};

addProjBtn.addEventListener('click', addProj);
projContainer.addEventListener('click', delProj);

const myTodos = todos();
const display = editDOM();

console.log(myTodos.getAllProjects());
console.log(myTodos.getProjectTitles());
display.render(myTodos.getProjectTitles());
