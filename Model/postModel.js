const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
    image: String,
  author: String,
  location: String,
  description: String,
}, {timestamps: true}) 

const postModel= mongoose.model('posts', postSchema)

module.exports= postModel;