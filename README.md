# Course-Selling-app


Course Selling App – Backend Backend for a course selling platform built using MongoDB, Express.js, and Node.js. It handles user authentication, course creation and management and order processing. The backend includes role-based access control for students and admins, along with JWT-based authentication and MongoDB for data persistence.


## Steps and features in the project
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


 Good to haves (coming soon)
  - Use cookies instead of JWT for auth
  - Add a rate limiting middleware
  - Frontend in ejs (low pri)
  - Frontend in React




## Installation
```
    # Clone the repository
    git clone https://github.com/Bishwa7/Course-Selling-app.git

    # Navigate to the project directory
    cd Course-Selling-app

    # Install dependencies
    npm install

    # Check .env.example and create .env by yourself

    # Start the development server
    npm run start
```


## Tech Stack

- Backend: Node.js, Express.js
- DataBase: MongoDB
- Authentication: JWT





## Commits made in serial order (Steps) -

  ## Step-1
  - initial commit
  ```
  npm init -y
  ```

  - dependencies (express, mongoose for db and jsonwebtoken for auth)
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
  - added signup and signin endpoint logic for admin & user routes

  dependencies (zod for input validation and bcrypt for password hashing)
  ```
  npm install zod bcrypt
  ```

  user.js
  ```javascript
  
    const {z} = require("zod")
    const bcrypt = require("bcrypt")

    const jwt = require("jsonwebtoken")
    const JWT_SECRET = "BishwaHelloBrotherCR7MonekyDLuffyDrazonBallZNarutoUzumaki"


    userRouter.post("/signup", async function(req, res){
        const requiredBody = z.object({
                email: z.email(),
                password: z.string().min(8).max(20)
                .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
                .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
                .regex(/[0-9]/, { message: "Password must contain at least one number." })
                .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
                firstName: z.string().min(5).max(30),
                lastName: z.string().min(3).max(30),
            })
        
            const parsedData = requiredBody.safeParse(req.body);
        
            if(!parsedData.success){
                res.json({
                    message: "incorrect format",
                    error: parsedData.error
                })
                return
            }
        
            const { email, password, firstName, lastName } = req.body;
            // const email = req.body.email;
            // const password = req.body.password;
            // const firstName = req.body.firstName;
            // const lastName = req.body.lastName;
        
            try{
                const hashedPassword = await bcrypt.hash(password, 5);
        
                await userModel.create({
                    email: email,
                    password: hashedPassword,
                    firstName: firstName,
                    lastName: lastName
                })
        
                res.json({
                    message: "You are signed up"
                })
            }
            catch(e){
                console.log("error while signup (db entry)")
        
                res.json({
                    message: "User already exists"
                })
            }
    })

    userRouter.post("/signin", async function(req, res){
        // const email = req.body.email;
        // const password = req.body.password;
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email: email
        })

        if(!user)
        {
            res.json({
                message: "Incorrect Credentials"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);


        if(passwordMatch){
            const token = jwt.sign({
                id: user._id
            }, JWT_SECRET);
            res.json({
                token: token
            })
        }
        else{
            res.status(403).json({
                message: "Incorrect Credentials"
            })
        }
    })
  ```

  admin.js
  ```javascript
    const {z} = require("zod")
    const bcrypt = require("bcrypt")


    const jwt = require("jsonwebtoken")
    const JWT_SECRET_ADMIN = "adminjwtisdifftouserjwt"    //admin jwt is diff to user jwt





    adminRouter.post("/signup", async function(req, res){

        const requiredBody = z.object({
            email: z.email(),
            password: z.string().min(8).max(20)
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
            .regex(/[0-9]/, { message: "Password must contain at least one number." })
            .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
            firstName: z.string().min(5).max(30),
            lastName: z.string().min(5).max(30),
        })

        const parsedData = requiredBody.safeParse(req.body);

        if(!parsedData.success){
            res.json({
                message: "incorrect format",
                error: parsedData.error
            })
            return
        }

        const { email, password, firstName, lastName } = req.body;
        // const email = req.body.email;
        // const password = req.body.password;
        // const firstName = req.body.firstName;
        // const lastName = req.body.lastName;

        try{
            const hashedPassword = await bcrypt.hash(password, 5);

            await adminModel.create({
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName
            })

            res.json({
                message: "You are signed up"
            })
        }
        catch(e){
            console.log("error while signup (db entry)")

            res.json({
                message: "User already exists"
            })
        }
    })



    adminRouter.post("/signin", async function(req, res){
        // const email = req.body.email;
        // const password = req.body.password;
        const { email, password } = req.body;

        const admin = await adminModel.findOne({
            email: email
        })

        if(!admin)
        {
            res.json({
                message: "Incorrect Credentials"
            })
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);


        if(passwordMatch){
            const token = jwt.sign({
                id: admin._id
            }, JWT_SECRET_ADMIN);
            res.json({
                token: token
            })
        }
        else{
            res.status(403).json({
                message: "Incorrect Credentials"
            })
        }
    })
  ```

  - added express.json() middleware in index.js (for data parsing)

  index.js
  ```javascript
    app.use(express.json())
  ```


  - added scripts in package.json
  ```javascript
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node index.js",
        "dev": "nodemon index.js"
    }
  ```

  - run the start script(node index.js) in vscode terminal for one time build
  ```
  npm run start
  ```

  - dependencies for nodemon
  ```
  npm install nodemon
  ``` 

  - run the dev script(nodemon index.js) in vscode terminal for continuos build after changes
  ```
  npm run dev
  ```

  ## Step-7
  - added .env for environment variables, auth middleware for user and admin & updated admin course endpoint in admin.js
  - added config.js which imports environment variables from .env and then exports it to every other file

  .env.example
  ```
    MONGO_URL = mongodb+srv://admin300:L8BjscdsghjHVjjsfNNjksf@cluster0.c50lnwj.mongodb.net/course-db
    JWT_SECRET_ADMIN = Brothergetyourownpasswordandproject
    JWT_SECRET_USER = Dudegetyourownpasswordandproject

  ```


  middleware/userAuth.js
  ```javascript
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
  ```

  middleware/adminAuth.js
  ```javascript
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
  ```


  admin.js
  ```javascript
    const { adminMiddleware } = require("../middleware/adminAuth")
    const { JWT_SECRET_ADMIN } = require("../config")


    adminRouter.post("/course", adminMiddleware, async function(req, res){
        const adminId = req.adminId;

        const { title, description, price, imageUrl } = req.body;

        const course = await courseModel.create({
            title , description, price, imageUrl, creatorId: adminId 
        })

        res.json({
            message: "Course created",
            courseId: courseModel._id
        })
    })



  ```


  config.js
  ```javascript
    require("dotenv").config()

    const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;     //admin jwt is diff to user jwt

    const JWT_SECRET_USER = process.env.JWT_SECRET_USER;    //user jwt is diff from admin jwt


    module.exports = {
        JWT_SECRET_ADMIN,
        JWT_SECRET_USER
    }
    
  ```


  ## Step-8
  - added course creation, updation and getting all course endpoint for admin in admin.js

  
  admin.js
  ```javascript
  
    // create course endpoint

    adminRouter.post("/course", adminMiddleware, async function(req, res){
        const adminId = req.adminId;

        const { title, description, price, imageUrl } = req.body;

        const course = await courseModel.create({
            title , description, price, imageUrl, creatorId: adminId 
        })

        res.json({
            message: "Course created",
            courseId: course._id
        })
    })




    // update course endpoint

    adminRouter.put("/course", adminMiddleware, async function(req, res){

        
        const adminId = req.adminId;

        const { title, description, price, imageUrl, courseId } = req.body;

        const course = await courseModel.updateOne({
            _id: courseId,
            creatorId: adminId
        },{
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl
        })

        // console.log(course)

        if(course.modifiedCount)
        {
            res.json({
                message: "Course updated",
                courseId: course._id
            })
        }
        else{
            res.json({
                message: "Cannot update other creator course"
            })
        }
        
    })




    // get all courses created by the logged in admin

    adminRouter.get("/content", adminMiddleware, async function(req, res){
        const adminId = req.adminId;

        //const { title, description, price, imageUrl, courseId } = req.body;

        const courses = await courseModel.find({
            creatorId: adminId
        })

        res.json({
            message: "Course created",
            courses: courses
        })
    })




  ```


  ## Step-9
  - added preview and purchase endpoint in course.js
    - preview for viewing all courses in the app
    - purchase for puchasing a course 

  - added purchases endpoint in user.js (to view puchased courses)

  course.js
  ```javascript

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
  ```

  user.js
  ```javascript

    userRouter.get("/purchases", userMiddleware, async function(req, res){

        const userId = req.userId;

        const purchases = await purchaseModel.find({
            userId
        })


        const coursesData = await courseModel.find({
            _id: {$in: purchases.map(x => x.courseId)}
        })




        res.json({
            purchases,
            coursesData
        })
    })


  ```




  ## Step10
