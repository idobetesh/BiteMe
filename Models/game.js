const { Schema, model } = require('mongoose');
const QandA = require('./QandA')

const gameSchema = new Schema({
    id: { type: Number },
    QandA: { type: QandA },
    players: [{type: Number}] 
}, { collection: 'games' });

const Game = model('Game', gameSchema);

module.exports = Game;