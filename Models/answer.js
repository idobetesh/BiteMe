const { Schema } = require('mongoose');

const questionSchema = new Schema({
    question:
        {
            answer: {type: String},
            isCorrect: {type: Boolean}
        }
});

module.exports = questionSchema;