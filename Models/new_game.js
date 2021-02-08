const { Schema, model } = require('mongoose');

const answerSchema = new Schema({
    answer: {type: String},
    isCorrect: {type: Boolean}
});

const gameSchema = new Schema({
    id: {type: Number},
    time: { type: String },
    duration: {type: Number, default:5},
    game: 
    [{
        question: {type: String},
        options: [answerSchema]
    }]
        
}, { collection: 'new_games' });

const Game = model('Game', gameSchema);

module.exports = Game;