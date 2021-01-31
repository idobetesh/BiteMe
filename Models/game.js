const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    id: {type: Number},
    game: 
    [
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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