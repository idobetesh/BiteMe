const User = require('../Models/user');
const passport = require("passport");
const bcrypt = require("bcryptjs");

async function getUserToGoogle(name, email) {
  let user = await User.findOne({ username:name ,email: email})
  return user;
}

exports.userController = {
  getUserToGoogle,
    getUsers(req, res) {
        User.find({})
            .then(docs => { res.json(docs)})
            .catch(err => {console.log(`Error, could NOT get to database: ${err}`)});
            
    },

    getUser(req, res) {
        User.findOne({ id: req.params.id })
            .then(docs => { res.json(docs)})
            .catch(err => console.log(`Error, could NOT get to database: ${err}`));
    },

    async addUser(req, res) {
        const obj = await new Promise((resolve, reject) => {
            const obj = User.findOne({}).sort({ _id: -1 }).limit(1)
            resolve(obj);
        });
        
        const newId = obj.id + 1;
        const { body } = req;
        const newUser = new User({
            "id": newId,  
            "name": body.username,
            "email": body.email,
            "password": body.password,
            "admin": body.admin
        });
       
        const result = newUser.save();
        if (result) {
            res.json(newUser)
        } else {
            res.status(404).send("Error, could NOT save user");
        }
    },

    updateUser(req, res) {
        const userToUpdate = req.params.id;
        const { body } = req;
        User.findOneAndUpdate({id: userToUpdate}, body)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error, could NOT update user ${userToUpdate}: ${err}`))
    },

    userLogin(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) next(new Error('AuthenticationError'), req, res);
            if (!user) {
                console.log("No user exist");
            }
            else {
              req.logIn(user, (err) => {
                if (err) console.log("ERROR!" , err);
                res.send("Successfully Authenticated");
              });
            }
          })(req, res, next);
    },
    
    userLogout(req, res) {
        req.logout();
        res.send({msg: "User logged-out"});
    },

    userRegister(req, res) {
        User.findOne({ username: req.body.username }, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send({msg: "User Already Exists"});
            if (!doc) {
              const hashedPassword = await bcrypt.hash(req.body.password, 10);
              const obj = await new Promise((resolve, reject) => {
                const obj = User.findOne({}).sort({ _id: -1 }).limit(1)
                resolve(obj);
              });
            const newId = obj.id + 1;
              const newUser = new User({
                id: newId,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
              });
              await newUser.save();
              res.send("User Created");
            }
          });
    }
}