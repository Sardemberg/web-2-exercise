const { json } = require('express');
const express = require('express');
const app = express();
app.use(json());  // Note que json precisa ser chamado como função

//rota para criar um acesso
app.post('/acesso', (req, res) => {

});

//rota para logar
app.post('/login', (req, res) => {

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