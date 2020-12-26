const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    id: { type: Number },
    QandA: { type: Object },
    players: { type: Object}, //might not work!
}, { collection: 'games' });

const Game = model('Game', gameSchema);

module.exports = Game;