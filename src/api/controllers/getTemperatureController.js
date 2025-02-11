const { temperatureRepository } = require("../../repository/temperatureRepository");

const getTemperatureController = async (_, res) => {
    try {
        const temp = await temperatureRepository.getLastTemperature();

        return res.status(200).json({
            message: `A temperatura é: ${temp}•C`,
        })
    }catch(error){
        console.log({
            message: `Error to get temperature: ${error.message}`
        });

        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getTemperatureController
}