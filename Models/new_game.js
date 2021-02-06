const { Schema, model } = require('mongoose');
const answerSchema = require('./answer');


const gameSchema = new Schema({
    // Add time here.
    // Maybe define time to the game, either set time or changing time
    // Logs will be added either to DB or to a file - mainly includes the request and response and everything that will help to understand.
    // 
    id: {type: Number},
    time: {type: Date},
    duration: {type: Number, default:5, min:5, max:10},
    game: 
    [{
        question: {type: String},
        options: [{type: answerSchema}]
    }]
        
}, { collection: 'games' });

const Game = model('Game', gameSchema);

module.exports = Game;