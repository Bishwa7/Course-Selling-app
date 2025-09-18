const { Router } = require("express")

const courseRouter = Router();


courseRouter.get("/preview", function(req, res){
    res.json({
        message: "You are signed up"
    })
})

courseRouter.post("/purchase", function(req, res){
    res.json({
        message: "You are signed up"
    })
})


module.exports = {
    courseRouter: courseRouter
}