class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }
    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title;
    }
    addTask(task) {
        this.tasks.push(task);
    }
    deleteTask(id) {
        this.tasks.splice(id, 1);
    }
};

export { Project };