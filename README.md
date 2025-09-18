# Course-Selling-app

 - Initialize a new Node.js project
 - Add Express, jsonwebtoken, mongoose to it as a dependency 
 - Create index.js
 - Add route skeleton for user login, signup, purchase a course, sees all courses, sees the purchased courses course
 - Add routes for admin login, admin signup, create a course, delete a course, add course content.
 - Define the schema for User, Admin, Course, Purchase
 - Add a database (mongodb), use dotenv to store the database connection string
 - Add middlewares for user and admin auth
 - Complete the routes for user login, signup, purchase a course, see course (Extra points - Use express routing to better structure your routes)
 - Create the frontend


 Good to haves
  - Use cookies instead of JWT for auth
  - Add a rate limiting middleware
  - Frontend in ejs (low pri)
  - Frontend in React



  ## Step-1
  - initial commit
  ```
  npm init -y
  ```
  ```
  npm install express jsonwebtoken mongoose
  ```


  ## Step-2
  - added skeleton route handlers

  index.js
  ```javascript
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
  ```

  ## Step-3
  - added express routing for user and course routers

  index.js
  ```javascript
    const express = require("express")
    const { userRouter } = require("./routes/user")
    const { courseRouter } = require("./routes/course")
    const { adminRouter } = require("./routes/admin")
    const app = express()

    app.use("/api/v1/user", userRouter)
    app.use("/api/v1/courses", courseRouter)
    app.use("/api/v1/admin", adminRouter)
    
    app.listen(3000)
  ```

  user.js
  ```javascript
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
  ```

  course.js
  ```javascript
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
  ```





  ## Step-4
  - added express routing for admin router

  index.js
  ```javascript
    const express = require("express")
    const { userRouter } = require("./routes/user")
    const { courseRouter } = require("./routes/course")
    const { adminRouter } = require("./routes/admin")
    const app = express()

    app.use("/api/v1/user", userRouter)
    app.use("/api/v1/courses", courseRouter)
    app.use("/api/v1/admin", adminRouter)
    
    app.listen(3000)
  ```

  admin.js
  ```javascript
    const { Router } = require("express")
    const adminRouter = Router();


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
  ```

  ## Step-5
  - defining the Schema in db.js and connecting to mongoose in index.js

  ![image alt](https://github.com/Bishwa7/Course-Selling-app/blob/09183f8064409917beb08a625073fa3fb0a465e9/images/Screenshot-(db-Schema).png)

  db.js
  ```javascript
    const mongoose = require("mongoose")
    const Schema = mongoose.Schema
    const ObjectId = mongoose.Types.ObjectId

    const userSchema = new Schema({
        email: {type: String , unique: true},
        password: String,
        firstName: String,
        lastName: String
    })


    const adminSchema = new Schema({
        email: {type: String , unique: true},
        password: String,
        firstName: String,
        lastName: String
    })


    const courseSchema = new Schema({
        title: String,
        description: String,
        price: Number,
        imageUrl: String,
        creatorId: ObjectId
    })


    const purchaseSchema = new Schema({
        courseId: ObjectId,
        userId: ObjectId
    })


    const userModel = mongoose.model("user", userSchema)
    const adminModel = mongoose.model("admin", adminSchema)
    const courseModel = mongoose.model("course", courseSchema)
    const purchaseModel = mongoose.model("purchase", purchaseSchema)


    module.exports = {
        userModel,
        adminModel,
        courseModel,
        purchaseModel
    }
  ```


  index.js
  - The below async await function waits for the mongodb connection and then starts the backend 
  
  ```javascript
    const mongoose = require("mongoose")
  
    async function main(){
        await mongoose.connect("mongodb+srv://admin:L2uaLILIrLCXyLGn@cluster0.c50lnwj.mongodb.net/course-app-db")
        app.listen(3000)
        console.log("Listening to port 3000")
    }

    main();
  ```

  
  admin.js
  ```javascript
    const { adminModel } = require("../db")
  ```


  ## Step-6


  ## Step-7


  ## Step-8


  ## Step-9


  ## Step10
