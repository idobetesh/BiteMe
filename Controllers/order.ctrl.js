const Order = require('../Models/order');
const User = require('../Models/user');
const Group = require('../Models/group');

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
            // add my restaurant to the order
            Order.update({id: orderQuery.id },{$push: {"restaurants_id": {"user": req.body.user_id, "rest": req.body.restaurant_id}}} );
            console.log("True");
        } else {
            // create new order and then push it to you babe shalalalalalala 

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

            if (result) {
                res.json(newRestaurant)
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