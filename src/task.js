class Task {
    constructor(id, title, description, dueDate, notes, checklist) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = '-';
        this.notes = notes;
        this.checklist = checklist;
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
    setChecklist(newChecklist) {
        this.checklist = newChecklist;
    }
    getChecklist() {
        return this.checklist;
    }
};

export { Task };