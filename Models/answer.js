const { Schema } = require('mongoose');

const answerSchema = new Schema({
    answer: {type: String},
    isCorrect: {type: Boolean}
});

module.exports = answerSchema;