var btnSignIn = document.getElementById("Sign");
var users = db.collection("users");
btnSignIn.addEventListener("click", function () {
    let username = document.getElementById("username").value;
    let password = document.getElementById("pwd").value;

    users.where("username", "==", username).get().then((querySnapshot) => {
        
    })
});