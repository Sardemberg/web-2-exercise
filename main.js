const { config } = require('dotenv')
const {connectDB} = require('./src/config/mongodb')
const { userRepository } = require('./src/repository/userRepository')

// Configuring envs:
config()

// Connecting with mongodb:
connectDB()

const main = async () => {
    // Creating a user:
    const login = "Lucas Sardemberg"
    const senha = "testando123"
    await userRepository.createUser(login, senha)

    // List all users
    const users = await userRepository.listAllUsers()
    console.log(users)
}


main()