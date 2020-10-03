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

function activeUser(){
    user = JSON.parse(localStorage.getItem("activeUser"));
    document.querySelector("#usernameTag").innerText = user.username;
    document.querySelector("#usernameTag2").innerText = user.username;
}