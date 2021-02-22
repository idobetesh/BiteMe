const Order = require('../Models/order');
const User = require('../Models/user');
const Group = require('../Models/group');
const Game = require('./game.ctrl');
const mail = require('./mail.ctrl');
const Axios = require('axios');

exports.orderController = {
    // maybe
    getOrder(req, res) {
        if (req.params.id) {
            Order.findOne({ id: req.params.id })
                .then(docs => { res.json(docs)})
                .catch(err => console.log(`Error, could NOT get to database: ${err}`));
        }
    },

    async addOrder(req, res) {
        console.log(`hih ${req.body.user_id} ${req.body.restaurant_id}`);
        const obj = await new Promise((resolve, reject) => {
            const obj = Order.findOne({}).sort({ _id: -1 }).limit(1);
            resolve(obj);
        });
        
        const userQuery = await User.findOne({id: req.body.user_id});
        console.log("user controller test", userQuery);
        const groupQuery = await Group.findOne({id: userQuery.group_id});
        console.log("group controller test", groupQuery);
        const orderQuery = await Order.findOne({id: groupQuery.order_id});
        console.log("order controller test", orderQuery);
        console.log(orderQuery.time);

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
                console.log("check",holdsAllArray.length)
                if(holdsAllArray.length == 5) {
                    const calculateScores = holdsAllArray.reduce((acc, cur) => {
                        const rest = cur.rest;
                        if(acc[rest]) {
                            acc[rest]++;
                        } else {
                            acc[rest] = 1;
                        }
                        return acc;
                    }, {})
                    
                    // Check for tie
                    console.log(calculateScores)

                    // Finds max values 
                    const dict = calculateScores;
                    const maxRestCount = Object.keys(dict).reduce((a, b) => dict[a] > dict[b] ? {"rest": a, "num": dict[a]} : {"rest": b, "num": dict[b]});
                    console.log('max',maxRestCount.num)

                    /* cases of tie */
                    let tie = false;
                    if (dict.length == 5) { // {1,1,1,1,1}
                        console.log("Tie! {1,1,1,1,1}")
                        tie = true;
                    }
                    // Check if there is a tie
                    let counterTwoForTie = 0;
                    for (let key in dict) { // {2,2,1}
                        if(dict[key] == 2) {
                            counterTwoForTie++;
                        }
                    }
                    // Check if there is a tie and lift flag if true
                    if(counterTwoForTie) {
                        tie = true;
                        console.log("Tie! {2,2,1}")
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

                    if(!tie){
                        let restName = '';
                        Axios({
                            method: "GET",
                            withCredentials: true,
                            url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${maxRestCount.rest}&key=AIzaSyBkxP0uOzCNjtByiZD1KccRs7GFfKy_7ss`,
                        }).then((res) => {
                            if (res.status === 200) {
                                console.log("Response about the restaurant", res)
                                restName = res.name
                            }
                        }).catch(err => console.log(err));

                            Axios({
                            method: "POST",
                            data: {
                                winningRest: restName,
                                mailList: _mailList,
                                gameId: -1
                            },
                            withCredentials: true,
                            url: `http://localhost:4000/api/send`,
                        }).then((res) => {
                            if (res.status === 200) {
                                console.log("Response about the restaurant")
                            }
                        }).catch(err => console.log(err));
                    }else {
                        // Getting game
                        const gameId = Game.gameController.randomGame();
                        console.log('mail about tie was send!')
                        //await Order.updateOne({id: orderQuery.id},{game_id: gameId});
                        Axios({
                            method: "POST",
                            data: {
                                winningRest: null,
                                mailList: _mailList,
                                gameId: -1
                            },
                            withCredentials: true,
                            url: `http://localhost:4000/api/send`,
                        }).then((res) => {
                            if (res.status === 200) {
                                console.log("Response about the restaurant", res)
                            }
                        }).catch(err => console.log(err));
                        console.log('mail about tie was send!')
                    }
                    
                }
                //res.json("user already ordered");
            } else {
                Order.updateOne(
                    { id: orderQuery.id },
                    { $addToSet: { restaurants_id: {user: req.body.user_id, rest: req.body.restaurant_id} } })
                    .then(docs => { 
                        res.json("Successfully added to existing order")
                        if(orderQuery.restaurants_id.len == 5) {
                            const calculateScores = restaurants_id.reduce((acc, cur) => {
                                const rest = cur.rest;
                                if(acc[rest]) {
                                    acc[rest]++;
                                } else {
                                    acc[rest] = 1;
                                }
                                console.log(acc);
                            }, {})
                        }
                        
                    })
                    .catch(err => console.log(`Error, could NOT get to database: ${err}`));; 
            }

        } else {
            console.log("In else")
            // Need to add a random game out of our list of games.
            const newOrderId = obj.id +1;

            const newOrder = new Order({
                "id": newOrderId,
                "time": today,
                "group_id": userQuery.group_id,
                "game_id": 0,
                "restaurants_id": [{"user": req.body.user_id, "rest": req.body.restaurant_id}],
                "chosen_rest_id": ''
            });
            const result = newOrder.save();
            await Group.updateOne({id: groupQuery.id},{order_id: newOrderId});
            if (result) {
                res.json("Successfully created new order")
            } else {
                res.status(404).send("Error, could NOT save restaurant");
            }

            console.log("False");
        }


        const query = Order.where({ name: req.body.name });
        query.findOne((err, ord) => {
            if (err)
                console.log(err);

            if (ord) {
                /* order exists in DB ? ord.count++ : create new order and push to the DB*/
                Order.updateOne({ _id: ord._id }, { $inc: { count: 1 } }).exec();
            } else {
                const newId = obj.id + 1;
                const { body } = req;

                const newRestaurant = new Order({
                    "id": newId,
                    "name": body.name,
                    "address": body.address,
                    "price": body.price,
                    "rate": body.rate,
                    "open": body.open,
                    "count": 1
                });
                const result = newRestaurant.save();
                if (result) {
                    res.json(newRestaurant)
                } else {
                    res.status(404).send("Error, could NOT save restaurant");
                }
            }
        });
    },

    // maybe 
    deleteOrder(req, res) {
        const orderToDelete = req.params.id;
        Restaurant.deleteOne({ id: orderToDelete })
            .then(docs => res.json(docs))
            .catch(err => console.log(`Error, could NOT delete order ${orderToDelete} from database: ${err}`));
    },
}