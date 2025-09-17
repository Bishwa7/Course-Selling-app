const express = require("express")

const app = express()

app.post("/user/signup", function(req, res){
    res.json({
        message: "You are signed up"
    })
})

app.post("/user/signin", function(req, res){
    res.json({
        message: "You are logged in"
    })
})

app.post("/user/purchases", function(req, res){
    res.json({
        message: "user "
    })
})

app.post("/courses", function(req, res){
    res.json({
        message: "You are signed up"
    })
})

app.post("/courses/purchase", function(req, res){
    res.json({
        message: "You are signed up"
    })
})


app.listen(3000)