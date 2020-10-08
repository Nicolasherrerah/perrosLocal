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
let addCartBtn = document.querySelector("#addCartBtn");
let dogCards = document.querySelector("#dogCards")
let addDogBtn = document.querySelector("#addDogBtn")
let appoCards = document.querySelector("#appoCards")
let pets = document.querySelector("#pets")
let newAppoBtn = document.querySelector("#newAppoBtn")
let addAppoBtn = document.querySelector("#addAppoBtn")
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

    dogList.forEach(dog =>{
        if(dog.ownerId == user.id){
            dogCards.innerHTML += 
            `<button class="btn dogBtn" data-toggle="modal" data-target="#dogInfo" >
                <img  class="img-fluid border border-dark rounded" width="250" height="250" src="${dog.picture}" alt="">
                <span class="h4">${dog.name}</span>
            </button>`;   
        }    
    })
}

function dogModal(){
    dogList = JSON.parse(localStorage.getItem("Dogs")); 
    let dogCardList = document.querySelectorAll(".dogBtn");

    dogCardList.forEach(dogCard =>{
        dogList.forEach(dog =>{
            dogCard.addEventListener("click", ()=>{
                if(dog.name == dogCard.innerText){
                    document.querySelector("#dogInfo").innerHTML =
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
            
            })
        })
        
}




/*    HOME PAGE END   */



/*    APPOINTMENT PAGE   */
function petSelect(){
    user = JSON.parse(localStorage.getItem("activeUser"));
    dogList = JSON.parse(localStorage.getItem("Dogs"));
    dogList.forEach( dog =>{
        if(dog.ownerId == user.id){
            pets.innerHTML += 
            `<option value="${dog.name}">${dog.name}</option>`;
        }
    })
}


function addAppointment(event){
    user = JSON.parse(localStorage.getItem("activeUser"));

    if (document.querySelector("form").checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();

    }
    else{

        if (localStorage.getItem("Appointments")) {
            event.preventDefault();
            appointments = JSON.parse(localStorage.getItem("Appointments"));
            let appointment = {
                userId: user.id,
                id: Date.now(),
                pet: document.querySelector("#pets").value,
                purpose: document.querySelector("#purpose").value,
                date: document.querySelector("#appointmentDate").value

            }
            appointments.push(appointment);
            document.querySelector("form").reset();
            localStorage.setItem('Appointments', JSON.stringify(appointments)); 
        }
        else{
            let appointments = [];
            event.preventDefault();
            let appointment = {
                userId: user.id,
                id: Date.now(),
                pet: document.querySelector("#pets").value,
                purpose: document.querySelector("#purpose").value,
                date: document.querySelector("#appointmentDate").value
            }
            appointments.push(appointment);
            document.querySelector("form").reset();
            localStorage.setItem('Appointments', JSON.stringify(appointments)); 
        }
        location.reload();
    }
    

}


function appoinmentInfo(){
    user = JSON.parse(localStorage.getItem("activeUser"));
    Appointments = JSON.parse(localStorage.getItem("Appointments"));
    let date = new Date()
    const month = date.toLocaleString('en-US', { month: 'long' });
    document.querySelector("#calendarMonth").innerHTML = month.charAt(0).toUpperCase() + month.substr(1).toLowerCase()
    Appointments.forEach( appo =>{
        if(appo.userId == user.id){
            appoCards.innerHTML += 
            `<div class="card m-3 my-4 d-inline-block" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${appo.purpose}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${appo.pet}</h6>
                <input readonly class="d-block my-2"type="date" name="" value="${appo.date}">
                <a href="#" class="btn btn-secondary btn-sm card-link px-3">Edit</a>
                <a href="#" class="btn btn-danger btn-sm card-link ">Cancel</a>
                </div>
            </div>`;  
            let days = document.querySelectorAll("td");
            let appoDays = appo.date.slice(-2)
            days.forEach(day =>{
                if(day.innerText == date.getDate()){
                    day.style.backgroundColor = "lightblue";
                }

                if(appoDays.charAt(0) == 0){
                       appoDays = appoDays.slice(-1);
                }

                if(day.innerText == appoDays){
                    day.style.backgroundColor = "lightgray";
                }

                
            })
        
        }
    })


}

/*    APPOINTMENT PAGE END  */


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


function addToCart(){
    let products = document.querySelectorAll(".store-product");
    
    products.forEach(product =>{
        product.addEventListener("click", ()=>{
            productName = ((product.innerText).trim()).split("-");
            productPrice = (productName[1]).trim();
            let category = (product.closest(".carousel")).firstElementChild.innerText;
            document.querySelector("#productInfo").innerHTML = 
            `<div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header ">
                        <img class="d-inline-block mr-3" width="73" height="83" src="../images/testshop.png" alt="">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <form class="col-md">
                                    <div class="form-group ">
                                        <p class="h2 py-3">${category}</p>
                                        <br>
                                        <p class="h3 font-weight-normal">${productName[0]}</p>
                                        <p class="h2 font-weight-normal py-3">${productPrice}</p>
                                        <br><br>
                                        <label class="h4 text-muted" for="quantity">Quantity: </label>
                                        <select class="h5" name="" id="quantity">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </form>
                                <img src="../images/product.png" alt="" class="m-auto col-md" >
                            </div>
                        </div>
                    </div>
                    <div class="text-center border py-4">
                        <button type="button" class="btn btn-primary mr-3" id="addCartBtn"><span class="h5">Add to cart</span></button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal"><span class="h5">Cancel</span></button>
                    </div>
                </div>
            </div>`

        })
        
                            
    })
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

if (appoCards) {
    document.addEventListener('DOMContentLoaded', ()=>{
        newAppoBtn.addEventListener("click", petSelect);
        addAppoBtn.addEventListener("click", addAppointment);
    })
}
