const editDOM = () => {
    const render = (projectTitles) => {
        const projContainer = document.querySelector('.projects');
        while(projContainer.hasChildNodes()) {
            projContainer.removeChild(projContainer.firstChild)
        }
        
        for(let i = 0; i < projectTitles.length; i++) {
            const div = document.createElement('div');
            const btn = document.createElement('button');
            const activeBtn = document.createElement('button');
            
            div.textContent = projectTitles[i];
            btn.textContent = 'x';
            btn.classList.add('del');
            activeBtn.textContent = 'Y';
    
            div.appendChild(btn);
            div.appendChild(activeBtn);
            projContainer.appendChild(div);
        }
    };
    const renderTasks = (taskValues) => {
        console.log('task rendinger');
        console.log(taskValues);
        const taskContainer = document.querySelector('.tasks');
        while(taskContainer.hasChildNodes()) {
            taskContainer.removeChild(taskContainer.firstChild)
        }
        
        for(let i = 0; i < taskValues.length; i++) {
            const div = document.createElement('div');
            const btn = document.createElement('button');
            const infoBtn = document.createElement('button');
            
            div.textContent = taskValues[i];
            btn.textContent = 'x';
            btn.classList.add('del');
            infoBtn.textContent = 'i';
    
            div.appendChild(btn);
            div.appendChild(infoBtn);
            taskContainer.appendChild(div);
        }
    };
    return {
        render, renderTasks,
    }
};

export { editDOM };