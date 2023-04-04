const express = require("express")
const router = express.Router()

// funções do controller
const {register} = require("../controllers/UserController")

// middlewares
const validate = require("../middlewares/handleValidation")
const {userCreateValidation} = require("../middlewares/userValidation")

// Routes
router.post("/register", userCreateValidation(), validate, register)

module.exports = router