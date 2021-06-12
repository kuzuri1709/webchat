var retrievedUser = JSON.parse(localStorage.getItem("user"));
var retrievedId = localStorage.getItem("userId");
// console.log(retrievedUser);
// console.log(localStorage.getItem("user"));
// console.log(localStorage.getItem("userId"));

localStorage.removeItem("user");
localStorage.removeItem("userId");

var myName = retrievedUser.username;
// for (let i = 0; i = 1;) {
//     if (myName == "") {
//         myName = prompt("Enter your name");
//     } else {
//         i++;
//         break;
//     }
// }


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
// firebase.database().ref("messages").on("child_added", function (snapshot) {
//     var html = `<div class = "chatRow"><p class="messageBox"> 
//       ${snapshot.val().sender}:  ${snapshot.val().message}
//       </p> <span class = "time">${snapshot.val().time}</span></div>`

//     document.getElementById("messages").innerHTML += html;
//     document.getElementById("message").value = "";
//     // updateScroll();
// });

var chat_room_id;
function sendMessageWithId(chat_room_id, message) {
    
    var message = document.getElementById("message").value;
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    if (message != "") {
        firebase.database().ref("ChatRoom/" + chat_room_id).push().set({
            "sender": myName,
            "message": message,
            "time": dateTime
        });
    }

    return false;
}

var usersList = document.getElementById("users_field");
firebase.database().ref("users").on("child_added", function (snapshot) {
    var html = `<div class = "user_box" id = "${snapshot.key}">
    ${snapshot.val().username}</div>`

    usersList.innerHTML += html;

    var list = document.getElementsByClassName("user_box");
    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener('click', () => {
            chat_room_id = list[i].id + retrievedId;
            // console.log(chat_room_id);
            // sendMessageWithId(chat_room_id, message);
        })
    }
});

firebase.database().ref("ChatRoom/" + chat_room_id).on("child_added", function (snapshot) {
    var html = `<div class = "chatRow"><p class="messageBox"> 
      ${snapshot.val().sender}:  ${snapshot.val().message}
      </p> <span class = "time">${snapshot.val().time}</span></div>`

    document.getElementById("messages").innerHTML += html;
    document.getElementById("message").value = "";
    // updateScroll();
});
// {
//     id,
//     username,
//     password,
//     status: ON/OFF
// }