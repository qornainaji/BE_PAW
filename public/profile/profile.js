// Purpose: To show the user's profile data

// Function to get user data
const getUserData = async () => {
    try {
        // Get token from cookies by using fetch to the github callback endpoint
        const callbackResponse = await fetch('http://localhost:4000/auth/callback/github');
        console.log("Callback response: " + callbackResponse);
        
        const cookies = callbackResponse.headers.get('set-cookie');

        console.log("Callback response: " + callbackResponse);


        if (!cookies) {
            throw new Error('Access denied');
        }

        const token = cookies.split('=')[1];
        console.log("Token: " + token);

        // Get the user ID from the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;

        // Get user data from the API
        const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
        const user = response.data;

        // Update DOM elements with user data
        document.getElementById('user_id').innerHTML = user._id;
        document.getElementById('user_avatarURL').src = user.user_avatarURL;
        document.getElementById('user_username').innerHTML = user.user_username;
        document.getElementById('user_name').innerHTML = user.user_name;
        document.getElementById('user_email').innerHTML = user.user_email;
        document.getElementById('user_NIM').innerHTML = user.user_NIM;
        document.getElementById('user_bio').innerHTML = user.user_bio;
        document.getElementById('user_location').innerHTML = user.user_location;
        document.getElementById('user_website').innerHTML = user.user_website;
        document.getElementById('user_linkedin').innerHTML = user.user_linkedin;
        document.getElementById('user_github').innerHTML = user.user_github;
        document.getElementById('user_twitter').innerHTML = user.user_twitter;
        document.getElementById('google_id').innerHTML = user.google_id;
        document.getElementById('github_id').innerHTML = user.github_id;
    } catch (error) {
        console.error('Error fetching user information:', error.message);
    }
};

// On window load, get the user data
window.onload = getUserData;
