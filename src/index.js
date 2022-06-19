import './style.css';
import { todos } from './todos.js';
import { editDOM } from './editDOM.js';

const addBtn = document.querySelector('.add');
const delBtn = document.querySelector('.del');

const taskContainer = document.querySelector('.tasks');
const taskTitle = document.getElementById('task-name');
const taskDesc = document.getElementById('task-desc');
const taskDate = document.getElementById('task-date');

const addTask = () => {
    myTodos.addTask(taskTitle.value, taskDesc.value, taskDate.value);
    // myTodos.addTask('toptiel', 'gonna go downtown', '07/67/78');
    console.log(myTodos.getActiveTasks());
    display.renderTasks(myTodos.getActiveTasks());
};

const delTask = (e) => {
    if(e.target.classList.contains('del')) {
        console.log('deleting task');
        const task = e.target.parentElement;
        const index = [...taskContainer.children].indexOf(task);
        myTodos.delTask(index);
        display.renderTasks(myTodos.getActiveTasks());
    }
};

taskContainer.addEventListener('click', delTask);
addBtn.addEventListener('click', addTask);
delBtn.addEventListener('click', delTask);

const addProjBtn = document.querySelector('.add-proj');
const projContainer = document.querySelector('.projects');
const projectInput = document.getElementById('project-name');

const addProj = () => {
    console.log('adding proj');
    myTodos.addProject(projectInput.value);
    display.render(myTodos.getProjectTitles(), myTodos.getActiveid());
};

const delProj = (e) => {
    if(e.target.classList.contains('del')) {
        console.log('deleting proj');
        const project = e.target.parentElement;
        const index = [...projContainer.children].indexOf(project);
        const updateTasks = myTodos.getActiveid() == index;

        myTodos.delProject(index);
        display.render(myTodos.getProjectTitles(), myTodos.getActiveid())
        if(updateTasks) {
            display.renderTasks(myTodos.getActiveTasks());
        };
    }
};

addProjBtn.addEventListener('click', addProj);
projContainer.addEventListener('click', delProj);


const changeProject = (e) => {
    if(e.target.classList.contains('project-item')) {
        console.log('selecting active proj');
        const project = e.target;
        const index = [...projContainer.children].indexOf(project);
        const prevIndex = myTodos.getActiveid();
        
        myTodos.setActive(index);
        display.setActiveProject(prevIndex, index);
        display.renderTasks(myTodos.getActiveTasks());
    }
}

projContainer.addEventListener('click', changeProject);

const myTodos = todos();
const display = editDOM();

console.log(myTodos.getAllProjects());
console.log(myTodos.getProjectTitles());
display.render(myTodos.getProjectTitles(), myTodos.getActiveid());

myTodos.addTask('toptiel', 'gonna go downtown', '07/67/78');
myTodos.addTask('toptiel2', 'gonna go uptown', '07/67/98');
display.renderTasks(myTodos.getActiveTasks());