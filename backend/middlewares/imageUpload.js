const multer = require("multer")
const path = require("path")

// Destino da imagem salva - onde vai ser salva?
const imageStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let folder = ""

        if(req.baseUrl.includes("users")){
            folder = "users"
        } else if(req.baseUrl.includes("photos")){
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`)
    },

    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
    
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){

            // upload somente de imagens nos formatos png e jpj
            return cb(new Error("Por favor, envie apenas png ou jpg!"))
        }

        cb(undefined, true)
    }
})

module.exports = {imageUpload}