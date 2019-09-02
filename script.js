// select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// hidden class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// add variables
let LIST = [], id = 0;

// get data from local storage
let data = localStorage.getItem("TODO");
// check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last item in the list
    loadList(LIST); //load the list to the user interface
} else {
    // if data is empty
    LIST = [];
    id = 0;
}
// load items to the user interface
function loadList(array) {
    array.forEach((item) => {
        addTodo(item.name, item.id, item.done, item.trash);
    });
}
// clear the locale storage
clear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addTodo(todo, id, done, trash) {
    if (trash) { return; };
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
    <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${todo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
// add an item to the list once a user clicks the enter button
document.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        const todo = input.value;
        // if the input isn't empty
        if (todo) {
            addTodo(todo, id, false, false);
            LIST.push({
                name: todo,
                id: id,
                done: false,
                trash: false
            });
            // add item to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
})

// complete todo
const completeTodo = (element) => {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
// remove todo
const removeTodo = (element) => {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
// add event listeners
list.addEventListener("click", (event) => {
    const element = event.target; // return the clicked element inside the list
    const elementJob = element.attributes.job.value; // complete or delete
    if (elementJob == "complete") {
        completeTodo(element);
    } else if (elementJob == "delete") {
        removeTodo(element);
    }
    // update changes in the local storage
    localStorage.setItem("TODO", JSON.stringify(LIST))
});

