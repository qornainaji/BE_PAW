// JS for protected page

// Logout function
function logout() {
    console.log("logout() called");

    // Send a GET request using Fetch
    fetch("/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
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
        window.location.replace("/login");
    })
    .then(() => {
        alert("Logout successful");
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}

// After the DOM is loaded, add an event listener to the logout button
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded");

    // Add an event listener to the logout link
    document.getElementById('logout-button').addEventListener('click', function (event) {
        // Prevent the default behavior of the link
        event.preventDefault();

        // Send a POST request to the /logout endpoint
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                
                // Add any other headers if needed
            },
            // Include any request body if required (typically not needed for a logout)
            // body: JSON.stringify({}),
        })
        .then(response => {
            // Handle the response as needed
            // For example, you might want to redirect after successful logout
            if (response.ok) {
                window.location.href = '/'; // Redirect to the home page
            } else {
                // Handle error
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
    });
});

