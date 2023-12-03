// Get the ID of the user from the token
const token = cookies.split('=')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const userId = decoded._id;
console.log(userId)

// Get the user from the database using the ID by doing a call to the API
const user = await axios.get(`http://localhost:4000/api/users/${userId}`)
console.log(user.data)

// show all of the user's data by changing the DOM elements
// ID format: user_username
const userAvatar = document.getElementById('user_avatarURL');
const userUsername = document.getElementById('user_username');
const userName = document.getElementById('user_name');
const userEmail = document.getElementById('user_email');
const userNIM = document.getElementById('user_NIM');
const userBio = document.getElementById('user_bio');
const userLocation = document.getElementById('user_location');
const userWebsite = document.getElementById('user_website');
const userLinkedin = document.getElementById('user_linkedin');
const userGithub = document.getElementById('user_github');
const userTwitter = document.getElementById('user_twitter');
const googleId = document.getElementById('google_id');
const githubId = document.getElementById('github_id');

// change the DOM elements
user_id.innerHTML = user.data._id;
userAvatar.src = user.data.user_avatarURL;
userUsername.innerHTML = user.data.user_username;
userName.innerHTML = user.data.user_name;
userEmail.innerHTML = user.data.user_email;
userNIM.innerHTML = user.data.user_NIM;
userBio.innerHTML = user.data.user_bio;
userLocation.innerHTML = user.data.user_location;
userWebsite.innerHTML = user.data.user_website;
userLinkedin.innerHTML = user.data.user_linkedin;
userGithub.innerHTML = user.data.user_github;
userTwitter.innerHTML = user.data.user_twitter;
googleId.innerHTML = user.data.google_id;
githubId.innerHTML = user.data.github_id;
