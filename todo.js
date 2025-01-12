const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(event) {
    const div = event.target.closest("div");
    div.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(div.id));
    saveToDos();
}

function getRandomPosition(containerWidth, containerHeight, elementWidth, elementHeight) {
    const maxX = containerWidth - elementWidth;  
    const maxY = containerHeight - elementHeight;
    const randomX = Math.random() * (maxX - 20) + 10; 
    const randomY = Math.random() * (maxY - 20) + 10; 

    return { x: randomX, y: randomY };
}

function paintToDo(newTodo) {
    const div = document.createElement("div");
    div.id = newTodo.id;
    div.draggable = true;
    div.classList.add("draggable");

    const span = document.createElement("span");
    span.innerText = newTodo.text;

    const button = document.createElement("button");
    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-times"); 
    button.appendChild(icon);  
    button.addEventListener("click", deleteToDo); 

    div.appendChild(span);
    div.appendChild(button);
    toDoList.appendChild(div);

    const containerWidth = window.innerWidth; 
    const containerHeight = window.innerHeight; 
    const elementWidth = 150;  
    const elementHeight = 150;

    const { x, y } = newTodo.position || getRandomPosition(containerWidth, containerHeight, elementWidth, elementHeight);

    div.style.position = "absolute";
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;

    div.addEventListener("mousedown", handleMouseDown);

    newTodo.position = { x, y };
    saveToDos();
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value= "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}


let currentDraggedElement = null;
let shiftX = 0;
let shiftY = 0;


function handleMouseDown(event) {
    currentDraggedElement = event.currentTarget;

    const rect = currentDraggedElement.getBoundingClientRect();
    shiftX = event.clientX - rect.left;
    shiftY = event.clientY - rect.top;

    currentDraggedElement.style.zIndex = 1000;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
}


function onMouseMove(event) {
    if (!currentDraggedElement) return;

    currentDraggedElement.style.left = event.pageX - shiftX + "px";
    currentDraggedElement.style.top = event.pageY - shiftY + "px";
}

function handleMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    const rect = currentDraggedElement.getBoundingClientRect();
    const newPos = { x: rect.left, y: rect.top };
    currentDraggedElement.style.zIndex = "";
    const todo = toDos.find(todo => todo.id == currentDraggedElement.id);
    todo.position = newPos;
    saveToDos();

    currentDraggedElement = null;
}


document.addEventListener("dragstart", (event) => {
    event.preventDefault();
});


toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);


if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);  
}

