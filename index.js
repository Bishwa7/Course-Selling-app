const express = require("express")
const mongoose = require("mongoose")
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")
const app = express()
app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/courses", courseRouter)
app.use("/api/v1/admin", adminRouter)



async function main(){
    await mongoose.connect("mongodb+srv://admin:L2uaLILIrLCXyLGn@cluster0.c50lnwj.mongodb.net/course-app-db")
    app.listen(3000)
    console.log("Listening to port 3000")
}

main();