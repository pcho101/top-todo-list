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

const editTaskInfo = (e) => {
    if(e.target.classList.contains('edit-task')) {
        console.log('edit task info');
        const task = e.target.parentElement;
        const index = [...taskContainer.children].indexOf(task);
        
        myTodos.editTask(index, taskTitle.value, taskDesc.value, taskDate.value);
        display.renderTasks(myTodos.getActiveTasks());
    }
}

taskContainer.addEventListener('click', editTaskInfo);
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
        
        myTodos.setActive(index);
        display.setActiveProject(project);
        display.renderTasks(myTodos.getActiveTasks());
    }
}

projContainer.addEventListener('click', changeProject);

const editProjectName = (e) => {
    if(e.target.classList.contains('edit-proj')) {
        console.log('edit project name');
        const project = e.target.parentElement;
        const index = [...projContainer.children].indexOf(project);

        myTodos.setProjectTitle(index, projectInput.value);
        display.render(myTodos.getProjectTitles(), myTodos.getActiveid())
    }
}

projContainer.addEventListener('click', editProjectName);

const selectInbox = (e) => {
    let myTasks = myTodos.getAllTasks();
    const project = e.target;
    if(project.classList.contains('all')) {
        console.log('selecting all');
        display.setActiveProject(project);
        display.renderTasks(myTasks);
    }
    else if(project.classList.contains('today')) {
        console.log('selecting today');
        myTasks = myTasks.filter((task) => task.getDueDate() === "2022-06-20");
        display.setActiveProject(project);
        display.renderTasks(myTasks);
    }
    else if(project.classList.contains('week')) {
        console.log('selecting week');
        myTasks = myTasks.filter((task) => task.getDueDate() >= "2022-06-23" && task.getDueDate() <= "2022-06-27");
        display.setActiveProject(project);
        display.renderTasks(myTasks);
    }
}

const defaultContainer = document.querySelector('.default-container');
defaultContainer.addEventListener('click', selectInbox);

const myTodos = todos();
const display = editDOM();

console.log(myTodos.getAllProjects());
console.log(myTodos.getProjectTitles());
display.render(myTodos.getProjectTitles(), myTodos.getActiveid());

myTodos.addTask('Hike', 'Forest Trail at 9am', '2022-06-20');
myTodos.addTask('Badminton', 'Rec Center at 4pm', '2022-06-24');
display.renderTasks(myTodos.getActiveTasks());