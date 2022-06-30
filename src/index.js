import './style.css';
import { todos } from './todos.js';
import { editDOM } from './editDOM.js';
import { storage } from './storage.js';

const defaultContainer = document.querySelector('.default-container');
const projAdder = document.querySelector('.add-proj');
const projContainer = document.querySelector('.projects');

const taskContainer = document.querySelector('.tasks');
const taskTitle = document.getElementById('task-name');
const taskDesc = document.getElementById('task-desc');
const taskDate = document.getElementById('task-date');
const taskid = document.querySelector('.task-id');

const modal = document.querySelector('.task-modal');
const modalBtn = document.querySelector('.add-task');
const addTaskBtn = document.querySelector('.make-task');
const editTaskBtn = document.querySelector('.make-edit');
const cancelBtn = document.querySelector('.cancel');

const selectInbox = (e) => {
    const project = e.target.closest('div');
    if(project.classList.contains('all')) {
        display.updateTaskHeader('All');
        display.setActiveProject(project);
        display.renderTasks(myTodos.getAllTasks());
    }
    else if(project.classList.contains('today')) {
        display.updateTaskHeader('Today');
        display.setActiveProject(project);
        display.renderTasks(myTodos.getTodayTasks());
    }
    else if(project.classList.contains('week')) {
        display.updateTaskHeader('This Week');
        display.setActiveProject(project);
        display.renderTasks(myTodos.getWeekTasks());
    }
    display.hideAddTask();
};

const addProj = (projName) => {
    myTodos.addProject(projName);
    store.saveToStorage(myTodos);
    display.renderProjects(myTodos.getProjectTitles(), myTodos.getActiveid());
};

const delProj = (e) => {
    if(e.target.classList.contains('del-proj')) {
        const project = e.target.parentElement;
        const index = [...projContainer.children].indexOf(project);

        myTodos.delProject(index);
        store.saveToStorage(myTodos);

        display.renderProjects(myTodos.getProjectTitles(), myTodos.getActiveid());
        display.renderTasks(getActiveTab());
        display.updateTaskHeaderAfterDelete(myTodos.getActiveid());
    }
};

const newProjectAdder = () => {
    const projectInputText = display.makeProjDiv();

    const projEnter = function(e) {
        if(e.key == 'Enter') {
            this.blur();
        }
        else if(e.key == 'Escape') {
            this.value = '';
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

const changeProject = (e) => {
    if(e.target.classList.contains('project-item')) {
        const project = e.target;
        const index = [...projContainer.children].indexOf(project);
        const projTitle = project.firstChild.textContent;
        
        myTodos.setActive(index);
        display.updateTaskHeader(projTitle);
        display.setActiveProject(project);
        display.renderTasks(myTodos.getActiveTasks());
    }
    else if(e.target.classList.contains('project-title')) {
        const project = e.target.parentElement;
        const index = [...projContainer.children].indexOf(project);
        const projTitle = project.firstChild.textContent;
        
        myTodos.setActive(index);
        display.updateTaskHeader(projTitle);
        display.setActiveProject(project);
        display.renderTasks(myTodos.getActiveTasks());
    }
    display.showAddTask();
}

const editProjectName = (e) => {
    if(e.target.classList.contains('edit-proj')) {
        const project = e.target.parentElement;
        const index = [...projContainer.children].indexOf(project);

        const projectInputText = display.editProjDiv(project);
        const prevProjText = projectInputText.value;

        const projEnter = function(e) {
            if(e.key == 'Enter') {
                this.blur();
            }
            else if(e.key == 'Escape') {
                this.value = prevProjText;
                this.blur();
            }
        }
        const activateEditProj = function() {
            if(this.value !== '') {
                myTodos.setProjectTitle(index, this.value);
                store.saveToStorage(myTodos);
            }
            display.renderProjects(myTodos.getProjectTitles(), myTodos.getActiveid());
            display.updateTaskHeaderAfterDelete(myTodos.getActiveid());
        }
        projectInputText.addEventListener('keydown', projEnter);
        projectInputText.addEventListener('blur', activateEditProj);
    }
}

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
};


const addTask = () => {
    myTodos.addTask(taskTitle.value, taskDesc.value, taskDate.value);
    store.saveToStorage(myTodos);
    display.renderTasks(myTodos.getActiveTasks());
};

const delTask = (e) => {
    if(e.target.classList.contains('del-task')) {
        const task = e.target.parentElement;
        const taskNum = task.id.slice(5);
        myTodos.delTask(taskNum);
        store.saveToStorage(myTodos);
        display.renderTasks(getActiveTab());
    }
};

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

const displayModal = () => {
    editTaskBtn.style.display = 'none';
    addTaskBtn.style.display = 'inline-block';
    modal.style.display = 'block';
    taskTitle.value = '';
    taskDesc.value = '';
    taskDate.value = '';
};

const clearModal = () => {
    taskTitle.value = '';
    taskDesc.value = '';
    taskDate.value = '';
    modal.style.display = 'none';
};

defaultContainer.addEventListener('click', selectInbox);
projAdder.addEventListener('click', newProjectAdder);
projContainer.addEventListener('click', delProj);
projContainer.addEventListener('click', changeProject);
projContainer.addEventListener('click', editProjectName);

taskContainer.addEventListener('click', editTaskInfo);
taskContainer.addEventListener('click', delTask);
taskContainer.addEventListener('click', toggleCheckBox);
taskContainer.addEventListener('click', changePriority);

modalBtn.addEventListener('click', displayModal);
addTaskBtn.addEventListener('click', () => {
    addTask();
    clearModal();
});

editTaskBtn.addEventListener('click', () => {
    editTask(taskid.textContent);
    clearModal();
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if(e.target == modal) {
        modal.style.display = 'none';
    }
});

const myTodos = todos();
const display = editDOM();
const store = storage(myTodos);

store.init();
display.renderProjects(myTodos.getProjectTitles(), myTodos.getActiveid());
display.renderTasks(myTodos.getActiveTasks());