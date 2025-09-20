const jwt = require("jsonwebtoken")
const { JWT_SECRET_USER } = require("../config")

function userMiddleware(req, res, next){
    const token = req.headers.token;

    if(token)
    {
        jwt.verify(token, JWT_SECRET_USER, (err, decoded)=>{
            if(err)
            {
                res.status(401).send({
                    message: "unauthorized1"
                })
            }
            else{
                req.userId = decoded.id;
                next();
            }
        })
    }
    else{
        res.status(401).send({
            message: "unauthorized2"
        })
    }
}


module.exports = {
    userMiddleware
}