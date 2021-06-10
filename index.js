var myName = prompt("Enter your name");
function sendMessage() {

    //get message
    var message = document.getElementById("message").value;

    //save in database
    firebase.database().ref("messages").push().set({
        "sender": myName,
        "message": message,
    });

    //prevent form from submitting
    return false;
}

//listen for incoming messages
firebase.database().ref("messages").on("child_added", function (snapshot) {
    var html = `<div class = "chatRow"><p class="messageBox"> 
      ${snapshot.val().sender}:  ${snapshot.val().message}
      </p></div>`

    document.getElementById("messages").innerHTML += html;
    document.getElementById("message").value = "";
    updateScroll();
});



var scrolled = false;
function updateScroll() {
    if (!scrolled) {
        var element = document.getElementById("messages");
        element.scrollTop = element.scrollHeight;
    }
    console.log("hahaha");
}

document.getElementById("messages").addEventListener("scroll", function () {
    sccrolled = true;
})