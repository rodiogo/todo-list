// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();
const hourContainer = document.getElementById("hour");

const timezone = () => {
  if (date.getTimezoneOffset() < 0) {
    return `+${date.getTimezoneOffset() / -60}`;
  } else if (date.getTimezoneOffset() > 0) {
    return `${date.getTimezoneOffset() / -60}`;
  }
};
hourContainer.innerHTML = `${hour}:${minute} (UTC ${timezone()})`;

inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; 
  if(userEnteredValue.trim() != 0){ 
    addBtn.classList.add("active"); 
  }else{
    addBtn.classList.remove("active"); 
  }
}

showTasks(); 

addBtn.onclick = ()=>{ 
  let userEnteredValue = inputBox.value; 
  let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorage == null){ 
    listArray = []; 
  }else{
    listArray = JSON.parse(getLocalStorage);  //transforming json string into a js object
  }
  listArray.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); 
}

function showTasks(){
  let getLocalStorage = localStorage.getItem("New Todo");
  if(getLocalStorage == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorage); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active"); 
  }else{
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; 
}

// delete task function
function deleteTask(index){
  let getLocalStorage = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorage);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
}

// delete all tasks 
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
}
