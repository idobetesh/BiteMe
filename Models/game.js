const { Schema, model } = require('mongoose');
const QASchema = require('./QaA');

const gameSchema = new Schema({
    id: { type: Number },
    Questions: [ QASchema ],
    players: [{type: Number}] 
}, { collection: 'games' });

const Game = model('Game', gameSchema);

module.exports = Game;