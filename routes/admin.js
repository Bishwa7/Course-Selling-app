const { Router } = require("express")
const adminRouter = Router();
const { adminModel, courseModel } = require("../db")
const { adminMiddleware } = require("../middleware/adminAuth")

const {z} = require("zod")
const bcrypt = require("bcrypt")


const jwt = require("jsonwebtoken")
const { JWT_SECRET_ADMIN } = require("../config")




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







module.exports = {
    adminRouter: adminRouter
}