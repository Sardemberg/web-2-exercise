const { json } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
app.use(json());  // Note que json precisa ser chamado como função

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
app.get('/laboratorio/relatorio', (req, res) => {

});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});