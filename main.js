const { config } = require('dotenv')
const {connectDB} = require('./src/config/mongodb')
const fs = require('fs');
const path = require('path');
const { labRepository } = require('./src/repository/labRepository')

// Configuring envs:
config()

// Connecting with mongodb:
connectDB()

const main = async () => {
    try {
        // Caminho da imagem gato.png
        const imagePath = path.join(__dirname, 'gato.jpeg');
        const imageBuffer = fs.readFileSync(imagePath);

        // Criação de um laboratório
        await labRepository.createLab(
            'Laboratório de Testes',
            50,
            'Este laboratório é usado para testes de software.',
            imageBuffer
        );

        console.log('Laboratório criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar laboratório:', error);
    }
};


main()