document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form values
        const userName = document.getElementById('user_name').value;
        const userPassword = document.getElementById('user_password').value;
        const userEmail = document.getElementById('user_email').value;
        const userNIM = document.getElementById('user_NIM').value;

        // Create an object with user data
        const userData = {
            userName,
            userPassword,
            userEmail,
            userNIM,
            userIsAdmin: false
        };

        try {
            // Send a POST request to the server
            const response = await fetch('/routes/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('User registered successfully');
                // Optionally, you can redirect the user to a login page or perform other actions
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while registering');
        }
    });
});
