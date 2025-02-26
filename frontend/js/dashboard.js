// Sample data to simulate previous quizzes
let quizzes = [
    {
        id: 1,
        name: 'General Knowledge Quiz',
        participants: ['John Doe', 'Jane Smith', 'Alice'],
        winner: 'Jane Smith'
    },
    {
        id: 2,
        name: 'Tech Trivia',
        participants: ['Bob', 'Charlie', 'David'],
        winner: 'David'
    }
];

// Function to render the quizzes list on the dashboard
function renderQuizzes() {
    const quizzesTableBody = document.querySelector('#quizzesTable tbody');
    quizzesTableBody.innerHTML = ''; // Clear any previous content

    quizzes.forEach((quiz) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${quiz.name}</td>
            <td>${quiz.participants.join(', ')}</td>
            <td>${quiz.winner}</td>
            <td>
                <button onclick="editQuiz(${quiz.id})">Edit</button>
                <button onclick="deleteQuiz(${quiz.id})">Delete</button>
            </td>
        `;

        quizzesTableBody.appendChild(row);
    });
}

// Function to redirect to the create quiz page
function redirectToCreateQuiz() {
    window.location.href = 'quizcreation.html'; // Replace with actual URL to the create quiz page
}

// Function to edit a quiz
function editQuiz(quizId) {
    alert(`Editing quiz with ID: ${quizId}`);
    // Redirect to the quiz edit page or open a modal for editing (to be implemented)
}

// Function to delete a quiz
function deleteQuiz(quizId) {
    quizzes = quizzes.filter(quiz => quiz.id !== quizId);
    renderQuizzes();
}

// Call the renderQuizzes function when the page loads
document.addEventListener('DOMContentLoaded', renderQuizzes);
