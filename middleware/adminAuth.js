const jwt = require("jsonwebtoken")
const { JWT_SECRET_ADMIN } = require("../config")

function adminMiddleware(req, res, next){
    const token = req.headers.token;

    if(token)
    {
        jwt.verify(token, JWT_SECRET_ADMIN, (err, decoded)=>{
            if(err)
            {
                res.status(401).send({
                    message: "unauthorized1"
                })
            }
            else{
                req.adminId = decoded.id;
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
    adminMiddleware
}