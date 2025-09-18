const { Router } = require("express")

const userRouter = Router();


userRouter.post("/signup", function(req, res){
    res.json({
        message: "You are signed up"
    })
})

userRouter.post("/signin", function(req, res){
    res.json({
        message: "You are logged in"
    })
})

userRouter.post("/purchases", function(req, res){
    res.json({
        message: "user "
    })
})


module.exports = {
    userRouter: userRouter
}