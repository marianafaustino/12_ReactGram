const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")

const jwtSecret = process.env.JWT_SECRET

// Geração de token do usuário
const generateToken = (id)=>{
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d"
    })
}

// Registro e login de usuário
const register = async (req, res)=>{
    
    const {name, email, password} = req.body

    // checar se o usuário existe
    const user = await User.findOne({email})

    if(user){
        res.status(422).json({errors: ["Por favor utilize outro email."]})
        return
    }

    // Gerando password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // Criando usuário
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // Checar se o usuário foi criado com sucesso, retorna o token
    if(!newUser) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde."]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)

    })

}

// sign user in
const login = async (req, res)=>{
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    // Checando se o usuário existe
    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado!"]})
        return
    }

    // Checar se a senha que o usuário mandou combina com a senha do usuário
    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({errors: ["A senha é inválida."]})
        return
    }

    // Retornando usuário com token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)

    })
}

    // Obtendo o usuário logado no momento
    const getCurrentUser = async (req, res)=>{
        const user = req.user

        res.status(200).json(user)
    }

    // Update an user
    const update = async(req,res)=>{
        
        const {name, password, bio} = req.body

        let profileImage = null

        if(req.file){
            profileImage = req.file.filename
        }

        const reqUser = req.user

        const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password")

        if(name){
            user.name = name
        }

        if(password){
            const salt = await bcrypt.genSalt()
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        if(profileImage){
            user.profileImage = profileImage
        }

        if(bio){
            user.bio = bio
        }

        await user.save()

        res.status(200).json(user)
    }

    // Resgatando usuário pelo Id
    const getUserById = async(req, res)=>{
        
        const {id} = req.params

        try {
            const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password")

            // Checar se o usuário existe
            if(!user){
            res.status(404).json({errors: ["Usuário não encontrado."]})
            return
        }

        res.status(200).json(user)

        } catch (error) {
            res.status(404).json({errors: ["Usuário não encontrado."]})
            return
        }

    }

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById
}