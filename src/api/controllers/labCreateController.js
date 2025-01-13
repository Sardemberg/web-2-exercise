const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { labRepository } = require("../../repository/labRepository");

const labCreateController = async (req, res) => {
    // Configuração do Multer
    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const uploadDir = path.join(__dirname, '../../../uploads');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, `${uniqueSuffix}-${file.originalname}`);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
            }
        }
    }).single('foto');

    // Middleware Multer para tratar a requisição
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

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

            // Criação do novo laboratório
            const novoLaboratorio = {
                id: await labRepository.getNextId(),
                nome,
                descricao,
                capacidade: parseInt(capacidade, 10),
                foto: req.file?.filename || null
            };

            await labRepository.createLab(novoLaboratorio);
            console.log("TESTE")

            return res.status(201).json({
                message: "Laboratório cadastrado com sucesso!",
                laboratorio: novoLaboratorio
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao cadastrar laboratório." });
        }
    });
};

module.exports = {
    labCreateController
};
