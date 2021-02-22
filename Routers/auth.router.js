const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const { Router } = require('express');
const authRouter = new Router()
const userCntrl = require('./../Controllers/user.ctrl');

const verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();

    let user = {
        id: payload['sub'],
        email: payload['email'],
        name: payload['given_name'] + " " + payload['family_name'],
    }
    
    return user;
}
const checkDB = async (user) => {
    let dbUser = await userCntrl.userController.getUserToGoogle(user.name, user.email);
    return dbUser;
}
authRouter.post('/', async (req, res) => {
    let token = req.body.token;
    try {
        let user = await verify(token);
        let dbUser = null ;
        dbUser = await checkDB(user);
        
        // user exist
        if(dbUser != null){
            res.cookie('user-token', token, { 
                expires: new Date(Date.now() + 3600000),
                sameSite: true });
            res.json(dbUser);
        } else {
            res.json("User don't exist");
        }
    } catch (err) {
        console.log(err);
    }
})

authRouter.get('/', (req, res) => {
    req.logout();
    res.clearCookie('user_id');
    res.send("logged out?")
})

module.exports = { authRouter };