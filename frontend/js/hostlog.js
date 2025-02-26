// Handle form submission for registration
document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Add form validation logic here (if required)

    // After successful registration, show the login form
    showLoginForm(event);
});

// Handle form submission for login
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // You can add validation logic here (e.g., checking username and password)

    // After successful login, redirect to the home page (e.g., host.html)
    window.location.href = "hosthome.html"; // Redirect to host.html
});

// Handle profile icon click
document.querySelector('.profile-icon').addEventListener('click', function() {
    // Add any custom functionality here (e.g., logging, analytics)

    // Redirect to the login page (profile page could be same as login)
    window.location.href = 'index.html';
});

// Show the registration form and hide the login form
function showRegisterForm(event) {
    event.preventDefault();
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.remove("hidden");
}

// Show the login form and hide the registration form
function showLoginForm(event) {
    event.preventDefault();
    document.getElementById("register-form").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
}

