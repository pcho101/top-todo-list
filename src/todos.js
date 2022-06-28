import { Project } from './projects.js';
import { Task } from './task.js';
import { format, addWeeks } from 'date-fns';

const todos = () => {
    let allProjects = [];
    let activeProject = 0;
    let taskid = 0;
    const today = format(new Date(), 'yyyy-MM-dd');
    const week = format(addWeeks(new Date(), 1), 'yyyy-MM-dd');

    const addProject = (title) => {
        allProjects.push(new Project(title));
    };
    const getProjectTitles = () => {
        return allProjects.map((proj) => (proj.getTitle()));
    };
    const setProjectTitle = (index, title) => {
        allProjects[index].setTitle(title);
    };
    const delProject = (id) => {
        allProjects.splice(id, 1);
        if(id <= activeProject) {
            activeProject--;
            if(activeProject < 0) {
                activeProject = 0;
            }
        }
    };
    const getAllProjects = () => {
        return allProjects;
    };
    const addTask = (title, desc, date, priority, checked) => {
        if(allProjects.length > 0) {
            allProjects[activeProject].addTask(new Task(taskid, title, desc, date, priority, checked))
            taskid++;
        };
    };
    const editTask = (id, title, desc, date, priority, checked) => {
        if(priority === undefined) priority = '-';
        const projectIndex = findProjIndexOfTask(id);
        const taskIndex = findTaskIndexOfTask(id);
        const task = allProjects[projectIndex].tasks[taskIndex];
        task.setTitle(title);
        task.setDescription(desc);
        task.setDueDate(date);
        task.setPriority(priority);
        if(checked) task.setIsChecked();
    };
    const delTask = (id) => {
        const projectIndex = findProjIndexOfTask(id);
        allProjects[projectIndex].deleteTask(id);
    };
    const getActiveTasks = () => {
        return allProjects.length !== 0 ? allProjects[activeProject].tasks : [];
    };
    const getAllTasks = () => {
        return allProjects.map(proj => proj.tasks).flat();
    }
    const getTodayTasks = () => {
        return getAllTasks().filter((task) => task.getDueDate() === today);
    }
    const getWeekTasks = () => {
        return getAllTasks().filter((task) => task.getDueDate() >= today && task.getDueDate() <= week);
    }
    const getActiveid = () => {
        return activeProject;
    }
    const setActive = (id) => {
        activeProject = id;
    };

    const findProjIndexOfTask = (id) => {
        return allProjects.findIndex(proj => proj.tasks.some(task => task.getid() == id));
    }
    const findTaskIndexOfTask = (id) => {
        return allProjects[findProjIndexOfTask(id)].tasks.findIndex(task => task.getid() == id);
    }

    return {
        addProject, getProjectTitles, setProjectTitle, delProject, getAllProjects, 
        addTask, editTask, delTask, getActiveTasks, getAllTasks, getTodayTasks, getWeekTasks, getActiveid, setActive,
    };
};

export { todos };