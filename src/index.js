import './style.css';
import { todos } from './todos.js';
import { editDOM } from './editDOM.js';
import { storage } from './storage.js';

const taskContainer = document.querySelector('.tasks');
const taskTitle = document.getElementById('task-name');
const taskDesc = document.getElementById('task-desc');
const taskDate = document.getElementById('task-date');
const taskid = document.querySelector('.task-id');

const addTask = () => {
    myTodos.addTask(taskTitle.value, taskDesc.value, taskDate.value);
    console.log(myTodos.getActiveTasks());
    store.saveToStorage(myTodos);
    display.renderTasks(myTodos.getActiveTasks());
};

const delTask = (e) => {
    if(e.target.classList.contains('del')) {
        console.log('deleting task');
        const task = e.target.parentElement;
        const taskNum = task.id.slice(5);
        myTodos.delTask(taskNum);
        store.saveToStorage(myTodos);
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

const editTask = (taskNum) => {
    myTodos.editTask(taskNum, taskTitle.value, taskDesc.value, taskDate.value);
    store.saveToStorage(myTodos);
    display.renderTasks(getActiveTab());
};

const editTaskInfo = (e) => {
    if(e.target.classList.contains('edit-task')) {
        editTaskBtn.style.display = 'inline-block';
        addTaskBtn.style.display = 'none';
        modal.style.display = 'block';

        const task = e.target.parentElement;
        const taskNum = task.id.slice(5);

        taskTitle.value = e.target.parentElement.children[2].textContent;
        taskDesc.value = e.target.parentElement.children[3].textContent;
        taskDate.value = e.target.parentElement.children[4].textContent;
        taskid.textContent = taskNum;

        taskTitle.focus();
        taskTitle.select();
    }
}

taskContainer.addEventListener('click', editTaskInfo);
taskContainer.addEventListener('click', delTask);

const projAdder = document.querySelector('.add-proj');
const projContainer = document.querySelector('.projects');

const addProj = (projName) => {
    console.log('adding proj');
    myTodos.addProject(projName);
    store.saveToStorage(myTodos);
    display.render(myTodos.getProjectTitles(), myTodos.getActiveid());
};

const delProj = (e) => {
    if(e.target.classList.contains('del')) {
        console.log('deleting proj');
        const project = e.target.parentElement;
        const index = [...projContainer.children].indexOf(project);

        myTodos.delProject(index);
        store.saveToStorage(myTodos);
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
    else if(e.target.classList.contains('project-title')) {
        console.log('selecting active proj');
        const project = e.target.parentElement;
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
                store.saveToStorage(myTodos);
            }
            display.render(myTodos.getProjectTitles(), myTodos.getActiveid());
        }
        projectInputText.addEventListener('keydown', projEnter);
        projectInputText.addEventListener('blur', activateEditProj);
    }
}

projContainer.addEventListener('click', editProjectName);

const selectInbox = (e) => {
    const project = e.target.closest('div');
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

const modal = document.querySelector('.task-modal');
const modalBtn = document.querySelector('.add-task');
const editTaskBtn = document.querySelector('.make-edit');
const addTaskBtn = document.querySelector('.make-task');
const cancelBtn = document.querySelector('.cancel');

modalBtn.addEventListener('click', () => {
    editTaskBtn.style.display = 'none';
    addTaskBtn.style.display = 'inline-block';
    modal.style.display = 'block';
    taskTitle.value = '';
    taskDesc.value = '';
    taskDate.value = '';
});

addTaskBtn.addEventListener('click', () => {
    addTask();
    taskTitle.value = '';
    taskDesc.value = '';
    taskDate.value = '';
    modal.style.display = 'none';
});

editTaskBtn.addEventListener('click', () => {
    editTask(taskid.textContent);
    taskTitle.value = '';
    taskDesc.value = '';
    taskDate.value = '';
    modal.style.display = 'none';
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if(e.target == modal) {
        modal.style.display = 'none';
    }
});

const changePriority = (e) => {
    if(e.target.classList.contains('priority-item')) {
        const task = e.target.parentElement.parentElement.parentElement;
        const priority = e.target.textContent;
        const taskNum = task.id.slice(5);

        const title = task.children[2].textContent;
        const desc = task.children[3].textContent;
        const date = task.children[4].textContent;
        
        myTodos.editTask(taskNum, title, desc, date, priority);
        store.saveToStorage(myTodos);
        display.renderTasks(getActiveTab());
    }
};

taskContainer.addEventListener('click', changePriority);

const toggleCheckBox = (e) => {
    if(e.target.type === 'checkbox') {
        const task = e.target.parentElement;
        const taskNum = task.id.slice(5);

        const priority = task.children[1].children[0].textContent;
        const title = task.children[2].textContent;
        const desc = task.children[3].textContent;
        const date = task.children[4].textContent;

        myTodos.editTask(taskNum, title, desc, date, priority, true);
        store.saveToStorage(myTodos);
        display.renderTasks(getActiveTab());
    }
};

taskContainer.addEventListener('click', toggleCheckBox);

const myTodos = todos();
const display = editDOM();
const store = storage(myTodos);

store.init();
display.render(myTodos.getProjectTitles(), myTodos.getActiveid());
display.renderTasks(myTodos.getActiveTasks());