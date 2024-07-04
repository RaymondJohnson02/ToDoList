let toDoMenuSelected = '';
let toDoList = [];

init();

function init(){
    resetToDoForm();
    resetToDoView();

    document.querySelector('#toDoSubmitBtn').addEventListener('click', addNewToDo);

    document.getElementById('toDoViewAll').getElementsByTagName('button')[0].addEventListener('click', selectToDoViewAll);
    document.getElementById('toDoViewDone').getElementsByTagName('button')[0].addEventListener('click', selectToDoViewDone);
    document.getElementById('toDoViewOverdue').getElementsByTagName('button')[0].addEventListener('click', selectToDoViewOverdue);
    document.getElementById('toDoDeleteAllBtn').addEventListener('click', deleteAllToDo);
    document.getElementById('profile').addEventListener('click', setProfile);
    selectToDoViewAll();
    setProfile();
}

function setProfile(){
    let name = prompt("Please enter your name", "Raymond Johnson");
    let jobtitle = prompt("Please enter your job title", "Student");
    document.getElementById('userName').innerText = (name)? name : 'Name';
    document.getElementById('userJobTitle').innerText = (jobtitle)? jobtitle : 'JobTitle';
}

// function seedToDoListDummy(){
//     let dummy = [
//         {
//             priority : 'High',
//             date : '2024-07-07',
//             description : 'Learn React Hooks',
//             done : false
//         },
//         {
//             priority : 'Medium',
//             date : '2024-07-03',
//             description : 'Learn Tailwind CSS',
//             done : true
//         }
//     ];
//     for(let i = 0; i < dummy.length; i++){
//         toDoList.push(dummy[i]);
//     }
// }

function resetToDoView(){
    let toDoViewAll = document.getElementById('toDoViewAll');
    let toDoViewDone = document.getElementById('toDoViewDone');
    let toDoViewOverdue = document.getElementById('toDoViewOverdue');

    let toDoViewAllText = toDoViewAll.getElementsByTagName('button')[0];
    let toDoViewDoneText = toDoViewDone.getElementsByTagName('button')[0];
    let toDoViewOverdueText = toDoViewOverdue.getElementsByTagName('button')[0];


    toDoViewAll.classList.remove('border-blue-500');
    toDoViewAllText.classList.remove('text-blue-400');

    toDoViewDone.classList.remove('border-blue-500');
    toDoViewDoneText.classList.remove('text-blue-400');

    toDoViewOverdue.classList.remove('border-blue-500');
    toDoViewOverdueText.classList.remove('text-blue-400');
}

function resetToDoForm(){
    let toDoDate = document.getElementById('toDoDate');
    let toDoPriority = document.getElementById('toDoPriority');
    let toDoDesc = document.getElementById('toDoDesc');

    let currDate = new Date();
    let strCurrDate = currDate.toISOString();
    let dateStr = strCurrDate.substring(0, strCurrDate.indexOf('T'));

    toDoDate.value = dateStr;
    toDoPriority.value = 'Low';
    toDoDesc.value = '';
}

function selectToDoViewAll(){
    toDoMenuSelected = 'all';
    toDoViewChange();
}

function selectToDoViewOverdue(){
    toDoMenuSelected = 'overdue';
    toDoViewChange();
}

function selectToDoViewDone(){
    toDoMenuSelected = 'done';
    toDoViewChange();
}

function toDoViewChange(){
    resetToDoView();
    let toDoViewAll = document.getElementById('toDoViewAll');
    let toDoViewDone = document.getElementById('toDoViewDone');
    let toDoViewOverdue = document.getElementById('toDoViewOverdue');

    let toDoViewAllText = toDoViewAll.getElementsByTagName('button')[0];
    let toDoViewDoneText = toDoViewDone.getElementsByTagName('button')[0];
    let toDoViewOverdueText = toDoViewOverdue.getElementsByTagName('button')[0];


    switch(toDoMenuSelected){
        case 'all':
            toDoViewAll.classList.add('border-blue-500');
            toDoViewAllText.classList.add('text-blue-400');
            break;
        case 'done':
            toDoViewDone.classList.add('border-blue-500');
            toDoViewDoneText.classList.add('text-blue-400');
            break;
        case 'overdue':
            toDoViewOverdue.classList.add('border-blue-500');
            toDoViewOverdueText.classList.add('text-blue-400');
            break;
        default:
            break;
    }
    displayToDoList();
}

function addNewToDo(){
    let toDoDate = document.getElementById('toDoDate');
    let toDoPriority = document.getElementById('toDoPriority');
    let toDoDesc = document.getElementById('toDoDesc');

    if(!toDoDesc.value){
        alert('Please fill to do description.');
        return;
    }

    let newTask = {
        priority : toDoPriority.value,
        date : toDoDate.value,
        description : toDoDesc.value,
        done : false
    }
    toDoList.push(newTask);

    alert('New Task Added!');
    resetToDoForm();
    displayToDoList();
}

function compareDate(a, b){
    // return true if a is later than b
    return new Date(a) > new Date(b);
}

function displayToDoList(){
    let toDoListDiv = document.getElementById('toDoList');
    toDoListDiv.innerHTML = '';

    let taskList = [];
    switch(toDoMenuSelected){
        case 'all':
            taskList = toDoList.filter((t) => !t.done);
            break;
        case 'done':
            taskList = toDoList.filter((t) => t.done);
            break;
        case 'overdue':
            let currDate = new Date().toISOString();
            currDate = currDate.substring(0, currDate.indexOf('T'));
            taskList = toDoList.filter((t) => !compareDate(t.date, currDate));
            break;
        default:
            break;
    }

    for(let toDo of taskList){
        // console.log(toDo);
        let date = new Date(toDo.date);

        let toDoRow = '<div class="h-16 w-full border border-gray-300 rounded mb-3 flex items-center">'
            + '<div class="w-1/8 px-8">'
                + '<input type="checkbox" ' + (toDo.done ? 'checked' : '') + ' onchange="toDoDone(this, ' + toDoList.indexOf(toDo) + ')">'
            + '</div>'
            + '<div class="w-1/4 pe-4">'
                + '<p class="toDoRowPriority">' + toDo.priority + ' Priority</p>'
            + '</div>'
            + '<div class="w-1/2 pe-4 text-nowrap overflow-hidden toDoRowDesc '+ (toDo.done ? 'line-through' : '')  + '">'
                + toDo.description
             + '</div>'
             + '<div class="w-1/8 px-4">'
                + '<p class="toDoRowDate">' + date.toDateString() + '</p>'
            + '</div>'
        + '</div>';
        toDoListDiv.innerHTML += toDoRow;
    }
}

function toDoDone(checkbox, index){
    toDoList[index].done = checkbox.checked;
    displayToDoList();
}

function deleteAllToDo(){
    toDoList = [];
    alert('All Task Deleted!');
    displayToDoList();
}