require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors")

const port = process.env.PORT

const app = express()

// Configurações para receber as respostas em JSON e form data (por onde será possível enviar imagens)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// solve cors
app.use(cors({credentials: true, origin:"http://localhost:3000"}))

// diretório de upload de imagens
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// conexão com banco de dados
require("./config/db.js")

// routes
const router = require("./routes/Router.js")

app.use(router)

app.listen(port, ()=>{
    console.log(`App rodando na porta ${port}.`)
})