let from = document.querySelector("#myForm");
let nm = document.querySelectorAll("#name");
let email = document.querySelector("#email");
let pass = document.querySelector("#password")
let terms = document.querySelector("#terms")

from.addEventListener("submit",(e)=>{
  e.preventDefault();
  let isValid = true; 
 // Name validation 
 if (nm.length >= 3) {
    document.querySelector("#nameError").innerHTML = "Name must be at least 3 characters";
    isValid = false; 
 }
 //emailvalidation
 let regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
 if (!email.match(regex)) {
    document.querySelector("#emailError").innerHTML= "Enter valid email";
    isValid= false;
 }
 //password validation
 let passRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
 if (!pass.match(passRegex)) {
    document.querySelector("#passError").innerHTML= "Password must contain 8 chars, 1 number, 1 uppercase";
    isValid = false;
 }
 // check terms
 if(!terms){
    document.querySelector("#termsError").innerHTML = "You must accept terms";
    isValid = false ;
 }
 if(isValid){
     let alert = document.getElementById("successMsg").innerHTML="Form Submitted Successfully!"
     console.log(alert)
    }

    
})