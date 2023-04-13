const express = require("express")
const router = express.Router()

// Dados do controller

// Middlewares
const {photoInsertValidation} = require("../middlewares/photoValidation")
const authGuard = require("../middlewares/authGuard")
const validation = require("../middlewares/handleValidation")

// Routes

module.exports = router