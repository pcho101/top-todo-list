const editDOM = () => {
    const projContainer = document.querySelector('.projects');
    const taskContainer = document.querySelector('.tasks');
    const currentProjHeader = document.querySelector('.current-project');
    const resetPage = (container) => {
        while(container.hasChildNodes()) {
            container.removeChild(container.firstChild)
        }
    };
    const renderProjects = (projectTitles, activeProject) => {
        resetPage(projContainer);
        clearActiveClass();
        for(let i = 0; i < projectTitles.length; i++) {
            const div = document.createElement('div');
            const title = document.createElement('div');
            const editBtn = document.createElement('span');
            const delBtn = document.createElement('span');
            
            div.classList.add('project-item');
            if(i === activeProject) div.classList.add('active');
            title.classList.add('project-title');
            editBtn.classList.add('material-icons');
            editBtn.classList.add('edit-proj');
            delBtn.classList.add('material-icons');
            delBtn.classList.add('del-proj');

            title.textContent = projectTitles[i];
            editBtn.textContent = 'edit_note';
            delBtn.textContent = 'delete_outline';

            div.appendChild(title);
            div.appendChild(editBtn);
            div.appendChild(delBtn);
            projContainer.appendChild(div);
        }
    };
    const renderTasks = (taskValues) => {
        resetPage(taskContainer);
        for(let i = 0; i < taskValues.length; i++) {
            const div = document.createElement('div');
            const check = document.createElement('input');
            const priorityValue = taskValues[i].getPriority();
            const priority = createPriorityDiv(priorityValue);
            const titleDiv = document.createElement('div');
            const descDiv = document.createElement('div');
            const dateDiv = document.createElement('div');
            const editBtn = document.createElement('span');
            const delBtn = document.createElement('span');
            
            check.setAttribute('type', 'checkbox');

            div.classList.add('task-item');
            taskValues[i].getIsChecked() ? div.classList.add('checked') : div.classList.remove('checked');
            if(priorityValue === '-') {
                div.classList.add('priority-low');
            }
            else if(priorityValue === '!') {
                div.classList.add('priority-med');
            }
            else {
                div.classList.add('priority-high');
            }
            titleDiv.classList.add('task-title');
            descDiv.classList.add('task-desc');
            dateDiv.classList.add('task-date');
            editBtn.classList.add('material-icons');
            editBtn.classList.add('edit-task');
            delBtn.classList.add('material-icons');
            delBtn.classList.add('del-task');

            div.id = 'task-' + taskValues[i].getid();
            
            check.checked = taskValues[i].getIsChecked();
            titleDiv.textContent = taskValues[i].getTitle();
            descDiv.textContent = taskValues[i].getDescription();
            dateDiv.textContent = taskValues[i].getDueDate();
            editBtn.textContent = 'edit_note';
            delBtn.textContent = 'delete_outline';

            div.appendChild(check);
            div.appendChild(priority);
            div.appendChild(titleDiv);
            div.appendChild(descDiv);
            div.appendChild(dateDiv);
            div.appendChild(editBtn);
            div.appendChild(delBtn);
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
    const updateTaskHeader = (title) => {
        currentProjHeader.textContent = title;
    };
    const updateTaskHeaderAfterDelete = (id) => {
        const numProjects = projContainer.children.length;
        currentProjHeader.textContent = numProjects != 0 ? projContainer.children[id].firstChild.textContent : 'My Tasks';
    };
    const showAddTask = () => {
        const addTaskBtn = document.querySelector('.add-task');
        addTaskBtn.style.display = '';
    };
    const hideAddTask = () => {
        const addTaskBtn = document.querySelector('.add-task');
        addTaskBtn.style.display = 'none';
    };
    return {
        renderProjects, renderTasks, setActiveProject, makeProjDiv, editProjDiv,
        updateTaskHeader, updateTaskHeaderAfterDelete, showAddTask, hideAddTask,
    }
};

export { editDOM };