const mongoose = require('mongoose');
const { Schema } = mongoose;

const LabModel = mongoose.model('Lab', new Schema({
    name: String,
    capacity: Number,
    description: String,
    photo: String
}))

module.exports = {
    LabModel
}