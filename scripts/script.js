const newItem = document.getElementById('newItem');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const saveTaskBtn = document.getElementById('saveTaskBtn');
const cancelBtn = document.getElementById('cancelBtn');
const taskInput = document.getElementById('taskInput');
const taskBody = document.getElementById('taskBody');
const complTaskBody = document.getElementById('complTaskBody');
const taskCompleted = document.getElementById('taskCompleted');
const clearTask = document.getElementById('clearTask');
const clearAllComp = document.getElementById('clearAllComp');

let taskArr = [];
let activeTaskArr = [];
let complTaskArr = [];

function Task(taskValue) {
    this.taskValue = taskValue;
    this.active = true;
};

const activateModal = (ev) => {
    ev.preventDefault();
    modal.setAttribute('class', 'modal is-active')
};

const deactivateModal = (ev) => {
    // ev.preventDefault();
    modal.setAttribute('class', 'modal');
};

const setLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(taskArr));
};

const getLocalStorage = () => {
    const taskStorage = JSON.parse(localStorage.getItem('tasks'))
    if (taskStorage !== null) taskArr = taskStorage
};

const filterTasks = () => {
    const activeTasks = taskArr.filter((element) => {
        if (element.active == true) return element
    })
    const inactiveTasks = taskArr.filter((element) => {
        if (element.active == false) return element
    })
    activeTaskArr = activeTasks;
    complTaskArr = inactiveTasks;
    renderTasks(activeTaskArr)
    renderCompletedTasks(complTaskArr)
};

const init = () => {
    getLocalStorage();
    filterTasks();
};

const renderTasks = (tasks) => {
    if (tasks == null || undefined) return;
    taskBody.innerHTML = ''
    tasks.forEach(element => {
        let node = document.createElement('div');
        node.innerHTML = `
        <div class="level p-1">
            <p class="active level-left pl-3">${element.taskValue}</p>
            <button id="taskCompleted" data-task="${element.serial}" class="button is-small is-light level-right">Done!</button>
        </div>
            `
        taskBody.appendChild(node)
    });
};

const renderCompletedTasks = (tasks) => {
    if (tasks === null || undefined) return;
    complTaskBody.innerHTML = ''
    tasks.forEach(element => {
        let node = document.createElement('div');
        node.innerHTML = `
        <div class="level p-1">
            <p class="completed level-left pl-3">${element.taskValue}</p>
            <button id="clearTask" data-task="${element.serial}" class="button is-small is-light level-right">Clear</button>
        </div>
        `
        complTaskBody.appendChild(node);
    })
}

const serializeTask = (element) => {
    for (let i=0; i<taskArr.length; i++) {
        element[i].serial = i;
    };
};

const saveTask = (ev) => {
    ev.preventDefault();
    const task = taskInput.value.trim();
    if (typeof task !== 'string' || task.length == 0) {
        taskInput.value = '';
        return
    }
    const savedTask = new Task(task);
    deactivateModal();
    taskArr.push(savedTask);
    serializeTask(taskArr);
    filterTasks();
    setLocalStorage();
    taskInput.value = '';
};

const completeTask = (ev) => {
    ev.preventDefault();
    const completed = ev.target.getAttribute('data-task');
    taskArr[completed].active = false;
    setLocalStorage();
    filterTasks();
};

const clickChecker = (ev) => {
    ev.preventDefault()
    switch (ev.target.id) {
        case 'newItem':
            activateModal(ev)
            break;
        case 'taskCompleted':
            completeTask(ev)
            break;
        case 'clearTask':
            console.log('in progress..')
            // clearCompleted(ev)
            break;
        case 'clearAllComp':
            clearCompleted()
            break;
        case 'closeModal':
        case 'cancelBtn':
            deactivateModal(ev)
            break;
        case 'saveTaskBtn':
            saveTask(ev)
            break;
    };
};

const clearCompleted = () => {
    const result = taskArr.filter(element => element.active !== false)
    taskArr = result;
    setLocalStorage();
    filterTasks();
};

document.body.addEventListener('click', clickChecker);

init();