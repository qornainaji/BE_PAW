// JS for login page

// Get username and password from form
function getLoginInfo() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    return [username, password];
}

// Send login info to server
function sendLoginInfo() {
    console.log("sendLoginInfo() called");
    var loginInfo = getLoginInfo();
    var username = loginInfo[0];
    var password = loginInfo[1];

    var xhr = new XMLHttpRequest();
    // xhr.open("POST", "/users/login");
    // xhr.open("GET", "/users");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({
        username: username,
        password: password
    }));

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                window.location.href = "/dashboard";
            } else {
                alert("Username atau password salah");
            }
        }
    }
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
    checkUsername();

    // Add event listener to username field
    var usernameField = document.getElementById("username");
    usernameField.addEventListener("input", checkUsername);

    // Add event listener to login button
    var loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", sendLoginInfo);
}
);