const healthCheckController = (req, res) => {
    res.json({
        message: "Olá, estamos funcionando!!"
    })

    return
}

module.exports = {
    healthCheckController
}