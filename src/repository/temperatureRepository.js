const { TemperatureModel } = require('../model/temperature')

const temperatureRepository = {
    save: async (value) => {
        await TemperatureModel.create({
            value: value,
        })
    },
    getLastTemperature: async () => {
        const temperature = await TemperatureModel
        .findOne()
        .sort({ createdAt: -1 });
        
        console.log(temperature)
        return temperature.value
    }
}

module.exports = {
    temperatureRepository
}