class Task {
    constructor(title, description, dueDate, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
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
    setdueDate(newdueDate) {
        this.dueDate = newdueDate;
    }
    getdueDate() {
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
    setChecklist(newChecklist) {
        this.checklist = newChecklist;
    }
    getChecklist() {
        return this.checklist;
    }
};

export { Task };