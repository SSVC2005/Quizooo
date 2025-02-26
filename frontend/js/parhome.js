function joinQuiz() {
    const quizCode = document.getElementById('quizCode').value;
    if (quizCode) {
        alert("You have entered the quiz code: " + quizCode);
    } else {
        alert("Please enter a quiz code.");
    }
}

function logout() {
    window.location.href = 'par.html'; // Make sure 'par.html' is the correct file
}
