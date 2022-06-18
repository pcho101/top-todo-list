import './style.css';
import { Project } from './projects.js';
import { Task } from './task.js';

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

const myProjects = new Project('Project 1');
const myTask1 = new Task('myTask1');

myTask1.setNotes('My first notes');
myProjects.setTitle('44');
myProjects.addTask(myTask1);

console.log(myProjects);