let email = document.querySelector('[name="E-mail"]');
let password = document.querySelector('[name="password"]');	
let rule_email = /^([A-Za-z0-9])+([A-Za-z0-9\-\.])*[A-Za-z0-9]+@{1}([A-Za-z0-9])+([A-Za-z0-9\-\.])*\.([A-Za-z])+$/;
let rule_password = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}/g;
let myModal = document.getElementById('myModal');
let ok = document.getElementById("btn-ok");
let cancel = document.getElementById("btn-cancel");

document.querySelector('.form').addEventListener('submit', function (e) {  	

  if (email.value !== "" && password.value !== "") {
    myModal.style.display = rule_email.test(email.value) && rule_password.test(password.value) ? window.location = "../JS HW/jsTodo/index.html" : "block";
  };   
  e.preventDefault();  
  
});

ok.onclick = function () {
  myModal.style.display = "none"  
};
cancel.onclick = function() {
  myModal.style.display = "none"
};
