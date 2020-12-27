const { Schema } = require('mongoose');

const QASchema = new Schema({
    qst: {type: String},
    opts:[{type: String}],
    ans: {type: Number}
});

module.exports = QandA;