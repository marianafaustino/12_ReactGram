const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET

// Geração de token do usuário
const generateToken = (id)=>{
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d"
    })
}

// Registro e login de usuário
const register = async (req, res)=>{
    res.send("Registro")
}

module.exports = {
    register
}