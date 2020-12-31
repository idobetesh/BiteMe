const express = require("express");
// require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const userRouter = require("./Routers/user.router.js");
const restaurantRouter = require("./Routers/restaurant.router.js");
const gameRouter = require("./Routers/game.router.js");
const googleAPIRouter = require("./Routers/googleAPI.router.js");
const maxCountRouter = require('./Routers/maxCount.router.js');
const mailRouter = require('./Routers/mail.router.js');
const User = require("./Models/user.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS')
    res.set('Content-Type', 'application/json');
    next();
});

app.use('/api/user', userRouter.userRouter);
app.use('/api/restaurant', restaurantRouter.restaurantRouter);
app.use('/api/game', gameRouter.gameRouter);
app.use('/api/restaurantAPI', googleAPIRouter.googleAPI);
app.use('/api/maxCount', maxCountRouter.maxCount);
app.use('/api/send', mailRouter.mailRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong..😥');
});

app.listen(port, () => console.log(`Express server is up & running on http://localhost:${port}`));


