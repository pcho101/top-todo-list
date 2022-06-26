const editDOM = () => {
    const render = (projectTitles, activeProject) => {
        const projContainer = document.querySelector('.projects');
        while(projContainer.hasChildNodes()) {
            projContainer.removeChild(projContainer.firstChild)
        }
        clearActiveClass();
        for(let i = 0; i < projectTitles.length; i++) {
            const div = document.createElement('div');
            const title = document.createElement('div');
            const btn = document.createElement('button');
            const editBtn = document.createElement('button');
            
            div.classList.add('project-item');
            if(i === activeProject) {
                div.classList.add('active');
            }
            title.textContent = projectTitles[i];
            btn.textContent = 'x';
            btn.classList.add('del');
            editBtn.classList.add('edit-proj');
            editBtn.textContent = 'E';
    
            div.appendChild(title);
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
            const priority = createPriorityDiv(taskValues[i].getPriority());
            
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
            div.appendChild(priority);
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
    const makeProjDiv = () => {
        const projContainer = document.querySelector('.projects');
        const newProjDiv = document.createElement('div');
        const projectInputText = document.createElement('input');
    
        newProjDiv.classList.add('project-div');
        projectInputText.classList.add('project-text');
        projectInputText.type = 'text';
        
        newProjDiv.appendChild(projectInputText);
        projContainer.appendChild(newProjDiv);
        projectInputText.focus();
        
        return projectInputText;
    };
    const editProjDiv = (curProj) => {
        const projContainer = document.querySelector('.projects');
        const newProjDiv = document.createElement('div');
        const projectInputText = document.createElement('input');
    
        newProjDiv.classList.add('project-div');
        projectInputText.classList.add('project-text');
        projectInputText.type = 'text';
        projectInputText.value = curProj.firstChild.textContent;
        
        newProjDiv.appendChild(projectInputText);
        curProj.replaceChild(newProjDiv, curProj.firstChild);
        projectInputText.focus();
        projectInputText.select();
        
        return projectInputText;
    };
    const createPriorityDiv = (priority) => {
        const priorityDiv = document.createElement('div');
        const prioritySign = document.createElement('span');
        const priorityBox = document.createElement('div');
        const priority1 = document.createElement('div');
        const priority2 = document.createElement('div');
        const priority3 = document.createElement('div');

        prioritySign.textContent = priority;
        priority1.textContent = '-';
        priority2.textContent = '!';
        priority3.textContent = '!!';

        priorityDiv.classList.add('priority');
        priorityBox.classList.add('priority-box');
        prioritySign.classList.add('priority-drop');
        priority1.classList.add('priority-item');
        priority2.classList.add('priority-item');
        priority3.classList.add('priority-item');

        priorityBox.appendChild(priority1);
        priorityBox.appendChild(priority2);
        priorityBox.appendChild(priority3);
        priorityDiv.appendChild(prioritySign);
        priorityDiv.appendChild(priorityBox);

        return priorityDiv;
    };
    return {
        render, renderTasks, setActiveProject, makeProjDiv, editProjDiv,
    }
};

export { editDOM };