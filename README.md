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


  ## Step-8


  ## Step-9


  ## Step10
