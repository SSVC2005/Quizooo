function navigateTo(option) {
    if (option === 'participant') {
        document.getElementById('participant-section').classList.remove('hidden');
    } else if (option === 'host') {
        window.location.href = '/host-login'; // Redirect to host login page
    }
}

function joinSession() {
    const sessionCode = document.getElementById('sessionCode').value;
    if (sessionCode) {
        alert(`Joining session with code: ${sessionCode}`);
        // Here you can add the logic to join the quiz session
    } else {
        alert('Please enter a session code');
    }
}
