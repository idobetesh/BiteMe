const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    id: {type: Number},
    game: 
    [
        {
            question1: {type: String},
            options:
            [
                {
                    answer1: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer2: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer3: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer4: {type: String},
                    isCorrect: {type: Boolean}
                }
            ]
        },
        {
            question2: {type: String},
            options:
            [
                {
                    answer1: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer2: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer3: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer4: {type: String},
                    isCorrect: {type: Boolean}
                }
            ]
        },
        {
            question3: {type: String},
            options:
            [
                {
                    answer1: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer2: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer3: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer4: {type: String},
                    isCorrect: {type: Boolean}
                }
            ]
        },
        {
            question4: {type: String},
            options:
            [
                {
                    answer1: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer2: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer3: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer4: {type: String},
                    isCorrect: {type: Boolean}
                }
            ]
        },
        {
            question5: {type: String},
            options:
            [
                {
                    answer1: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer2: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer3: {type: String},
                    isCorrect: {type: Boolean}
                },
                {
                    answer4: {type: String},
                    isCorrect: {type: Boolean}
                }
            ]
        }
    ]
}, { collection: 'games' });

const Game = model('Game', gameSchema);

module.exports = Game;