// JS for login page

// Get username and password from form
function getLoginInfo() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    return [username, password];
}

// Send username and password to server
function sendLoginInfo() {
    console.log("sendLoginInfo() called");
    var loginInfo = getLoginInfo();
    var username = loginInfo[0];
    var password = loginInfo[1];

    // Create a JSON object with the user data
    var userData = JSON.stringify({
        user_name: username,
        user_password: password
    });

    alert(userData);


    // Send a POST request using Fetch
    fetch("/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: userData,
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Network response was not ok");
        }
    })
    .then(data => {
        // console.log(data);
        // alert(data.token);
        // Redirect to homepage
        window.location.replace("/protected");
    })
    .then(() => {
        alert("Login successful");
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}


// Function to always check the username field. If it doesn't contain "@mail.ugm.ac.id", disable the login button
function checkUsername() {
    console.log("checkUsername() called");
    // Get the value inside the username field
    var username = document.getElementById("username").value;
    var loginButton = document.getElementById("login-button");
    if (username && username.includes("@mail.ugm.ac.id")) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded");
    // checkUsername();

    // Add event listener to username field
    // var usernameField = document.getElementById("username");
    // usernameField.addEventListener("input", checkUsername);

    // Add event listener to login button
    var loginButton = document.getElementById("login-button");
    // loginButton.addEventListener("click", sendLoginInfo);
    // add preventDefault() to loginButton
    loginButton.addEventListener("click", function (e) {
        e.preventDefault();

        sendLoginInfo();
    });
}
);