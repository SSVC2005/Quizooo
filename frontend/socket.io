const socket = io('http://localhost:5000');

// Handling buzzer press
document.getElementById('buzzerButton').addEventListener('click', () => {
    socket.emit('buzzerPress', { quizId: '123', participantId: '456' });
});

// Submitting an answer in Traditional Mode
document.getElementById('submitAnswerBtn').addEventListener('click', () => {
    const answer = document.querySelector('input[name="answer"]:checked').value;
    socket.emit('submitAnswer', { quizId: '123', participantId: '456', answer });
});

// Listen for updates from the server (e.g., next question or buzzer queue)
socket.on('nextQuestion', (data) => {
    console.log('Next question:', data.nextQuestion);
});
