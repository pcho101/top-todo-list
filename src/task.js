class Task {
    constructor(id, title, description, dueDate, notes) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = '-';
        this.isChecked = false;
        this.notes = notes;
    }
    getid() {
        return this.id;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }
    getTitle() {
        return this.title;
    }
    setDescription(newDescription) {
        this.description = newDescription;
    }
    getDescription() {
        return this.description;
    }
    setDueDate(newdueDate) {
        this.dueDate = newdueDate;
    }
    getDueDate() {
        return this.dueDate;
    }
    setPriority(newPriority) {
        this.priority = newPriority;
    }
    getPriority() {
        return this.priority;
    }
    setNotes(newNotes) {
        this.notes = newNotes;
    }
    getNotes() {
        return this.notes;
    }
    setIsChecked() {
        this.isChecked ? this.isChecked = false : this.isChecked = true;
    }
    getIsChecked() {
        return this.isChecked;
    }
};

export { Task };