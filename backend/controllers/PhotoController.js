const Photo = require("../models/Photo")
const User = require("../models/User")

const mongoose = require("mongoose")

// Inserindo uma foto com o usuário relacionado à ela
const insertPhoto = async(req,res)=>{

    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    // Criando uma foto
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    })

    // Se a foto foi criada com sucesso, retorna o dado
    if(!newPhoto){

        res.status(422).json({errors: ["Houve um problema, por favor tente novamente mais tarde."]})
    }

    res.status(201).json(newPhoto)
}

module.exports = {
    insertPhoto
}