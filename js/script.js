let navContent = document.querySelector("#homepage > nav")
let pageContent = document.querySelector("#pagecontent")
let navBtn = document.querySelector("#navBtn")
let editprofileBtn = document.querySelector("#editprofileBtn")
let savechangeBtn = document.querySelector("#savechangesBtn")
let cancelEdit = document.querySelector("#cancelchangesBtn")
let name = document.querySelector("#name")
let birthday = document.querySelector("#birthday")
let newPicture = document.querySelector("#newPicture")
let PPicture = document.querySelector("#PPicture")
let signupBtn = document.querySelector("#signupBtn")
let loginBtn = document.querySelector("#loginBtn")
let category = document.querySelector("#categorySelect")
let foodCarousel = document.querySelector("#foodCarousel");
let clothesCarousel = document.querySelector("#clothesCarousel");
let suppliesCarousel = document.querySelector("#suppliesCarousel");
let toysCarousel = document.querySelector("#toysCarousel");
let dogCards = document.querySelector("#dogCards")
let addDogBtn = document.querySelector("#addDogBtn")
let dogImg = "";



function toggleNav(){
    if (pageContent.classList.contains("col-md-12")){
        navContent.classList.add("col-md-2");
        pageContent.classList.remove("col-md-12");
        pageContent.classList.add("col-md-10");
        navContent.style.display = "block";
    }
    else if (navContent.classList.contains("col-md-2")){
        navContent.classList.remove("col-md-2");
        pageContent.classList.remove("col-md-10");
        pageContent.classList.add("col-md-12");
        navContent.style.display = "none";
    }
}

function editMode(){
    editprofileBtn.classList.add("d-none");
    savechangeBtn.classList.remove("d-none");
    cancelEdit.classList.remove("d-none");
    name.classList.remove("form-control-plaintext");
    name.classList.add("form-control");
    name.readOnly = false;
    birthday.classList.remove("form-control-plaintext");
    birthday.classList.add("form-control");
    birthday.readOnly = false;
}

function changePPicture(){
    let x = newPicture.value;
    document.getElementById("test").innerHTML = x;
    PPicture.src = x; 
}

function removePPicture(){
    PPicture.src = "../images/removedImg.png";
}



function newUser(event){
    if (document.querySelector("form").checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector("#fillAll").classList.remove("d-none")
    }
    else{
        if (localStorage.getItem("Users")) {
            event.preventDefault();
            users = JSON.parse(localStorage.getItem("Users"));
            let user = {
                id: Date.now(),
                name: document.querySelector("#name").value,
                username: document.querySelector("#username").value,
                email: document.querySelector("#email").value,
                password: document.querySelector("#password").value
            }
            users.push(user);
            document.querySelector("form").reset();
            localStorage.setItem('Users', JSON.stringify(users));   
        }

        else{
            let users = [];
            event.preventDefault();
            let user = {
                id: Date.now(),
                name: document.querySelector("#name").value,
                username: document.querySelector("#username").value,
                email: document.querySelector("#email").value,
                password: document.querySelector("#password").value
            }
            users.push(user);
            document.querySelector("form").reset();
            localStorage.setItem('Users', JSON.stringify(users));
        }
        document.querySelector("#fillAll").classList.add("d-none")
    }
    document.querySelector("#createdAlert").classList.remove("d-none")
    setTimeout(()=>{window.location.assign("../index.html"); } , 1000);
}

function logIn(event){
    event.preventDefault();
    userList = JSON.parse(localStorage.getItem("Users"));
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    userList.find((em)=>{
        if(em.email == email && em.password == password){
            localStorage.setItem('activeUser', JSON.stringify(em))
            window.location.assign("html/home.html");
        }
    })

}

function activeUser(){
    user = JSON.parse(localStorage.getItem("activeUser"));
    document.querySelector("#usernameTag").innerText = user.username;
    document.querySelector("#usernameTag2").innerText = user.username;
    if (editprofileBtn) {
        document.querySelector("#username").value = user.username;
        document.querySelector("#email").value = user.email;
        document.querySelector("#name").value = user.name;
        document.querySelector("#birthday").value = user.birthday;
    }

}

function editProfile(){
    user = JSON.parse(localStorage.getItem("activeUser"));
    user.name = document.querySelector("#name").value;
    user.birthday = document.querySelector("#birthday").value;
    localStorage.setItem('activeUser', JSON.stringify(user));
    document.querySelector("#createdAlert").classList.remove("d-none");
    editprofileBtn.classList.remove("d-none");
    savechangeBtn.classList.add("d-none");
    cancelEdit.classList.add("d-none");
    document.querySelector("#name").readOnly = true;
    document.querySelector("#birthday").readOnly = true;
    name.classList.remove("form-control");
    name.classList.add("form-control-plaintext");
    birthday.classList.remove("form-control");
    birthday.classList.add("form-control-plaintext");
}


/*    HOME PAGE   */

function selectedImg(){
    const reader = new FileReader;
    reader.addEventListener("load", ()=>{
        dogImg = reader.result;
    })
    reader.readAsDataURL(this.files[0]);
}


function addPet(event){
    user = JSON.parse(localStorage.getItem("activeUser"));

    if (document.querySelector("form").checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        console.log("dog")
    }
    else{

        if (localStorage.getItem("Dogs")) {
            event.preventDefault();
            dogs = JSON.parse(localStorage.getItem("Dogs"));
            let dog = {
                ownerId: user.id,
                id: Date.now(),
                name: document.querySelector("#dogName").value,
                breed: document.querySelector("#dogBreed").value,
                age: document.querySelector("#dogAge").value,
                birthday: document.querySelector("#dogBirth").value,
                picture: dogImg
            }
            dogs.push(dog);
            document.querySelector("form").reset();
            localStorage.setItem('Dogs', JSON.stringify(dogs)); 
        }
        else{
            let dogs = [];
            event.preventDefault();
            let dog = {
                ownerId: user.id,
                id: Date.now(),
                name: document.querySelector("#dogName").value,
                breed: document.querySelector("#dogBreed").value,
                age: document.querySelector("#dogAge").value,
                birthday: document.querySelector("#dogBirth").value,
                picture: dogImg
            }
            dogs.push(dog);
            document.querySelector("form").reset();
            localStorage.setItem('Dogs', JSON.stringify(dogs)); 
        }
        location.reload();
    }
    

}


function dogInfo(){
    user = JSON.parse(localStorage.getItem("activeUser"));
    dogList = JSON.parse(localStorage.getItem("Dogs"));

    dogList.forEach( dog =>{
        if(dog.ownerId == user.id){
            dogCards.innerHTML += 
            `<button class="btn dogBtn" data-toggle="modal" data-target="#dogInfo" >
                <img  class="img-fluid border border-dark rounded" width="250" height="250" src="${dog.picture}" alt="">
                <span class="h4">${dog.name}</span>
            </button>`;
            
            document.querySelector("#dogInfo").innerHTML +=
                `<div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-info text-white">
                            <h4 class="modal-title" id="addTitle">Your pet's information</h4>
                            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="dogNameIn" class="col-form-label">Name:</label>
                                    <input type="text"  readonly class="form-control-plaintext" name="" value = "${dog.name}">
                                </div>
                                <div class="form-group">
                                    <label for="dogBreedIn" class="col-form-label">Breed:</label>
                                    <input type="text"  readonly class="form-control-plaintext" name="" value = "${dog.breed}">
                                </div>
                                <div class="form-group">
                                    <label for="dogAgeIn" class="col-form-label">Age:</label>
                                    <input type="text"  readonly class="form-control-plaintext" name="" value = "${dog.age}">
                                </div>
                                <div class="form-group">
                                    <label for="dogBirthIn" class="col-form-label">Birthday:</label>
                                    <input type="date"  readonly class="form-control-plaintext" name="" value = "${dog.birthday}">
                                </div>
                            </form>
                        </div>
                        <div class="py-3 text-center border-top">
                            <button type="button" class="btn btn-success px-3" id="testBtn">Edit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>`
        }
  
        
    })

}
/*    HOME PAGE END   */


/*    STORE PAGE      */
function selectedCategory(){
    if(category.value == "food"){
        foodCarousel.classList.remove("d-none");
        clothesCarousel.classList.add("d-none");
        suppliesCarousel.classList.add("d-none");
        toysCarousel.classList.add("d-none");
    }
    else if (category.value == "clothes") {
        clothesCarousel.classList.remove("d-none");
        foodCarousel.classList.add("d-none");
        suppliesCarousel.classList.add("d-none");
        toysCarousel.classList.add("d-none");
    }
    else if (category.value == "bath") {
        suppliesCarousel.classList.remove("d-none");
        clothesCarousel.classList.add("d-none");
        foodCarousel.classList.add("d-none");
        toysCarousel.classList.add("d-none");
    }
    else if (category.value == "toys") {
        toysCarousel.classList.remove("d-none");
        clothesCarousel.classList.add("d-none");
        suppliesCarousel.classList.add("d-none");
        foodCarousel.classList.add("d-none");
    }
    else{
        foodCarousel.classList.remove("d-none");
        clothesCarousel.classList.remove("d-none");
        suppliesCarousel.classList.remove("d-none");
        toysCarousel.classList.remove("d-none");
    }
}

/*  STORE PAGE END   */




if (signupBtn) {
    document.addEventListener('DOMContentLoaded', ()=>{
        signupBtn.addEventListener("click", newUser);
    })
}

if (loginBtn) {
    document.addEventListener('DOMContentLoaded', ()=>{
        loginBtn.addEventListener("click", logIn);
    })
}


if (savechangeBtn) {
    document.addEventListener('DOMContentLoaded', ()=>{
        savechangeBtn.addEventListener("click", editProfile);
    })
}

if (dogCards) {
    document.addEventListener('DOMContentLoaded', ()=>{
        addDogBtn.addEventListener("click", addPet);
        document.querySelector("#dogPicture").addEventListener("change", selectedImg);
        

    })
    
}

