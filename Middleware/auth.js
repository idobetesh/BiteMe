const checkAuth = async (req,res, next) => {
    if(req.session.userID){
        console.log("isAuthenticated - ", req.session.userID);
        next();
    } else {
        console.log("Not authenticated");
        //res.status(401).send('user is unauthenticated')
        next();
}
}

module.exports = {checkAuth};