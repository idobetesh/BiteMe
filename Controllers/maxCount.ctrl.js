const Restaurant = require('../Models/restaurant');

exports.maxCountController = {

    findMaxCount(req, res) {
        Restaurant.find({}).sort({count : -1}).limit(2)
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error, could NOT get to database: ${err}`));
    }
}