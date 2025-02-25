function createQuiz() {
    const hostName = document.getElementById('hostName').value;
    const mode = prompt("Enter quiz mode: Buzzer or Traditional");

    const questions = [
        { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is the capital of France?", options: ["Berlin", "Paris", "Rome"], answer: "Paris" }
    ];

    fetch('/create-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host: hostName, mode: mode, questions: questions })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Quiz created successfully. Quiz ID: ${data.quizId}`);
        window.location.href = `/quiz/${data.quizId}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
