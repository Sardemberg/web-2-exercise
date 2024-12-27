const { UserModel } = require('../model/user')

const userRepository = {
    createUser: async (login, password) => {
        await UserModel.create({
            login: login,
            password: password
        })

        console.log("Usuário criado com sucesso!")
    },
    listAllUsers: async () => {
        const users = await UserModel.find()
        return users
    }
}

module.exports = {
    userRepository
}