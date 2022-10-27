import mongoose from "mongoose";

const ClothesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    brand: {
      type: String,
      required: true
    },
    price: {
        type: Number,
        required: true,
    },
    sizes : {
        type: Array,
        default: [],
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: 0,
    },
    images: {
        type:Array,
        default: [],
    },
    viewsCount : {
        type: Number,
        default: 0
    },
    tag : {
        type: String
    },
    description : {
        type: String
    }
}, {
    timestamps: true,
})

export default  mongoose.model('Clothes', ClothesSchema)