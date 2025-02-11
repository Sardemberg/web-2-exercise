const { LabModel } = require('../model/lab')

const labRepository = {
    createLab: async (name, capacity, description, photo) => {
        await LabModel.create({
            name: name,
            capacity: capacity,
            description: description,
            photo: photo
        })
    },
    getAllLabs: async () => {
        const allLabs = await LabModel.find()
        return allLabs
    },
    findLabByName: async (name) => {
        const lab = await LabModel.findOne({ name: name })
        return lab
    }
}

module.exports = {
    labRepository
}