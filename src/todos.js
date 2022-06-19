import { Project } from './projects.js';
import { Task } from './task.js';

const todos = () => {
    let allProjects = [];
    let activeProject = 0;

    const init = () => {
        console.log('init');
        addProject('The default project');
        addProject('The 2nd project');
    };
    const addProject = (title) => {
        allProjects.push(new Project(title));
    };
    const getProjectTitles = () => {
        return allProjects.map((proj) => (proj.getTitle()));
    };
    const delProject = (id) => {
        allProjects.splice(id, 1);
        if(id == activeProject) {
            if(id > 0) {
                activeProject--;
            }
            else {
                activeProject = 0;
            }
        }
    };
    const getAllProjects = () => {
        return allProjects;
    };
    const addTask = (title, desc, date) => {
        if(allProjects.length > 0) {
            allProjects[activeProject].addTask([title, desc, date])
        };
    };
    const delTask = (id) => {
        allProjects[activeProject].deleteTask(id);
    };
    const getActiveTasks = () => {
        return allProjects.length !== 0 ? allProjects[activeProject].tasks : [];
    };
    const getActiveid = () => {
        return activeProject;
    }
    const setActive = (id) => {
        activeProject = id;
    };

    init();

    return {
        addProject, getProjectTitles, delProject, getAllProjects, addTask, delTask, getActiveTasks, getActiveid, setActive,
    };
};

export { todos };