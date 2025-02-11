const { LabModel } = require('../model/lab')

const labRepository = {
    createLab: async (name, capacity, description, photo) => {
        await LabModel.create({
            name: name,
            capacity: capacity,
            description: description,
            photo: photo
        });
    },
    getAllLabs: async () => {
        const allLabs = await LabModel.find();
        return allLabs;
    },
    findLabById: async (id) => {
        const lab = await LabModel.findById(id);
        return lab;
    }
};

module.exports = {
    labRepository
}