var btnSignIn = document.getElementById("Sign");
var users = db.collection("users");
btnSignIn.addEventListener("click", function (e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("pwd").value;

    users.where("username", "==", username).get().then((querySnapshot) => {
        // console.log(querySnapshot);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            if (username == doc.data().username && password == doc.data().password) {
                // console.log("true");
                var user = doc.data();
                localStorage.setItem("user", JSON.stringify(user))
                window.location.href = "./index.html";
            } else {
                alert("Failed");
            }
        })
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
});