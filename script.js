let newItem = document.getElementById('newItem');
let modal = document.getElementById('modal');
let closeModal = document.getElementById('closeModal');
let saveTaskBtn = document.getElementById('saveTaskBtn');
let taskInput = document.getElementById('taskInput');
let taskBody = document.getElementById('taskBody');
let taskCompleted = document.getElementById('taskCompleted')

let taskArr = [];

function Task(taskValue) {
    this.taskValue = taskValue;
    this.active = true;
};

let activateModal = (ev) => {
    ev.preventDefault();
    modal.setAttribute('class', 'modal is-active')
};

let deactivateModal = (ev) => {
    // ev.preventDefault();
    modal.setAttribute('class', 'modal');
};

let setLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(taskArr))
};

let getLocalStorage = () => {
    let taskStorage = JSON.parse(localStorage.getItem('tasks'))
    if (taskStorage !== null) taskArr = taskStorage
};

let filterTasks = () => {
    let activeTasks = taskArr.filter((element) => {
        if (element.active == true) return element
    })
    renderTasks(activeTasks)
};

let init = () => {
    getLocalStorage();
    filterTasks();
};

let renderTasks = (tasks) => {
    if (tasks == null || undefined) return;
    taskBody.innerHTML = ''
    tasks.forEach(element => {
        let node = document.createElement('div');
        node.innerHTML = `
        <p>${element.taskValue}</p>
        <button id="taskCompleted" data-task="${element.serial}">Done!</button>
        `
        taskBody.appendChild(node)
    });
};

let addTask = (element) => {
    let node = document.createElement('div');
    node.innerHTML = `
    <p>${element.taskValue}</p>
    <button id="taskCompleted" data-task="${element.serial}">Done!</button>
    `
    taskBody.appendChild(node)
};

let serializeTask = (element) => {
    for (let i=0; i<taskArr.length; i++) {
        element[i].serial = i;
    };
};

let saveTask = (ev) => {
    ev.preventDefault();
    let task = taskInput.value;
    let savedTask = new Task(task);
    deactivateModal();
    taskArr.push(savedTask);
    serializeTask(taskArr);
    filterTasks();
    setLocalStorage();
    taskInput.value = '';
};

let completeTask = (ev) => {
    ev.preventDefault();
    let completed = ev.target.getAttribute('data-task');
    taskArr[completed].active = false;
    setLocalStorage();
    filterTasks();
};

let clickChecker = (ev) => {
    ev.preventDefault()
    if (ev.target.id == 'taskCompleted') completeTask(ev)
};

newItem.addEventListener('click', activateModal);
closeModal.addEventListener('click', deactivateModal);
saveTaskBtn.addEventListener('click', saveTask);
document.body.addEventListener('click', clickChecker)

init();