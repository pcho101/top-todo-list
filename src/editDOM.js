const editDOM = () => {
    const render = (projectTitles, activeProject) => {
        const projContainer = document.querySelector('.projects');
        while(projContainer.hasChildNodes()) {
            projContainer.removeChild(projContainer.firstChild)
        }
        clearActiveClass();
        for(let i = 0; i < projectTitles.length; i++) {
            const div = document.createElement('div');
            const btn = document.createElement('button');
            const editBtn = document.createElement('button');
            
            div.classList.add('project-item');
            if(i === activeProject) {
                div.classList.add('active');
            }
            div.textContent = projectTitles[i];
            btn.textContent = 'x';
            btn.classList.add('del');
            editBtn.classList.add('edit-proj');
            editBtn.textContent = 'E';
    
            div.appendChild(btn);
            div.appendChild(editBtn);
            projContainer.appendChild(div);
        }
    };
    const renderTasks = (taskValues) => {
        const taskContainer = document.querySelector('.tasks');
        while(taskContainer.hasChildNodes()) {
            taskContainer.removeChild(taskContainer.firstChild)
        }
        
        for(let i = 0; i < taskValues.length; i++) {
            const div = document.createElement('div');
            const btn = document.createElement('button');
            const editBtn = document.createElement('button');
            const titleDiv = document.createElement('div');
            const descDiv = document.createElement('div');
            const dateDiv = document.createElement('div');
            const check = document.createElement('input');
            
            check.setAttribute('type', 'checkbox');
            div.classList.add('task-item');

            div.id = 'task-' + taskValues[i].getid();
            titleDiv.textContent = taskValues[i].getTitle();
            descDiv.textContent = taskValues[i].getDescription();
            dateDiv.textContent = taskValues[i].getDueDate();

            btn.textContent = 'x';
            btn.classList.add('del');
            editBtn.classList.add('edit-task');
            editBtn.textContent = 'E';

            div.appendChild(check);
            div.appendChild(titleDiv);
            div.appendChild(descDiv);
            div.appendChild(dateDiv);
            div.appendChild(btn);
            div.appendChild(editBtn);
            taskContainer.appendChild(div);
        }
    };
    const setActiveProject = (node) => {
        clearActiveClass();
        node.classList.add('active');
    };
    const clearActiveClass = () => {
        const allProjects = document.querySelectorAll('.project-item');
        const allDefaultProjects = document.querySelectorAll('.default-project');
        allProjects.forEach((node) => {
            node.classList.remove('active');
        });
        allDefaultProjects.forEach((node) => {
            node.classList.remove('active');
        });
    };
    return {
        render, renderTasks, setActiveProject,
    }
};

export { editDOM };