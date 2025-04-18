// ratingmodel.js
import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema({
    Filename: String,
    Rating: Number
})

const Rating = mongoose.model('ratings', ratingSchema) // Collection name: 'rating'
export default Rating
