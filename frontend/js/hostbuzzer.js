let buzzerQueue = [];

// Add participant to the queue (This is a placeholder for backend logic)
function addParticipantToQueue(participantId) {
    buzzerQueue.push(participantId);
    updateHostUI();
}

// Host UI update
function updateHostUI() {
    const queueList = document.getElementById('buzzerQueueList');
    queueList.innerHTML = ''; // Clear current list
    buzzerQueue.forEach((participant, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${index + 1}. Participant ${participant}`;
        queueList.appendChild(listItem);
    });
}

// Example function to pick the next participant from the queue
function pickNextParticipant() {
    if (buzzerQueue.length > 0) {
        const nextParticipant = buzzerQueue.shift(); // Remove first participant
        updateHostUI();
        alert(`Participant ${nextParticipant} can now answer.`);
    } else {
        alert("No participants have buzzed in.");
    }
}
