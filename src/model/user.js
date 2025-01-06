const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserModel = mongoose.model('User', new Schema({
    login: String,
    password: String
}))

module.exports = {
    UserModel
}