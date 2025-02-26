const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

// Models
const Quiz = require('./models/Quiz');
const Participant = require('./models/Participant');

// Initialize Express and Socket.io
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Basic API Route Example for Quiz Creation
app.post('/api/quizzes', async (req, res) => {
    const { hostId, title, description, questions, mode } = req.body;
    const newQuiz = new Quiz({ hostId, title, description, questions, mode });
    await newQuiz.save();
    res.json(newQuiz);
});

// Get Quizzes Created by the Host
app.get('/api/quizzes/:hostId', async (req, res) => {
    const quizzes = await Quiz.find({ hostId: req.params.hostId });
    res.json(quizzes);
});

// Socket.io for Real-Time Communication
io.on('connection', (socket) => {
    console.log('A participant connected.');

    // Handle participant pressing buzzer (in Buzzer Mode)
    socket.on('buzzerPress', async ({ quizId, participantId }) => {
        const participant = await Participant.findById(participantId);
        participant.buzzedIn = true;
        await participant.save();

        // Notify host of the buzzer press
        io.emit('buzzerQueueUpdate', { participantId, quizId });
    });

    // Handle answer submission in Traditional Mode
    socket.on('submitAnswer', async ({ participantId, quizId, answer }) => {
        const quiz = await Quiz.findById(quizId);
        const participant = await Participant.findById(participantId);
        
        // Check if the answer is correct and update the score
        const currentQuestion = quiz.questions[participant.currentQuestionIndex];
        if (currentQuestion.answer === answer) {
            participant.score += 1; // Increment score for correct answer
        }
        
        // Move to next question or end quiz
        participant.currentQuestionIndex++;
        await participant.save();

        // Notify host or update participant UI
        socket.emit('nextQuestion', { participantId, nextQuestion: quiz.questions[participant.currentQuestionIndex] });
    });

    // Participant disconnects
    socket.on('disconnect', () => {
        console.log('A participant disconnected.');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
