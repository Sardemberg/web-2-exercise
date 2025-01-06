const { LabModel } = require('../model/lab')

const labRepository = {
    createLab: async (name, capacity, description, photo) => {
        await LabModel({
            name: name,
            capacity: capacity,
            description: description,
            photo: photo
        }).create()
    }
}

module.exports = {
    labRepository
}