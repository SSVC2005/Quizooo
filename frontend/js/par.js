function joinQuiz() {
    const quizCode = document.getElementById('quizCode').value;
    if (quizCode) {
        alert(`Joining quiz with code: ${quizCode}`);
        // Add further logic here for joining the quiz session
    } else {
        alert('Please enter a quiz code.');
    }
}

function goToLogin() {
    window.location.href = "parlog.html"; // Redirects to login.html
}
