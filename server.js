const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//require('dotenv').config();

/* Port  */
const port = process.env.PORT || 4000;

/* Routers */
const userRouter = require("./Routers/user.router.js");
const gameRouter = require("./Routers/game.router.js");
const googleAPIRouter = require("./Routers/googleAPI.router.js");
const mailRouter = require('./Routers/mail.router.js');
const authRouter = require('./Routers/auth.router.js');
const orderRouter = require('./Routers/order.router.js');
const User = require("./Models/user.js");
const authMiddleware = require('./Middleware/auth.js');

/* Logs */
const {morganChalk, logger } = require("./Logs/logger");

/* Middleware */
//app.use(morganChalk);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* Passport middleware */
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin');
    res.header('Access-Control-Allow-Credentials:true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS')
    res.set('Content-Type', 'application/json');
    next();
});

app.use(cors({ credentials: true, origin: 'http://localhost:3000', methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"], preflightContinue: true }));

require('./passportConfig')(passport);
  app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(cookieParser());
  
  
/* Paths */
app.use('/api/user', authMiddleware.checkAuth ,userRouter.userRouter);
app.use('/api/game', gameRouter.gameRouter);
app.use('/api/restaurantAPI', googleAPIRouter.googleAPI);
app.use('/api/send', mailRouter.mailRouter);
app.use('/api/login', authRouter.authRouter);
app.use('/api/order', orderRouter.orderRouter);

/* Default route */
app.all('/*', (req, res) => {
    res.status(404).sendFile(`${__dirname}/error.html`);
});

app.listen(port, () => console.log(`Express server is up & running on http://localhost:${port}`));