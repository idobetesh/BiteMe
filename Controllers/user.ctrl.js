const { default: axios } = require('axios');
const User = require('../Models/user');

exports.userController = {

    getUsers(req, res) {
        // User.find({})
        //     .then(docs => { res.json(docs) })
        //     .catch(err => console.log(`Error, could NOT get to database: ${err}`));


        const res_name = req.query.rest;
        console.log(res_name);
        if(req.query && req.query.rest) {
            apiKey = "AIzaSyBkxP0uOzCNjtByiZD1KccRs7GFfKy_7ss";
            // axios.get(`https://api.github.com/users/`)
            // axios.get(`https://www.google.co.il/maps/place/${res_name}`)
            axois.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${res_name}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${apiKey}`)
            
                .then((user) => res.json(user.data))
                .catch((err) => res.json(`Error: ${err}`));

        }


        /* Axgithub example works */
        // const user = req.query.username;
        // console.log(user);
        // if(req.query && req.query.username){
        //     axios.get(`https://api.github.com/users/${user}`)
        //         .then((user) => res.json(user.data))
        //         .catch((err) => res.json(`Error: ${err}`));

        // }
    },

    getUser(req, res) {
        User.findOne({ id: req.params.id })
            .then(docs => { res.json(docs) })
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