// Toggles the side menu visibility
function toggleMenu() {
    var sideMenu = document.getElementById('sideMenu');
    if (sideMenu.style.width === '250px') {
        sideMenu.style.width = '0';
    } else {
        sideMenu.style.width = '250px';
    }
}

// Navigates to the quiz creation page
function createQuiz() {
    window.location.href = 'quizcreation.html'; // Adjust path if needed
}

// Redirects to login page for logout
function logout() {
    window.location.href = 'index.html'; // Example logout function, adjust the path if needed
}
