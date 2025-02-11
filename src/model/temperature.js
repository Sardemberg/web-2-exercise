const mongoose = require('mongoose');
const { Schema } = mongoose;

const TemperatureModel = mongoose.model('Temperature', new Schema({
    value: String,
    createdAt: { type: Date, default: Date.now }
}))

module.exports = {
    TemperatureModel
}