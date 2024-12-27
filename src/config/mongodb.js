
const mongoose = require('mongoose')

const connectDB = () => {
    const mongoDbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URL}/?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`
    mongoose.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(("Successfully connected to mongodb!!"))
    .catch((e) => console.error("A error ocurred to connect in mongoDB. Error: " + e.message))
}

module.exports = {
    connectDB
}