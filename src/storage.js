const storage = (myTodos) => {
    const getFromStorage = () => {
        const history = localStorage.getItem('toDoList');
        if(history) {
            const parsedData = JSON.parse(history);
            for(const proj in parsedData) {
                const projTitle = parsedData[proj].title;
                myTodos.addProject(projTitle);
                myTodos.setActive(myTodos.getAllProjects().length-1);
                const projTasks = parsedData[proj].tasks;
                for(const task in projTasks) {
                    const taskTitle = projTasks[task].title;
                    const taskDesc = projTasks[task].description;
                    const taskDate = projTasks[task].dueDate;
                    const taskPriority = projTasks[task].priority;
                    const taskChecked = projTasks[task].isChecked;
                    myTodos.addTask(taskTitle, taskDesc, taskDate, taskPriority, taskChecked);
                }
            }
        }
    };
    const populateStorage = () => {
        const defaultData = '[{"title":"The default project","tasks":[{"id":0,"title":"Hike","description":"Forest Trail at 9am","dueDate":"2022-06-20","priority":"-","isChecked":false},{"id":1,"title":"Badminton","description":"Rec Center at 4pm","dueDate":"2022-06-24","priority":"-","isChecked":false}]},{"title":"The 2nd project","tasks":[{"id":4,"title":"Shopping","description":"Buy toilet paper and napkins","dueDate":"2022-06-28","priority":"-","isChecked":false}]}]'
        localStorage.setItem('toDoList', defaultData);
        getFromStorage();
    };
    const saveToStorage = (myTodos) => {
        const storageValue = JSON.stringify(myTodos.getAllProjects());
        localStorage.setItem('toDoList', storageValue);
    };
    const init = () => {
        if(!localStorage.getItem('toDoList')) {
            populateStorage();
        }
        else {
            getFromStorage();
        }
    }
    return {
        saveToStorage, init,
    }
};

export { storage };