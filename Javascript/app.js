var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    name = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    post = document.getElementById("post"),
    sDate = document.getElementById("sDate")
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isData = false, edited

file.onchange= function() {
    if(file.files[0].size < 1000000) {   //1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e) {
            imgurl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file. alert(message?: any): void)
    }
    else {
        alert("This file is too large!")               
    }
}
