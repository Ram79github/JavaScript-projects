document.addEventListener('DOMContentLoaded',()=>{
const todoInput = document.getElementById("todo-input")
const addTaskButton = document.getElementById("add-task-btn")
const todoList = document.getElementById("todo-list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];   //read previous tasks when domcontent is loaded



tasks.forEach((task) => renderTasks(task)); 



addTaskButton.addEventListener('click' ,function(){
    const taskText = todoInput.value.trim();
    if (taskText === "") return;
    const newtask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }
    tasks.push(newtask)
    saveTasks();
    renderTasks(newtask);
    todoInput.value ="";//clear input
    console.log(tasks);
});
//creating a function to render tasks and add to the list which is created in below function //
function renderTasks(task_one){
    const li= document.createElement("li");
    li.setAttribute('data-id', task_one.id);
    if (task_one.completed) li.classList.add("completed");
    li.innerHTML=`
    <span>${task_one.text}</span>
    <button>delete</button>
    `;
    // here we modify newly creates li when we toggle(means click on new li) it toggle and show task is completed either the value is true or false//
    li.addEventListener('click',(e)=>{
        if(e.target.tagName === "button") return;  
        task_one.completed = !task_one.completed
        li.classList.toggle('completed')
        saveTasks()
    }) 
    li.querySelector("button").addEventListener('click', (e)=>{
        e.stopPropagation(); //prevent toggle from firing or bubbling over the parent
        tasks = tasks.filter((t) => t.id !== task_one.id);
        li.remove();
        saveTasks();
    })
    todoList.appendChild(li);
    
}

function saveTasks(){
     localStorage.setItem("tasks", JSON.stringify(tasks))


}
})