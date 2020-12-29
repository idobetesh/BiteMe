const axios = require('axios').default;


exports.googleAPIController = {

    getRestFromAPI(req, res) {
        if(req.query.length != 0) {
            console.log("Hey Mate");
            axios
                .get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.query.restName}&inputtype=textquery&fields=geometry&key=AIzaSyBkxP0uOzCNjtByiZD1KccRs7GFfKy_7ss`)
                .then((response) => {res.json(response.data.candidates[0].geometry.location); })
                .catch(err => console.log(`Error is: ${err}`));
        }
    }
}