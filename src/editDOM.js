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
    return {
        render,
    }
};

export { editDOM };