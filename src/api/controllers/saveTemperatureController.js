const { temperatureRepository } = require("../../repository/temperatureRepository");

const saveTemperatureController = async (req, res) => {
    const {
        temp
    } = req.query

    try {
        await temperatureRepository.save(temp);

        return res.status(200).json({
            message: "Temperatura salva com sucesso!",
        })
    }catch(error){
        console.log({
            message: `Error to save temperature: ${error.message}`
        });

        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    saveTemperatureController
}