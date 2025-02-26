const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    name: String,
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    buzzedIn: Boolean,
    score: { type: Number, default: 0 },
});

module.exports = mongoose.model('Participant', participantSchema);
