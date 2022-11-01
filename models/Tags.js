import mongoose from "mongoose";

const TagsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
     brand: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
})

export default  mongoose.model('Tags', TagsSchema)