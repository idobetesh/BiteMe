const Restaurant = require('../models/restaurant');
const restCtrl = require('../Controllers/restaurant.ctrl.js');
const axios = require('axios').default;

exports.googleAPIController = {

    getRestFromAPI(req, res) {
        if(req.query.length != 0) {
            console.log("Hey Mate");
            axios
                .get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.query.restName}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBkxP0uOzCNjtByiZD1KccRs7GFfKy_7ss`)
                .then((response) => {
                    // console.log(response.data.candidates[0].name)
                    res.json(response.data); })
                .catch(err => console.log(`Error is: ${err}`));
        }
    }
}