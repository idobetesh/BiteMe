const Order = require('../Models/order');
const User = require('../Models/user');
const Group = require('../Models/group');
const Game = require('./game.ctrl');
const mail = require('./mail.ctrl');
const Axios = require('axios');

exports.orderController = {

    getOrder(req, res) {
        if (req.params.id) {
            Order.findOne({ id: req.params.id })
                .then(docs => { res.json(docs)})
                .catch(err => console.log(`Error, could NOT get to database: ${err}`));
        }
    },
    
    async addScore(req,res) {
        const userQuery = await User.findOne({id: req.body.user_id});
        const groupQuery = await Group.findOne({id: userQuery.group_id});
        const orderQuery = await Order.findOne({id: groupQuery.order_id});
        const updated = await Order.updateOne({id: orderQuery.id}, { $addToSet: { scores: {_user: req.body.user_id, score: req.body.score} } })
        
        let maxScore = 0;
        let winner_id = 0;
        let rest_winner = '';

        const orderQuery1 = await Order.findOne({id: groupQuery.order_id});
        const restaurants = orderQuery1.restaurants_id;
        const scores = orderQuery1.scores;
        if(scores.length == 5) {
            for (let i = 0; i < scores.length; i++){
                if(scores[i].score > maxScore) {
                    maxScore = scores[i].score;
                    winner_id = scores[i]._user;
                }
            }
        }

        /* find winner's restaurant */
        for(let i = 0; i < orderQuery1.restaurants_id.length; i++) {
            if(orderQuery1.restaurants_id[i].user == winner_id ) {
                rest_winner = orderQuery1.restaurants_id[i].rest;
            }
        }
        
        /* Get the list of the users in the group */
        let restName = '';
        let usersList = [];
        for (let i in restaurants) {
            usersList.push(restaurants[i].user)
        }

        const usersObjects = await User.find({ 'id': { $in: usersList } });
        let _mailList = [];
        for (let u in usersObjects) {
            _mailList.push(usersObjects[u].email)
        }

        Axios({
            method: "POST",
            data: {
                winningRest: rest_winner,
                mailList: _mailList,
                finalRes: true
            },
            withCredentials: true,
            url: `https://bite-me-app1.herokuapp.com/api/send`,
        }).then((res) => {})
        .catch(err => console.log(err));
    },

    async addOrder(req, res) {
        const obj = await new Promise((resolve, reject) => {
            const obj = Order.findOne({}).sort({ _id: -1 }).limit(1);
            resolve(obj);
        });
        
        const userQuery = await User.findOne({id: req.body.user_id});
        const groupQuery = await Group.findOne({id: userQuery.group_id});
        const orderQuery = await Order.findOne({id: groupQuery.order_id});

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; 
        let yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd;
        } 
        if(mm<10) {
            mm='0'+mm;
        } 
        today = yyyy + '-' + mm + '-' + dd;
        if(today == orderQuery.time){
            let exist= false;
            for (const rest of orderQuery.restaurants_id){
                if(req.body.user_id == rest.user){
                    exist = true
                    break
                }
            }
            const holdsAllArray = orderQuery.restaurants_id;
            if(exist){
                res.json("user already ordered");
            } else {
                Order.updateOne(
                    { id: orderQuery.id },
                    { $addToSet: { restaurants_id: {user: req.body.user_id, rest: req.body.restaurant_id} } })
                    .then(docs => {})
                    .catch(err => console.log(`Error, could NOT get to database: ${err}`));
                    if(holdsAllArray.length+1 == 5) {
                        const calculateScores = holdsAllArray.reduce((acc, cur) => {
                            const rest = cur.rest;
                            if(acc[rest]) {
                                acc[rest]++;
                            } else {
                                acc[rest] = 1;
                            }
                            return acc;
                        }, {})
                        
                        /* Check for tie */
                        // Finds max values 
                        const dict = calculateScores;
                        let maxRestCount = { "rest": "", "num": 0 }
                        let _max = 0;
                        for (let key in dict) { 
                            if(dict[key] > _max) {
                                _max = dict[key];
                                maxRestCount.rest = key;
                                maxRestCount.num = dict[key];
                        }}
                        if(dict[req.body.restaurant_id]) {
                            dict[req.body.restaurant_id]++;
                        } else {
                            dict[req.body.restaurant_id] = 1;
                        }

                        /* cases of tie */
                        let tie = false;
                        if (dict.length == 5) { // case of: {1,1,1,1,1}
                            tie = true;
                        }
                        // Check if there is a tie
                        let counterTwoForTie = 0;
                        for (let key in dict) { 
                            if(dict[key] === 2) {
                                counterTwoForTie++;
                            }
                        }
                        // Check if there is a tie and lift flag if true
                        if(counterTwoForTie === 2) { 
                            tie = true; // case of: {2,2,1}
                        }
                        // Get the list of the users in the group
                        let usersList = [];
                        for (let i in holdsAllArray) {
                            usersList.push(holdsAllArray[i].user)
                        }
    
                        const usersObjects = await User.find({ 'id': { $in: usersList } });
                        let _mailList = [];
                        for (let u in usersObjects) {
                            _mailList.push(usersObjects[u].email)
                        }
                        
                        const lastUserEmail = await User.find({'id': req.body.user_id})
                        _mailList.push(lastUserEmail.email);
                        let restName = '';
                        if(!tie){
                            Axios({
                                method: "GET",
                                // withCredentials: true,
                                url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${maxRestCount.rest}&key=AIzaSyBkxP0uOzCNjtByiZD1KccRs7GFfKy_7ss`,
                            }).then((res) => {
                                if (res.status === 200) {
                                    restName = res.data.result.name;
                                    Axios({
                                        method: "POST",
                                        data: {
                                            winningRest: restName,
                                            mailList: _mailList,
                                            finalRes: false
                                        },
                                        withCredentials: true,
                                        url: `https://bite-me-app1.herokuapp.com/api/send`,
                                    }).then((res) => {})
                                      .catch(err => console.log(err));
                                }
                            }).catch(err => console.log(err));
                        } else {
                            // When there is tie
                            // Get random game from db
                            const gameId = Game.gameController.randomGame();
                            Axios({
                                method: "POST",
                                data: {
                                    winningRest: restName,
                                    mailList: _mailList,
                                    finalRes: false
                                },
                                withCredentials: true,
                                url: `https://bite-me-app1.herokuapp.com/api/send`,
                            }).then((res) => {})
                            .catch(err => console.log(err));
                        }
                    } 
                    res.json("Successfully added to existing order")
                }
        } else {
            const newOrderId = obj.id +1;
            const newOrder = new Order({
                "id": newOrderId,
                "time": today,
                "group_id": userQuery.group_id,
                "game_id": -1,
                "restaurants_id": [{"user": req.body.user_id, "rest": req.body.restaurant_id}],
            });
            const result = newOrder.save();
            await Group.updateOne({id: groupQuery.id},{order_id: newOrderId});
            if (result) {
                res.json("Successfully created new order")
            } else {
                res.status(404).send("Error, could NOT save restaurant");
            }
        }
    },

    deleteOrder(req, res) {
        const orderToDelete = req.params.id;
        Restaurant.deleteOne({ id: orderToDelete })
            .then(docs => res.json(docs))
            .catch(err => console.log(`Error, could NOT delete order ${orderToDelete} from database: ${err}`));
    },
}