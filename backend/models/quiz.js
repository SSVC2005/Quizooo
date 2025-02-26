const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    hostId: String, // Host (user) who created the quiz
    title: String,
    description: String,
    questions: [
        {
            text: String,
            options: [String],
            answer: String, // Correct answer
            type: String, // E.g., "multiple-choice" or "true/false"
        },
    ],
    mode: String, // "buzzer" or "traditional"
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quiz', quizSchema);
