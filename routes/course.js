const { Router } = require("express")

const courseRouter = Router();
const { userMiddleware } = require("../middleware/userAuth");
const { purchaseModel, courseModel } = require("../db");


courseRouter.get("/preview", async function(req, res){

    const courses = await courseModel.find({})

    res.json({
        courses
    })
})

courseRouter.post("/purchase", userMiddleware, async function(req, res){

    const userId = req.userId;
    const courseId = req.body.courseId;


    const course  = await purchaseModel.findOne({
        userId,
        courseId
    })

    console.log(course)

    if(!course){

        // here we should 1st check if the user paid the price
        await purchaseModel.create({
            userId,
            courseId
        })

        res.json({
            message: "Course Purchased"
        })
    }
    else{
        res.json({
            message: "Course Already Purchased"
        })
    }
    


    
})


module.exports = {
    courseRouter: courseRouter
}