const Order = require('../Models/order');
const User = require('../Models/user');

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
        const obj = await new Promise((resolve, reject) => {
            const obj = Order.findOne({}).sort({ _id: -1 }).limit(1);
            resolve(obj);
        });

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