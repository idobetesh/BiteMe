const { Router } = require('express');
const { gameController } = require('../Controllers/game.ctrl');

const gameRouter = new Router();

/* http://localhost:3000/api/game */
gameRouter.get('/', gameController.getGames);
gameRouter.get('/:id', gameController.getGame);
gameRouter.post('/', gameController.addGame);
gameRouter.put('/:id', gameController.updateGame);
gameRouter.delete('/:id', gameController.deleteGame);

module.exports = { gameRouter };
