import { Project } from './projects.js';
import { Task } from './task.js';

const todos = () => {
    let allProjects = [];

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
    };
    const getAllProjects = () => {
        return allProjects;
    }

    init();

    return {
        addProject, getProjectTitles, delProject, getAllProjects,
    };
};

export { todos };