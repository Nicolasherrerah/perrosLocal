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