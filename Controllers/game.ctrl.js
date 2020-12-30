const Game = require('../Models/game');
const QandA = require('../Models/QaA');

const axios = require('axios').default;

exports.googleAPIController = {

    getRestFromAPI(req, res) {
        if(req.query.length != 0) {
            console.log("Hey Mate");
            axios
                .get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.query.restName}&inputtype=textquery&fields=photos,formatted_address,name,rating,geometry&key=AIzaSyBkxP0uOzCNjtByiZD1KccRs7GFfKy_7ss`)
                .then((response) => {
                    // console.log(response.data.candidates[0].name)
                    res.json(response.data); })
                .catch(err => console.log(`Error is: ${err}`));
        }
    }
}

exports.gameController = {
    
    getGames(req, res) {
        Game.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error, could NOT get to database: ${err}`));
    },

    getGame(req, res) {
        Game.findOne({ id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error, could NOT get to database: ${err}`));
    },
    
    async addGame(req, res) {
        const obj = await new Promise((resolve, reject) => {
            const obj = Game.findOne({}).sort({ _id: -1 }).limit(1)
            resolve(obj);
        });
        
        const newId = obj.id + 1;
        const { body } = req;

        const newGame = new Game({
            "id": newId, 
            "Questions": body.Questions,
            "players": body.players
        });
       
        const result = newGame.save();
        if (result) {
            res.json(newGame)
        } else {
            res.status(404).send("Error, could NOT save user");
        }
    },

    deleteGame(req, res) {
        const gameToDelete = req.params.id;
        Game.deleteOne({ id: gameToDelete })
            .then(docs => res.json(docs))
            .catch(err => console.log(`Error, could NOT delete game ${userToDelete} from database: ${err}`));
    },

    updateGame(req, res) {
        const gameToUpdate = req.params.id;
        const { body } = req;
        Game.findOneAndUpdate({id: gameToUpdate}, body)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error, could NOT update game ${gameToUpdate}: ${err}`))
    }
}