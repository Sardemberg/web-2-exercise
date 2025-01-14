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
    },
    deleteUser: async (id) => {
        await UserModel.deleteOne({ _id: id })
        console.log("Usuário deletado com sucesso!")
    },
    findUserByLogin: async (login) => {
        const user = await UserModel.findOne({ login: login })
        return user
    }
}

module.exports = {
    userRepository
}

