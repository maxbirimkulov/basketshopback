import express from 'express'
import multer from 'multer'
import cors from 'cors'
import {

    clothesCreateValidation
} from './validations/validations.js'
import handleValidatorErrors from "./utils/handleValidatorErrors.js";
import mongoose from 'mongoose'
import {create, getAll,getOne, remove, update} from './controllers/ClothesController.js'
import {createTag, getAllTag,getOneTag, removeTag, updateTag} from './controllers/TagsController.js'


mongoose.connect('mongodb+srv://admin:123456basket@basketshop.jj6mnlm.mongodb.net/basketshop?retryWrites=true&w=majority')
    .then(() => console.log('Mongo DB успешно запущен'))
    .catch((err) =>  console.log('Ошибка при запуске Mongo DB ' ,err))


const server = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null,'uploads')
    },
    filename: (_, file, cb) => {
        cb(null,file.originalname)
    }
});

const upload = multer({storage})

server.use(express.json())
server.use(cors())
server.use('/uploads', express.static('uploads'))


const PORT = process.env.PORT || 4444


server.post('/upload',  upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

server.get('/clothes', getAll )
server.get('/clothes/:id', getOne )
server.delete('/clothes/:id', remove )
server.patch('/clothes/:id', clothesCreateValidation, handleValidatorErrors,   update )
server.post('/clothes',  clothesCreateValidation, handleValidatorErrors, create )

server.get('/tag', getAllTag )
server.get('/tag/:id', getOneTag )
server.delete('/tag/:id',removeTag )
server.patch('/tag/:id',updateTag )
server.post('/tag',createTag )


server.listen(PORT, (err) => {
    if (err){
        return  console.log('Произошла ошибка', err)
    }
    console.log(`Сервер запущен на порту ${PORT}`)
})