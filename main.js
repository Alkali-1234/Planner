

console.log("JavaScript successfully loaded!");

const col1 = document.getElementById('col1');
const submitButton = document.getElementById('submit-button');
let data = localStorage.getItem('tasks');
const inserttask = document.getElementById('inserttask');
const duedate = document.getElementById('due');
const getDueDate = (task) =>{
    if(localStorage.getItem(task)){
        return localStorage.getItem(task);
    }else{
        return false;
    }
};
let status = null;
console.log(data);
if(data){
    let tasks = localStorage.getItem('tasks').split(',');

    for (let i = 0; i < tasks.length; i++) {
        const day = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const combine = [day, month, year];
        const dayNowr = combine.join('/');
        const dayNow = new Date();
        console.log(dayNow);
        const date = new Date().toLocaleDateString('en-US');
        const tasksLIST = localStorage.getItem('tasks').split(',');
        const dueedateSTR = getDueDate(tasksLIST[i]);
        console.log(dueedateSTR);
        const dueDateA = new Date(dueedateSTR);
        const dueDate = new Date(dueDateA);
        let difference = dueDateA.getTime() - dayNow.getTime();
        let daysUntilDue = difference/(1000 * 3600 * 24);
        console.log(dueDateA.getTime() - dayNow.getTime());
        console.log(dayNow.getTime());
        console.log(difference);
        console.log(dueDateA.getTime());
        console.log(daysUntilDue);
        console.log(dayNow);
        console.log(dueDate);

        let status = 'bg-success';
        
        let duedateArray = localStorage.getItem('tasks').split(',');
        
        const card = `
        <div class="card ${status} mt-3">
            <div class="card-body cards">
                <h5>${tasks[i]}</h5>
                <h5>Due date: ${getDueDate(duedateArray[i])}</h5>
                <button class="btn btn-primary donebutton" type="submit">Done</button>
            </div>
        </div>
        `
       col1.insertAdjacentHTML('beforeend', card);     
    }
}else{
    let list = ['test', 'test2'];
    localStorage.setItem('tasks', list);
}

console.log(localStorage.getItem('tasks'));

let donebutton = document.querySelectorAll('.donebutton');
donebutton.forEach(element => {
    element.addEventListener('click', function(){
        let sibling = element.previousElementSibling.previousElementSibling;
        localStorage.removeItem(sibling.innerHTML);
        console.log(sibling.innerHTML);
        let tasks = localStorage.getItem('tasks').split(',');
        let indexval = tasks.indexOf(sibling.innerHTML);
        console.log(indexval);
        tasks.splice(indexval, 1);
        localStorage.setItem('tasks', tasks);
        console.log('Removal success.');
        alert('Removed successfully. Please reload the page');
    });
})

submitButton.addEventListener('click', function(){
    if(localStorage.getItem(inserttask.value)){
        alert('This name already exists!');
        return;
    }else if(inserttask.value == null || inserttask.value === ''){
        alert('The name is empty!');
        return;
    }else if(duedate == null || duedate == ''){
        alert('The due date is empty!');
        return;
    }
    localStorage.setItem(inserttask.value, duedate.value);
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const combine = [day, month, year];
    const dayNowr = combine.join('/');
    const dayNow = new Date();
    console.log(dayNow);
    const date = new Date().toLocaleDateString('en-US');
    const dueeDate = new Date(duedate.value);
    let difference = dueeDate.getTime() - dayNow.getTime();
    let daysUntilDue = difference/(1000 * 3600 * 24);
    // console.log(dueDateA.getTime() - dayNow.getTime());
    // console.log(dayNow.getTime());
    // console.log(difference);
    // console.log(dueDateA.getTime());
    // console.log(daysUntilDue);
    // console.log(dayNow);
    // console.log(dueDate);

    let status = null;
    if(daysUntilDue <= 7 && daysUntilDue > 2){
        status = 'bg-warning';
    }else if(daysUntilDue <= 2 && daysUntilDue > 0){
        status = 'bg-danger';
    }else if(daysUntilDue < 0){
        status = 'bg-light';
    }else{
        status = 'bg-success';
    }
    let tasks = localStorage.getItem('tasks');
    let tasksList = tasks.split(',');
    tasksList.push(inserttask.value);
    localStorage.setItem('tasks', tasksList);
    const card = `
        <div class="card ${status} mt-3">
            <div class="card-body cards">
                <h5>${inserttask.value}</h5>
                <h5>Due date: ${duedate.value}</h5>
                <button class="btn btn-primary donebutton" type="submit">Done</button>
            </div>
        </div>
        `
    localStorage.setItem(inserttask.value, duedate.value);
    col1.insertAdjacentHTML('beforeend', card);
    console.log(localStorage.getItem(inserttask.value));
})

