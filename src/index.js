import './style.css';
import { todos } from './todos.js';
import { editDOM } from './editDOM.js';

const addBtn = document.querySelector('.add');

const taskContainer = document.querySelector('.tasks');
const taskTitle = document.getElementById('task-name');
const taskDesc = document.getElementById('task-desc');
const taskDate = document.getElementById('task-date');

const addTask = () => {
    myTodos.addTask(taskTitle.value, taskDesc.value, taskDate.value);
    console.log(myTodos.getActiveTasks());
    display.renderTasks(myTodos.getActiveTasks());
};

const delTask = (e) => {
    if(e.target.classList.contains('del')) {
        console.log('deleting task');
        const task = e.target.parentElement;
        const taskNum = task.id.slice(5);
        myTodos.delTask(taskNum);
        display.renderTasks(getActiveTab());
    }
};

const getActiveTab = () => {
    const activeTab = document.querySelector('.active');
    if(activeTab == null) return myTodos.getAllTasks();
    if(activeTab.classList.contains('project-item')) {
        return myTodos.getActiveTasks();
    }
    else if(activeTab.classList.contains('all')) {
        return myTodos.getAllTasks();
    }
    else if(activeTab.classList.contains('today')) {
        return myTodos.getTodayTasks();
    }
    else if(activeTab.classList.contains('week')) {
        return myTodos.getWeekTasks();
    }
}

const editTaskInfo = (e) => {
    if(e.target.classList.contains('edit-task')) {
        console.log('edit task info');
        const task = e.target.parentElement;

        const taskNum = task.id.slice(5);
        myTodos.editTask(taskNum, taskTitle.value, taskDesc.value, taskDate.value);
        display.renderTasks(myTodos.getActiveTasks());
    }
}

taskContainer.addEventListener('click', editTaskInfo);
taskContainer.addEventListener('click', delTask);
addBtn.addEventListener('click', addTask);

const projAdder = document.querySelector('.add-proj');
const projContainer = document.querySelector('.projects');

const addProj = (projName) => {
    console.log('adding proj');
    myTodos.addProject(projName);
    display.render(myTodos.getProjectTitles(), myTodos.getActiveid());
};

const delProj = (e) => {
    if(e.target.classList.contains('del')) {
        console.log('deleting proj');
        const project = e.target.parentElement;
        const index = [...projContainer.children].indexOf(project);

        myTodos.delProject(index);
        display.render(myTodos.getProjectTitles(), myTodos.getActiveid());
        display.renderTasks(getActiveTab());
    }
};

projContainer.addEventListener('click', delProj);

const newProjectAdder = () => {
    console.log('newproj');
    const projectInputText = display.makeProjDiv();

    const projEnter = function(e) {
        if(e.key == 'Enter') {
            this.blur();
        }
    }
    const activateNewProj = function() {
        if(this.value === '') {
            projContainer.removeChild(projContainer.lastChild);
        }
        else {
            addProj(this.value);
        }
    }
    projectInputText.addEventListener('keydown', projEnter);
    projectInputText.addEventListener('blur', activateNewProj);
};

projAdder.addEventListener('click', newProjectAdder);

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
        
        const projectInputText = display.editProjDiv(project);

        const projEnter = function(e) {
            if(e.key == 'Enter') {
                this.blur();
            }
        }
        const activateEditProj = function() {
            if(this.value !== '') {
                myTodos.setProjectTitle(index, this.value);
            }
            display.render(myTodos.getProjectTitles(), myTodos.getActiveid());
        }
        projectInputText.addEventListener('keydown', projEnter);
        projectInputText.addEventListener('blur', activateEditProj);
    }
}

projContainer.addEventListener('click', editProjectName);

const selectInbox = (e) => {
    const project = e.target;
    if(project.classList.contains('all')) {
        console.log('selecting all');
        display.setActiveProject(project);
        display.renderTasks(myTodos.getAllTasks());
    }
    else if(project.classList.contains('today')) {
        console.log('selecting today');
        display.setActiveProject(project);
        display.renderTasks(myTodos.getTodayTasks());
    }
    else if(project.classList.contains('week')) {
        console.log('selecting week');
        display.setActiveProject(project);
        display.renderTasks(myTodos.getWeekTasks());
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