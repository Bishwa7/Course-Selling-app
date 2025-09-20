require("dotenv").config()

const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;     //admin jwt is diff to user jwt

const JWT_SECRET_USER = process.env.JWT_SECRET_USER;    //user jwt is diff from admin jwt


module.exports = {
    JWT_SECRET_ADMIN,
    JWT_SECRET_USER
}