const { labRepository } = require("../../repository/labRepository");

const labBlock = async (req, res, io) => {
    try {
        const labId = req.params.lab;

          // Verifica se o lab existe no banco de dados
          const lab = await labRepository.findLabById(labId);
          if (!lab) {
              res.status(404).json({
                  message: "Laboratório não encontrado :("
              });
              return;
          }
  

        // Emite o evento de bloqueio para todos os clientes conectados
        io.emit('bloquear', { lab: lab });

        res.json({ message: `Laboratório ${lab} bloqueado com sucesso!` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao bloquear laboratório" });
    }
};

module.exports = { labBlock };
