const { Schema } = require('mongoose');

const QASchema = new Schema({
    question: {type: String},
    options:[
        {
            answer: {type: String},
            isCorrect: {type: Boolean}
        }
    ]
});

module.exports = QASchema;