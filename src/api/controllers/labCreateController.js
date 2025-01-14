const { labRepository } = require("../../repository/labRepository");

const labCreateController = async (req, res) => {
    try {
        const { nome, descricao, capacidade } = req.body;
    
        // Validação dos campos obrigatórios
        if (!nome || !descricao || !capacidade) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
    
        // Validação da capacidade
        if (isNaN(capacidade) || capacidade <= 0) {
            return res.status(400).json({ error: 'Capacidade deve ser um número positivo' });
        }
    
        await labRepository.createLab(nome, capacidade, descricao, req.file.filename);
    
        res.status(201).json({
            message: "Laboratório cadastrado com sucesso!",
            laboratorio: {
                nome,
                capacidade,
                descricao
            }
        });
    
        return
    } catch (error) {
        return res.status(500).json({ message: `Erro ao cadastrar laboratório: ${error.message}` });
    }
}


module.exports = {
    labCreateController
};
