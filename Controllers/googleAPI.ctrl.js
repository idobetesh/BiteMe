const axios = require('axios').default;

exports.googleAPIController = {

    getRestFromAPI(req, res) {
        if(req.query.length != 0) {
            axios
                .get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.query.restName}&inputtype=textquery&fields=photos,place_id,formatted_address,name,rating,opening_hours,geometry&Atmosphere=price_level&key=AIzaSyBkxP0uOzCNjtByiZD1KccRs7GFfKy_7ss`)
                .then((response) => {console.log(response); res.json(response.data);})
                .catch(err => console.log(`Error is: ${err}`));
        }
    }
}