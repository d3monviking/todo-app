// Task List


let taskList = JSON.parse(localStorage.getItem('taskList')) || [
    'Go to Gym',
    'Read novel'
];
let completedTask = JSON.parse(localStorage.getItem('completedList')) || [
    'Jump off the cliff'
];


function saveToStorage(){
    localStorage.setItem("taskList", JSON.stringify(taskList));
    localStorage.setItem("completedList", JSON.stringify(completedTask));
}


let checker;

// Footer Options

const all = document.querySelector('.all');
const active = document.querySelector('.active');
const completed = document.querySelector('.completed');

// Rendering All, Active and Completed Tasks

all.addEventListener('click', () => {
    renderTask();
});

active.addEventListener('click', () => {
    renderActive();
});

completed.addEventListener('click', () => {
    renderCompleted();
});

// Render Tasks Left

function taskLeft(){
    document.querySelector('.items').textContent = `${taskList.length} items left`;
}

// Which List to render

function renderList(){
    if(checker === 1){
        renderTask();
    }
    else if(checker === 2){
        renderActive();
    }
    else{
        renderCompleted();
    }
}

// Deleting a Task

function deleteTask(){
    document.querySelectorAll('.taskL').forEach((task) => {
        const cross = task.lastChild;
        task.addEventListener('mouseover', () => {
            cross.setAttribute('style', 'display: block');
        });
        task.addEventListener('mouseout', () => {
            task.lastChild.removeAttribute('style');
        });
        cross.addEventListener('click', () => {
            const content = cross.dataset.task;
            if(cross.dataset.status === "taskList"){
                const index = taskList.indexOf(content);
                taskList.splice(index, 1);
            }
            else{
                const index = completedTask.indexOf(content);
                completedTask.splice(index, 1);
            }
            saveToStorage();
            renderList();
        });
    });
}

function uncheck(){
    document.querySelectorAll('.checked').forEach((task) => {
        task.addEventListener('click', () => {
            const content = task.parentElement.innerText;
            taskList.push(content);
            const index = completedTask.indexOf(content);
            completedTask.splice(index, 1);
            saveToStorage();
            renderList();
        })
    });
};

function check(){
    document.querySelectorAll('.not-checked').forEach((task) => {
        task.addEventListener('click', () => {
            const content = task.parentElement.innerText;
            completedTask.push(content);
            const index = taskList.indexOf(content);
            taskList.splice(index, 1);
            saveToStorage();
            renderList();
        })
    });
}

// Rendering Task from DB (simulating it via JS List)

function renderTask(){
    checker = 1;
    let html = "";
    taskList.forEach((task) => {
        html += `<div class="task taskL"><span class ="check not-checked"><img></span>${task} <img src="/images/icon-cross.svg" class = "cross" data-task = "${task}" data-status = "taskList"></div>`;
    });
    completedTask.forEach((task) => {
        html += `<div class="task done taskL"><span class ="check checked"><img src="/images/icon-check.svg"></span>${task} <img src="/images/icon-cross.svg" class = "cross" data-task-index = "${task}" data-status = "completedList"></div>`;
    });
    document.querySelector('.list').innerHTML = html;
    all.setAttribute('style', 'color: hsl(220, 98%, 61%);');
    active.removeAttribute('style');
    completed.removeAttribute('style');
    taskLeft();
    check();
    uncheck();
    deleteTask();
}

function renderActive(){
    checker = 2;
    let html = "";
    taskList.forEach((task) => {
        html += `<div class="task taskL"><span class ="check not-checked"><img></span>${task} <img src="/images/icon-cross.svg" class = "cross" data-task = "${task}" data-status = "taskList"></div>`;
    });
    document.querySelector('.list').innerHTML = html;
    active.setAttribute('style', 'color: hsl(220, 98%, 61%);');
    all.removeAttribute('style');
    completed.removeAttribute('style');
    taskLeft();
    check();
    deleteTask();
}

function renderCompleted(){
    checker = 3;
    let html = "";
    completedTask.forEach((task) => {
        html += `<div class="task done taskL"><span class ="check checked"><img src="/images/icon-check.svg"></span>${task} <img src="/images/icon-cross.svg" class = "cross" data-task = "${task}" data-status = "completedList"></div>`;
    });
    document.querySelector('.list').innerHTML = html;
    completed.setAttribute('style', 'color: hsl(220, 98%, 61%);');
    active.removeAttribute('style');
    all.removeAttribute('style');
    taskLeft();
    uncheck();
    deleteTask();
}

function clearCompleted(){
    completedTask = [];
    saveToStorage();
    renderTask();
}


let input = document.querySelector('input');

input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' && input.value != ""){
        taskList.unshift(input.value);
        renderList();
        saveToStorage();
        input.value = "";
    }
});

document.querySelector('.clear-completed').addEventListener('click', () => {
    clearCompleted();
});

// Theme Toggle

const theme = document.querySelector('.theme');
theme.addEventListener('click', () => {
    const [file, icon] = theme.getAttribute('src').split('/');
    const newIcon = (icon === "icon-moon.svg") ? "icon-sun.svg" : "icon-moon.svg";
    const newSrc = [file, newIcon].join('/');
    theme.setAttribute('src', newSrc);
    if(newIcon === "icon-moon.svg"){
        document.querySelector('link').setAttribute('href', "styles-light.css");
    }
    else {
        document.querySelector('link').setAttribute('href', "styles-dark.css");
    }
});

renderTask();


