const {body} = require("express-validator")

const userCreateValidation = ()=>{
    return [
  body("name")
    .isString()
    .withMessage("Digite um nome válido.")
    .isLength({min: 3})
    .withMessage("O nome precisa ter mais de 3 caracteres."),

  body("email")
    .isString()
    .withMessage("O email é obrigatório.")
    .isEmail()
    .withMessage("Insira um email válido."),

  body("password")
    .isString()
    .withMessage("A senha é obrigatória.")
    .isLength({min: 5})
    .withMessage("A senha precisa ter mais de 5 caracteres."),
  body("confirmpassword")
    .isString()
    .withMessage("A confirmação de senha é obrigatória.")
    .custom((value, {req})=>{
        if(value != req.body.password) {
            throw new Error("As senhas não são iguais.")
        }
        return true
    })
 ]
}

const loginValidation = ()=>{
  return [
    body("email")
        .isString()
        .withMessage("O email é obrigatório.")
        .isEmail()
        .withMessage("Digite um email válido."),
    body("password")
        .isString().withMessage("A senha é obrigatória.")
  ]
}

module.exports = {
    userCreateValidation,
    loginValidation
}