const { Schema, model } = require('mongoose');
const answer = require('./')

const gameSchema = new Schema({
    id: {type: Number},
    time: {type: Date},
    duration: {type: Number},
    // Add time here.
    // Maybe define time to the game, either set time or changing time
    // Logs will be added either to DB or to a file - mainly includes the request and response and everything that will help to understand.
    // 
    game: 
    [
            question: {type: String},
            options:
            [
                {
                    answer: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer: {type: String},
                    isCorrect: {type: Boolean}
                }
            ]
        }
    ]
}, { collection: 'games' });

const Game = model('Game', gameSchema);

module.exports = Game;