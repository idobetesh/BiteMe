const { Schema } = require('mongoose');

const QASchema = new Schema({
    qst: [{type: String}],
    ans: {type: Number}
});

module.exports = QandA;