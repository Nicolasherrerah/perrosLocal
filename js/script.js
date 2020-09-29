let navContent = document.querySelector("#homepage > nav")
let pageContent = document.querySelector("#pagecontent")
let navBtn = document.querySelector("#navBtn")


function toggleNav(){
    if (pageContent.classList.contains("col-sm-12")){
        navContent.classList.add("col-sm-2");
        pageContent.classList.remove("col-sm-12");
        pageContent.classList.add("col-sm-10");
        navContent.style.display = "block";
    }
    else if (navContent.classList.contains("col-sm-2")){
        navContent.classList.remove("col-sm-2");
        pageContent.classList.remove("col-sm-10");
        pageContent.classList.add("col-sm-12");
        navContent.style.display = "none";
    }
}