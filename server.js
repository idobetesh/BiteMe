const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const userRouter  = require("./Routers/user.router.js");
// const gameRouter = require("./Routers/game.router.js");
// const restaurantRouter = require("./Routers/restaurant.router.js");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/api/user', userRouter.userRouter);
// app.use('/api/game', gameRouter.gameRouter);
// app.use('/api/restaurant', restaurantRouter.restaurantRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log(`Express server is running on http://localhost:${port}`));