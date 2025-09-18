const { Router } = require("express")
const userRouter = Router();

const { userModel } = require("../db")

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




userRouter.post("/purchases", function(req, res){
    res.json({
        message: "user "
    })
})


module.exports = {
    userRouter: userRouter
}