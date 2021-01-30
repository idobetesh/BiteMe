const Game = require('../Models/game');
const QandA = require('../Models/QaA');

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
            "game": req.body.game
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