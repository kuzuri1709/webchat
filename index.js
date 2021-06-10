var myName = prompt("Enter your name");
function sendMessage() {
    //get message
    var message = document.getElementById("message").value;
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    //save in database
    if (message != "") {
        firebase.database().ref("messages").push().set({
            "sender": myName,
            "message": message,
            "time": dateTime
        });
    }


    //prevent form from submitting
    return false;
}

//listen for incoming messages
firebase.database().ref("messages").on("child_added", function (snapshot) {
    var html = `<div class = "chatRow"><p class="messageBox"> 
      ${snapshot.val().sender}:  ${snapshot.val().message}
      </p> <span>${snapshot.val().time}</span></div>`

    document.getElementById("messages").innerHTML += html;
    document.getElementById("message").value = "";
    // updateScroll();
});



// var scrolled = false;
// function updateScroll() {
//     if (!scrolled) {
//         var element = document.getElementById("messages");
//         element.scrollTop = element.scrollHeight;
//     }
//     console.log("hahaha");
// }

// document.getElementById("messages").addEventListener("scroll", function () {
//     sccrolled = true;
// })

// const chatroom =firebase.database().ref("chatrooms")
// chatrooms.push().set({
//     "id": 1,
//     "messages":[]
// })