const { config } = require('dotenv')
const { connectDB } = require('../config/mongodb')
const { json } = require('express');
const express = require('express');
<<<<<<< HEAD:index.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
=======
const { dayMiddleware } = require("./middlewares/dayMiddleware")
const { labReportController } = require("./controllers/labReportController")

config()
connectDB()
>>>>>>> main:src/api/index.js
const app = express();
app.use(json());
app.use(dayMiddleware);

//rota para criar um acesso
app.post('/acesso', (req, res) => {
    const { usuario, senha } = req.body;
    // Verifica se o usuário existe no banco de dados

    // Se o usuário existe, verifica se a senha está correta

    // Se a senha está correta, retorna um true
    // Se a senha está incorreta, retorna um false

    // Caso usuário não exista, cria um novo usuário

});

//rota para logar
app.post('/validaLogin', (req, res) => {
    try {
        const { usuario, senha } = req.body;
        // usando arquivo env por enquanto que não temos conexão com banco de dados
        if (usuario === process.env.USUARIO && senha === process.env.SENHA) {
            let novoToken = jwt.sign({ usuario }, process.env.APP_KEY, { expiresIn: 9000 });
            res.json({ logado: true, token: novoToken });
        } else {
            res.json({ logado: false, mensagem: 'Usuário ou senha errados.' });
        }
    } catch (error) {
        res.json({ logado: false, mensagem: 'Erro durante o login.' });
    }
});

//rota para Laboratório novo
app.post('/laboratorio', (req, res) => {
   
});

//rota para relatório de laboratórios
app.get('/laboratorio/relatorio', labReportController);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});