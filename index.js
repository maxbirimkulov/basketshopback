import express from 'express'
import multer from 'multer'
import cors from 'cors'
import TelegramApi from "node-telegram-bot-api";
import {

    clothesCreateValidation
} from './validations/validations.js'
import handleValidatorErrors from "./utils/handleValidatorErrors.js";
import mongoose from 'mongoose'
import {create, getAll,getOne, remove, update} from './controllers/ClothesController.js'


mongoose.connect('mongodb+srv://admin:123456basket@basketshop.jj6mnlm.mongodb.net/basketshop?retryWrites=true&w=majority')
    .then(() => console.log('Mongo DB успешно запущен'))
    .catch((err) =>  console.log('Ошибка при запуске Mongo DB ' ,err))


const index = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null,'uploads')
    },
    filename: (_, file, cb) => {
        cb(null,file.originalname)
    }
});

const upload = multer({storage})

index.use(express.json())
index.use(cors())
index.use('/uploads', express.static('uploads'))

const token = '5562531972:AAHr6GKdxd6jtJmew9Agnwl0qpMUkebz0BY'


//export const bot = new TelegramApi(token, {polling: true})

const PORT = process.env.PORT || 4444


index.post('/upload',  upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

index.get('/clothes', getAll )
index.get('/clothes/:id', getOne )
index.delete('/clothes/:id', remove )
index.patch('/clothes/:id', clothesCreateValidation, handleValidatorErrors,   update )
index.post('/clothes', clothesCreateValidation, handleValidatorErrors, create )



index.listen(PORT, (err) => {
    if (err){
        return  console.log('Произошла ошибка', err)
    }
    console.log(`Сервер запущен на порту ${PORT}`)
})