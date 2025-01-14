const { config } = require('dotenv');
const { connectDB } = require('../config/mongodb');
const { json } = require('express');
const express = require('express');
const { dayMiddleware } = require("./middlewares/dayMiddleware");
const { labReportController } = require("./controllers/labReportController");
const { loginController } = require("./controllers/loginController");
const { validateTokenMiddleware } = require('./middlewares/validateToken');

config();
connectDB();
const app = express();
app.use(json());
app.use(dayMiddleware);

// Rota para criar um acesso
app.post('/acesso', (req, res) => {
    const { login, password } = req.body;
    // Verifica se o usuário existe no banco de dados

    // Se o usuário existe, verifica se a senha está correta

    // Se a senha está correta, retorna um true
    // Se a senha está incorreta, retorna um false

    // Caso usuário não exista, cria um novo usuário

});

// Rota para logar
app.post('/validaLogin', loginController);

// Rota para Laboratório novo
app.post('/laboratorio', validateTokenMiddleware, (req, res) => {
   // Lógica para criar um novo laboratório
   res.status(201).json({ message: 'Laboratório criado com sucesso' });
});

// Rota para relatório de laboratórios
app.get('/laboratorio/relatorio', validateTokenMiddleware, labReportController);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
