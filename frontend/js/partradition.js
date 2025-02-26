let currentQuestion = 0;
let timer;
let timeLeft = 30;
const questions = [
    { text: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' },
    { text: 'Is the sky blue?', options: ['True', 'False'], answer: 'True' }
];

// Display the first question
function loadQuestion() {
    const questionSection = document.getElementById('questionSection');
    questionSection.innerHTML = `
        <p>${questions[currentQuestion].text}</p>
        ${questions[currentQuestion].options.map((opt, index) => `
            <label>
                <input type="radio" name="answer" value="${opt}">
                ${opt}
            </label><br>
        `).join('')}
    `;

    // Reset and start the timer
    timeLeft = 30;
    document.getElementById('timeLeft').innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timeLeft').innerText = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        alert('Time is up! Moving to the next question.');
        nextQuestion();
    }
}

// Submit answer and load the next question
function submitAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        alert(`You selected: ${selectedAnswer.value}`);
        nextQuestion();
    } else {
        alert('Please select an answer.');
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        alert('Quiz completed!');
        clearInterval(timer);
    }
}

// Load the first question when the page is loaded
window.onload = loadQuestion;
