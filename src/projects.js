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
        const index = this.tasks.findIndex(task => task.getid() == id)
        this.tasks.splice(index, 1);
    }
};

export { Project };