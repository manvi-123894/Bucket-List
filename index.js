const input = document.querySelector("#todo-container input");
const addBtn = document.querySelector(".add");
const todoItems = document.querySelector(".todo-items");
const mainList = document.querySelector(".todo-list");
const form = document.querySelector("#form");
const doneBtn = document.querySelector(".fa-check");
const dltBtn = document.querySelector(".fa-trash-alt");
const newItem= document.querySelectorAll(".new");
const congrats = document.querySelector(".congratulation");
const select = document.querySelector("#select select");


let editableItem;



addBtn.addEventListener("click",function(e){
    select.value = "all";
    if(input.value){
    createItem();
    } 
});

form.addEventListener("submit",function(e){
    select.value = "all";
    e.preventDefault();
    if(input.value){
        createItem();
        } 
});




mainList.addEventListener("click",function(e){

    select.value = "all";

    if(e.target && (e.target.getAttribute("id")=="comp")){
        addComplete(e.target);
    }

    else if(e.target && (e.target.getAttribute("id")=="dlt")){
        deleteItem(e.target);
    }
    
})

select.addEventListener("change",function(e){
    selectChange(e);
});

let items = [];
let inputValue;
let arr = [];
let completeArray = [];
let bucketArray = [];

function createItem(){
    inputValue = input.value;
    form.reset();
    items.push({
        value : inputValue,
        status : "bucket"
    });
  
    localStorage.setItem('todo',JSON.stringify(items));
    fetchData();
}


function fetchData(){
    if(localStorage.getItem('todo')){
        items = JSON.parse(localStorage.getItem('todo'));
       
    }else{
        completeArray = [];
        bucketArray = [];
        items = [];
        arr = [];
        array = [];
    }

    updateDom(items);
    
}

function updateDom(array){
        arr = array.map(function(item){
           return    ` <li class="single-item">
                <input type="text" value="${item.value}" class="new" disabled/>
                <div class="btn-class"> 
                <i class="fas fa-check" id="comp"></i>
                <i class="fas fa-trash-alt" id="dlt"></i>
                </div>
            </li>`;
     
        });


       arr = arr.join("");
       mainList.innerHTML = arr;

}


function deleteItem(target){


    items.forEach(function(item,i){
       

        if(target.parentElement.parentElement.childNodes[1].value== item.value){  
        
            items.splice(i,1);
        }
    })

    localStorage.setItem('todo',JSON.stringify(items));
    fetchData();
}


function addComplete(target){

    items.forEach(function(item,i){
        if(target.parentElement.parentElement.childNodes[1].value == item.value){
          
            item.status = "complete";

            setTimeout( () => {
                congrats.style.display = "flex";
            },500);

            setTimeout( () =>{
                congrats.style.display = "none";
            },5000);
        }
    })

    localStorage.setItem('todo',JSON.stringify(items));
    fetchData();
}


function selectChange(event){

    completeArray = [];
    bucketArray = [];

      if(event.target.value == "complete"){
       items.forEach(function(item){
            if(item.status == "complete"){
                completeArray.push(item);
            }
        })
    
        updateDom(completeArray);
      }
      else if(event.target.value == "bucket"){
          items.forEach(function(item){
              if(item.status == "bucket"){
                  bucketArray.push(item);
              }
          })

          updateDom(bucketArray);
      }
      else if(event.target.value == "all"){
          updateDom(items);
      }
}


fetchData();