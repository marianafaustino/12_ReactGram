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
        return
    }

    res.status(201).json(newPhoto)
}

// Removendo fotos do banco de dados
    const deletePhoto = async(req, res)=>{

        const {id} = req.params                                                         //pega o id pela url
        const reqUser = req.user                                                       //pega o usuário pela requisição
        
        try {
            const photo = await Photo.findById(new mongoose.Types.ObjectId(id))                 //pega a foto pelo modelo
        
        // Checar se a foto existe
        if(!photo){
            res.status(404).json({errors: ["Foto não encontrada."]})
            return
        }

        // Verificar de a foto pertence ao usuário
        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde."]})
        }

        await Photo.findByIdAndDelete(photo._id)

        res.status(200).json({id: photo._id, message:"Foto excluída com sucesso."})

        } catch (error) {
            res.status(404).json({errors: ["Foto não encontrada."]})
            return
        }

    }

    // Resgatando todas as fotos, por exemplo para exibir no feed
    const getAllPhotos = async(req,res)=>{
        const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

        return res.status(200).json(photos)
    }

    // Resgatando fotos do usuário
    const getUserPhotos = async(req,res)=>{

        const {id}= req.params                 //Resgatando id da url

        const photos = await Photo.find({userId: id})
        .sort([["createdAt", -1]])
        .exec()

        return res.status(200).json(photos)
    }

    // Resgatando fotos pelo id
    const getPhotoById = async(req,res)=>{

        const {id} = req.params

        const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

        // Checando se a foto existe
        if(!photo){
            res.status(404).json({errors: ["Foto não encontrada."]})
            return
        }

        res.status(200).json(photo)
    }

    // Atualização de foto
    const updatePhoto = async(req,res)=>{

        const {id} = req.params
        const {title} = req.body

        const reqUser = req.user

        const photo = await Photo.findById(id)

        // Checando se a foto existe
        if(!photo){
            res.status(404).json({errors: ["Foto não encontrada."]})
            return
        }

        // Checando se a foto pertence ao usuário logado
        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors: ["Ocorreu um erro, tente novamente mais tarde."]})
            return
        }

        if(title){
            photo.title = title
        }

        await photo.save()

        res.status(200).json({photo, message: "Foto atualizada com sucesso!"})
    }

    // Funcionalidade de like nas fotos
    const likePhoto = async(req,res)=>{

        const {id} = req.params
        const reqUser = req.user
        const photo = await Photo.findById(id)

        // Checando se a foto existe
        if(!photo){
            res.status(404).json({errors: ["Foto não encontrada."]})
            return
        }

        // Checando se o usuário já deu like na foto
        if(photo.likes.includes(reqUser._id)){
            res.status(422).json({errors: ["Você já curtiu essa foto."]})
            return
        }

        // Colocando o id do usuário no array de likes
        photo.likes.push(reqUser._id)

        photo.save()

        res.status(200).json({photoId: id, userId: reqUser._id, message: "Você curtiu a foto."})

    }

    // Funcionalidade de comentários
    const commentPhoto = async(req,res)=>{

        const {id} = req.params
        const {comment} = req.body

        const reqUser = req.user

        const user = await User.findById(reqUser._id)

        const photo = await Photo.findById(id)

        // Checando se a foto existe
        if(!photo){
            res.status(404).json({errors: ["Foto não encontrada."]})
            return
        }

        // Adicionando comentário no array de comentários
        const userComment = {
            comment,
            userName: user.name,
            userImage: user.profileImage,
            userId: user._id
        }

        photo.comments.push(userComment)

        await photo.save()

        res.status(200).json({
            comment: userComment,
            message: "O comentário foi adicionado com sucesso!"
        })
    }

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto
}