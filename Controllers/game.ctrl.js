const Game = require('../Models/game.js');
const moment = require('moment');

exports.gameController = {
    
    // getGames(req, res) {
    //     Game.find({})
    //         .then(docs => { res.json(docs) })
    //         .catch(err => console.log(`Error, could NOT get to database: ${err}`));
    // },

    async randomGame () {
        const obj = await new Promise((resolve, reject) => {
            const obj = Game.findOne({}).sort({ _id: -1 }).limit(1)
            resolve(obj);
        });
        
        const lastId = obj.id;
        const randomId = Math.floor(Math.random() * (lastId) + 1);
        console.log(lastId, randomId);
        return randomId;
    },

    async getGame(req, res) {
        const obj = await new Promise((resolve, reject) => {
            const obj = Game.findOne({}).sort({ _id: -1 }).limit(1)
            resolve(obj);
        });
        
        const lastId = obj.id;
        const randomId = Math.floor(Math.random() * (lastId) + 1);
        console.log(lastId, randomId);
        Game.findOne({ id: randomId})
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
        console.log("in addgame, nody.game =  ",body.game);
        console.log("in addgame, body.duration = ",body.duration);
        console.log(Date().toString());
        const newGame = new Game({
            "id": newId, 
            "time": Date().toString(),
            "duration": req.body.game.duration,
            "game": req.body.game.game
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