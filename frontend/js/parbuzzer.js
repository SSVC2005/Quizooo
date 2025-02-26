let hasBuzzed = false;

// Function to simulate the participant pressing the buzzer
function buzz() {
    if (!hasBuzzed) {
        // Notify the host that the participant pressed the buzzer (This is a placeholder for backend communication)
        alert("You pressed the buzzer!");

        // Lock the button after pressing
        document.getElementById('buzzerButton').disabled = true;
        document.getElementById('queuePosition').innerText = "Waiting for host response...";
        hasBuzzed = true;

        // Simulate communication with the server (replace with actual backend communication)
        setTimeout(() => {
            // Simulate receiving the participant's position in the queue
            const queuePosition = Math.floor(Math.random() * 10) + 1; // Replace with real-time queue position data
            document.getElementById('queuePosition').innerText = `Your position in the queue: ${queuePosition}`;
        }, 1000);
    }
}
