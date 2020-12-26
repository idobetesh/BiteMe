const User = require('../Models/user');

exports.userController = {

    getUsers(req, res) {
        User.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error, could NOT get to database: ${err}`));
    },

    getUser(req, res) {
        User.findOne({ id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error, could NOT get to database: ${err}`));
    },

    addUser(req, res) {
        // const id = User.find().sort({id :1}).limit(1);
        // console.log(id);
        // const newId = id + 1;

        const { body } = req;

        const newUser = new User({
            "id": 16, //////////////////////////////////////////////// should be auto incremented 
            "first_name": body.first_name,
            "last_name": body.last_name, 
            "address": body.address,
            "email": body.email,
            "admin": body.admin
        });
       
        
        const result = newUser.save();
        if (result) {
            res.json(newUser)
        } else {
            res.status(404).send("Error, could NOT save user");
        }
    },

    deleteUser(req, res) {
        const userToDelete = req.params.id;
        User.deleteOne({ id: userToDelete })
            .then(docs => res.json(docs))
            .catch(err => console.log(`Error, could NOT delete user ${userToDelete} from database: ${err}`));
    },

    updateUser(req, res) {
        const userToUpdate = req.params.id;
        const { body } = req;
        User.findOneAndUpdate({id: userToUpdate}, body)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error, could NOT update user ${userToUpdate}: ${err}`))
    }
}