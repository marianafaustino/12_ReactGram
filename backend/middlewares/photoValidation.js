const {body} = require("express-validator")
const multer = require('multer');

const upload = multer({ dest: 'photos/' });

const photoInsertValidation = ()=>{

    return[
     
    ]
}

const photoUpdateValidation = ()=>{
    return [
        body("title")
          .optional()
          .isString()
          .withMessage("O título é obrigatório.")
          .isLength({min: 3})
          .withMessage("O título precisa ter no mínimo 3 caracteres.")
    ]
}

const commentValidation = ()=>{
    return[
        body("comment").isString().withMessage("O comentário é obrigatório.")
    ]
}

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    commentValidation
}