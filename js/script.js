let navContent = document.querySelector("#homepage > nav")
let pageContent = document.querySelector("#pagecontent")
let navBtn = document.querySelector("#navBtn")


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

