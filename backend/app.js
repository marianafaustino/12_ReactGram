require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors")

const port = process.env.PORT

const app = express()

// Configurações para receber as respostas em JSON e form data (por onde será possível enviar imagens)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
const router = require("./routes/Router.js")

app.use(router)

app.listen(port, ()=>{
    console.log(`App rodando na porta ${port}.`)
})