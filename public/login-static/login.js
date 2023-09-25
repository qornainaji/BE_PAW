// JS for login page

// Get username and password from form
function getLoginInfo() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    return [username, password];
}

// Send login info to server
function sendLoginInfo() {
    var loginInfo = getLoginInfo();
    var username = loginInfo[0];
    var password = loginInfo[1];

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/users/login");
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