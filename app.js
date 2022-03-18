// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.querySelector("#grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list  = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");


// edit option
let editElement;
let editFlag = false;
let editID = "";


// ****** EVENT LISTENERS **********
//  load local storage


// *****submit form*****
form.addEventListener("submit", addItem)

//***clear button to clear all items */
clearBtn.addEventListener("click", removeItems)

window.addEventListener("DOMContentLoaded",loadItems)



// ****** FUNCTIONS **********
function createItems(id, value){
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    const attr = document.createAttribute("data-id")
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = ` <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`

    // delete and edit buttons
    const deleteButton = element.querySelector(".delete-btn");
    const editButton = element.querySelector(".edit-btn");
    deleteButton.addEventListener("click", deleteItem);
    editButton.addEventListener("click", editItem);
    //  append child
    list.appendChild(element);
    // show container
  
}


function loadItems(){
    let items = getLocalStorage();
    items.forEach(item=>{
       createItems(item.id, item.value);

    })
    container.classList.add("show-container");
}

//add item to list 
function addItem(event){
    event.preventDefault();
    console.log(editID);
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if(value && !editFlag){
        createItems(id,value);
        // show container
        container.classList.add("show-container");
        //  display alert
        displayAlert("Item added", "success")
        // add to local storage
        addToLocalStorage(id, value);
        //  set back to default
        setBackToDefault();
        

    }else if(value && editFlag){
        editElement.innerText = value;
        displayAlert("item edited", "success");
        // edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    }else{
        displayAlert("Please type an item", "danger");
        setBackToDefault();
    }
   
}

//  display alert
function displayAlert(text, alertType){
    alert.innerText = text;
    alert.classList.add(`alert-${alertType}`);

    //  remove alert
    setTimeout(function(){
        alert.innerText = "";
        alert.classList.remove(`alert-${alertType}`)
    }, 2000)
}

//  delete single item
function deleteItem(event){
   const item = event.currentTarget.parentElement.parentElement;
   const id = item.dataset.id;
  list.removeChild(item);
  
  if(list.children.length === 0){
      container.classList.remove("show-container");   
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  //  remove from local storage
  removeFromLocalStorage(id);
}
//  edit item
function editItem(event){
    const item = event.currentTarget.parentElement.parentElement;
    const id = item.dataset.id;
    editID = id;
    editElement = event.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerText;
    editFlag = true;
    submitBtn.innerText = "edit";

    
   
}
//  set back to default
function setBackToDefault(){
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "add";
}

//  remove items
function removeItems(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length>0){
        items.forEach(item =>{
            list.removeChild(item);
        })

        localStorage.removeItem("list");
           
    }
    container.classList.remove("show-container");
    displayAlert("list was cleared", "danger")
    setBackToDefault();
    //localStorage.removeItem();
    
}

// ****** LOCAL STORAGE **********
//  add to local storage
function addToLocalStorage(id, value){
    
    const item = {id, value};
    let items = getLocalStorage();
    // console.log(items); // how does it print with items ?
    items.push(item);
    localStorage.setItem("list", JSON.stringify(items));
    
   
}
function removeFromLocalStorage(id){

    let items = getLocalStorage();
    items = items.filter((item)=>{
        if(item.id !== id){
            return item
        }
        // localStorage.setItem("list", JSON.stringify(items)) burda olunca noluyor?
        // anlamadım
    })
    localStorage.setItem("list", JSON.stringify(items))

   
}
//  get local storage
function getLocalStorage(){
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")):[]
}
//  edit local storage
function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(item=>{
        if(item.id === id){
            item.value = value;
            return item;
        }else{
            return item
        }
    })
    localStorage.setItem("list", JSON.stringify(items));


}










// ****** SETUP ITEMS **********
