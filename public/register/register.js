document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form values
        const user_name = document.getElementById('user_name').value;
        const user_password = document.getElementById('user_password').value;
        const user_email = document.getElementById('user_email').value;
        const user_NIM = document.getElementById('user_NIM').value;

        // Create an object with user data
        const userData = {
            user_name,
            user_password,
            user_email,
            user_NIM,
            user_isAdmin: false
        };

        try {
            // Send a POST request to the server
            const response = await fetch('/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            // alert(JSON.stringify(userData));

            if (response.ok) {
                alert('User registered successfully');
                // Optionally, you can redirect the user to a login page or perform other actions
                window.location.replace('/login');
            } else {
                alert('Registration failed');
                // Show the cause of the error
                console.error(await response.text()); 
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while registering');
        }
    });
});
