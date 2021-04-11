var email 
var username 
var password 
var submit = document.getElementById("submit-btn");
function User(email, password, username){
    this.email = email
    this.password = password
    this.username = username
}
function getUserInfo(){
    email = document.getElementById("email").value;
    username = document.getElementById("username").value;
    password = document.getElementById("pwd").value;
    return user = new User(email, password, username)
}
