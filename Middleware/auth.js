const checkAuth = async (req,res, next) => {
    if(req.session.userID){
        console.log("isAuthenticated - ", req.session.userID);
        next();
    } else {
        console.log("Not authenticated");
        next();
    }
}

module.exports = {checkAuth};