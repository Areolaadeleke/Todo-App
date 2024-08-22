'use strict'
const todoForm = document.querySelector('form')
const todoInput = document.getElementById('todo-input')
const todoListUL = document.getElementById('todo-list')




let allTodos = getTodo();
updateTodoList()

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo()
});


function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text:todoText,
            completed: false
        }

        allTodos.push(todoObject);
        updateTodoList()
        saveTodo()
        todoInput.value= ""
    }
    
}

function updateTodoList(){
    todoListUL.innerHTML ="";
    allTodos.forEach(function(todo,todoIndex){
    const   todoItem = createTodoItem(todo, todoIndex)
        todoListUL.append(todoItem)
    })
}

function createTodoItem(todo,todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLi = document.createElement('li')
    const todoText = todo.text;
    todoLi.classList="todo-text";
    todoLi.innerHTML =`
            <li class="todo">
                <input type="checkbox"  id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                <svg fill="transparent"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${todoId}"  class="todo-text">
                   ${todoText}
                </label>
                <button class="delete-btn">
                    <svg fill="var(--secondry-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>

                </button>
            </li>`


    const deleteBtn =todoLi.querySelector('.delete-btn')
    deleteBtn.addEventListener('click', function(){
        deleteTodoItem(todoIndex)
    })

    const checkbox = todoLi.querySelector('input')
 checkbox.addEventListener("change",function(){
    allTodos[todoIndex].completed = checkbox.checked
    saveTodo()
 })
 checkbox.checked = todo.completed;
    return todoLi
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_,i)=>i !== todoIndex)
    saveTodo()
    updateTodoList()
}

function saveTodo(){
    const allTodosJson = JSON.stringify(allTodos)
    localStorage.setItem("todos", allTodosJson)
}
function getTodo(){
 const todos =  localStorage.getItem("todos") || "[]";
 return JSON.parse(todos)
}