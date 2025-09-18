const { Router } = require("express")
const adminRouter = Router();
const { adminModel } = require("../db")


adminRouter.post("/signup", function(req, res){
    res.json({
        message: "You are signed up admin"
    })
})

adminRouter.post("/signin", function(req, res){
    res.json({
        message: "You are logged in admin"
    })
})



adminRouter.post("/course", function(req, res){
    res.json({
        message: "create course(admin)"
    })
})



adminRouter.put("/course", function(req, res){
    res.json({
        message: "create course(admin)"
    })
})


adminRouter.get("/content", function(req, res){
    res.json({
        message: "course content(admin)"
    })
})

module.exports = {
    adminRouter: adminRouter
}